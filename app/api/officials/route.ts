import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const officials = await prisma.official.findMany({
    orderBy: { order: 'asc' },
  });
  return NextResponse.json(officials);
}
