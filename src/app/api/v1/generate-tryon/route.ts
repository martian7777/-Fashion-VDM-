import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

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

    // Parse the incoming request for image and video data
    // Assuming JSON payload for now: { image_url: "...", video_url: "..." }
    // Or standard Hugging Face Gradio payload
    const body = await request.json();

    // Call the actual Fashion-VDM model endpoint hosted on Hugging Face
    // Note: The endpoint URL will vary based on your specific Inference Endpoint setup.
    // Replace the URL with your deployed HF Inference Endpoint URL
    const HF_ENDPOINT = process.env.HF_ENDPOINT_URL || 'https://api-inference.huggingface.co/models/Fashion-VDM';
    
    const hfResponse = await fetch(HF_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.HUGGING_FACE_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!hfResponse.ok) {
      const errorText = await hfResponse.text();
      // Log failed usage
      await prisma.usageLog.create({
        data: {
          apiKeyId: apiKey.id,
          endpoint: '/v1/generate-tryon',
          status: hfResponse.status,
        }
      });
      return NextResponse.json({ error: `Upstream error: ${errorText}` }, { status: hfResponse.status });
    }

    const data = await hfResponse.json();

    // Log successful usage and update lastUsed
    await Promise.all([
      prisma.usageLog.create({
        data: {
          apiKeyId: apiKey.id,
          endpoint: '/v1/generate-tryon',
          status: 200,
        }
      }),
      prisma.apiKey.update({
        where: { id: apiKey.id },
        data: { lastUsed: new Date() }
      })
    ]);

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
