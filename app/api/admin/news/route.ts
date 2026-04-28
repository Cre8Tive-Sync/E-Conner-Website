import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  const items = await prisma.newsArticle.findMany({ orderBy: { publishedAt: 'desc' } })
  return NextResponse.json(items)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const item = await prisma.newsArticle.create({
    data: {
      title: body.title,
      excerpt: body.excerpt,
      content: body.content ?? '',
      tag: body.tag,
      icon: body.icon ?? '📰',
      isFeatured: body.isFeatured ?? false,
      publishedAt: body.publishedAt ? new Date(body.publishedAt) : new Date(),
    },
  })
  return NextResponse.json(item, { status: 201 })
}
