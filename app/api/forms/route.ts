import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const forms = await prisma.serviceForm.findMany({
    orderBy: { order: 'asc' },
  });
  return NextResponse.json(forms);
}
