import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  const body = await request.json()
  const item = await prisma.newsArticle.update({
    where: { id },
    data: {
      title: body.title,
      excerpt: body.excerpt,
      content: body.content ?? '',
      tag: body.tag,
      icon: body.icon ?? '📰',
      isFeatured: body.isFeatured ?? false,
      publishedAt: body.publishedAt ? new Date(body.publishedAt) : undefined,
    },
  })
  return NextResponse.json(item)
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  await prisma.newsArticle.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
