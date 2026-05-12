'use server';

import { prisma } from '@/lib/prisma';
import { v4 as uuidv4 } from 'uuid';
import { revalidatePath } from 'next/cache';

export async function createApiKey(formData: FormData) {
  const name = formData.get('name') as string;
  if (!name || name.trim() === '') {
    throw new Error('Name is required');
  }

  // Generate a random API key. 
  // In a real production system, you would hash this before storing.
  // For this MVP, we store it plain text so we can easily copy it.
  const rawKey = `fvdm_${uuidv4().replace(/-/g, '')}`;

  await prisma.apiKey.create({
    data: {
      name: name.trim(),
      key: rawKey,
    },
  });

  revalidatePath('/');
}

export async function deleteApiKey(id: string) {
  await prisma.apiKey.delete({
    where: { id },
  });
  revalidatePath('/');
}

export async function getApiKeys() {
  const keys = await prisma.apiKey.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      usageLogs: {
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          status: true,
          createdAt: true,
        },
      },
    },
  });

  return keys.map((key) => ({
    ...key,
    requestsUsed: key.usageLogs.filter((entry) => entry.status !== 429).length,
    remainingRequests: Math.max(key.quota - key.usageLogs.filter((entry) => entry.status !== 429).length, 0),
  }));
}

export async function getDashboardSummary() {
  const keys = await getApiKeys();
  const totalRequests = keys.reduce((sum, key) => sum + key.requestsUsed, 0);
  const remainingFreeRequests = keys.reduce((sum, key) => sum + key.remainingRequests, 0);
  const exhaustedKeys = keys.filter((key) => key.remainingRequests === 0).length;

  return {
    totalKeys: keys.length,
    totalRequests,
    remainingFreeRequests,
    exhaustedKeys,
  };
}
