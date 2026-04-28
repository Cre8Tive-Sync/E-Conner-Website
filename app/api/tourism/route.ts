import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const spots = await prisma.tourismSpot.findMany({
    orderBy: { order: 'asc' },
  });
  return NextResponse.json(spots);
}
