import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const forms = await prisma.serviceForm.findMany({
    orderBy: { order: 'asc' },
  });
  return NextResponse.json(forms);
}
