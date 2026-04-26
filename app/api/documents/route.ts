import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const year = searchParams.get('year');

  const where: Record<string, unknown> = {};
  if (year && year !== 'All Years') where.year = year;

  const documents = await prisma.transparencyDocument.findMany({
    where,
    orderBy: [{ year: 'desc' }, { createdAt: 'desc' }],
  });

  return NextResponse.json(documents);
}
