import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const tag = searchParams.get('tag');
  const featured = searchParams.get('featured');

  const where: Record<string, unknown> = {};
  if (tag && tag !== 'All') where.tag = tag;
  if (featured === 'true') where.isFeatured = true;

  const articles = await prisma.newsArticle.findMany({
    where,
    orderBy: { publishedAt: 'desc' },
  });

  return NextResponse.json(articles);
}
