import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const spots = await prisma.tourismSpot.findMany({
    orderBy: { order: 'asc' },
  });
  return NextResponse.json(spots);
}
