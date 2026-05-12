import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const API_ENDPOINT = '/v1/generate-tryon';
const DEFAULT_SPACE_URL = 'https://yisol-idm-vton.hf.space';

function parseJsonSafely(value: string) {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function extractCompleteEvent(stream: string) {
  const lines = stream.split(/\r?\n/);
  let currentEvent = '';

  for (const line of lines) {
    if (line.startsWith('event:')) {
      currentEvent = line.slice('event:'.length).trim();
      continue;
    }

    if (currentEvent === 'complete' && line.startsWith('data:')) {
      return parseJsonSafely(line.slice('data:'.length).trim());
    }

    if (currentEvent === 'error' && line.startsWith('data:')) {
      throw new Error(String(parseJsonSafely(line.slice('data:'.length).trim())));
    }
  }

  throw new Error('IDM-VTON did not return a completed result.');
}

function createSpacePayload(body: Record<string, unknown>) {
  if (Array.isArray(body.data)) {
    return { data: body.data };
  }

  return {
    data: [
      body.human_image ?? null,
      body.garment_image ?? null,
      body.garment_description ?? '',
      body.auto_mask ?? true,
      body.auto_crop ?? false,
      body.denoise_steps ?? 30,
      body.seed ?? 42,
    ],
  };
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Missing or invalid Authorization header' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];

    // Validate API Key
    const apiKey = await prisma.apiKey.findUnique({
      where: { key: token },
    });

    if (!apiKey) {
      return NextResponse.json({ error: 'Invalid API Key' }, { status: 401 });
    }

    const usedRequests = await prisma.usageLog.count({
      where: {
        apiKeyId: apiKey.id,
        endpoint: API_ENDPOINT,
        NOT: { status: 429 },
      },
    });

    if (usedRequests >= apiKey.quota) {
      await prisma.usageLog.create({
        data: {
          apiKeyId: apiKey.id,
          endpoint: API_ENDPOINT,
          status: 429,
        },
      });

      return NextResponse.json(
        {
          error: 'Free request quota exhausted. Upgrade to a paid plan for higher request volume.',
          quota: apiKey.quota,
          used: usedRequests,
        },
        { status: 429 },
      );
    }

    const body = await request.json() as Record<string, unknown>;
    const spaceUrl = process.env.IDM_VTON_SPACE_URL || DEFAULT_SPACE_URL;
    const submitUrl = `${spaceUrl.replace(/\/$/, '')}/gradio_api/call/tryon`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (process.env.HUGGING_FACE_TOKEN) {
      headers.Authorization = `Bearer ${process.env.HUGGING_FACE_TOKEN}`;
    }

    const submitResponse = await fetch(submitUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(createSpacePayload(body)),
    });

    if (!submitResponse.ok) {
      const errorText = await submitResponse.text();
      await prisma.usageLog.create({
        data: {
          apiKeyId: apiKey.id,
          endpoint: API_ENDPOINT,
          status: submitResponse.status,
        }
      });
      return NextResponse.json({ error: `IDM-VTON submit failed: ${errorText}` }, { status: submitResponse.status });
    }

    const submission = await submitResponse.json() as { event_id?: string };
    if (!submission.event_id) {
      throw new Error('IDM-VTON did not provide an event id.');
    }

    const resultResponse = await fetch(`${submitUrl}/${submission.event_id}`, {
      method: 'GET',
      headers: process.env.HUGGING_FACE_TOKEN
        ? { Authorization: `Bearer ${process.env.HUGGING_FACE_TOKEN}` }
        : undefined,
    });

    if (!resultResponse.ok) {
      const errorText = await resultResponse.text();
      await prisma.usageLog.create({
        data: {
          apiKeyId: apiKey.id,
          endpoint: API_ENDPOINT,
          status: resultResponse.status,
        },
      });
      return NextResponse.json({ error: `IDM-VTON result fetch failed: ${errorText}` }, { status: resultResponse.status });
    }

    const data = extractCompleteEvent(await resultResponse.text());

    // Log successful usage and update lastUsed
    await Promise.all([
      prisma.usageLog.create({
        data: {
          apiKeyId: apiKey.id,
          endpoint: API_ENDPOINT,
          status: 200,
        }
      }),
      prisma.apiKey.update({
        where: { id: apiKey.id },
        data: { lastUsed: new Date() }
      })
    ]);

    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error('API Error:', error);
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
