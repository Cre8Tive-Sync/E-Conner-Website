import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const items = await prisma.transparencyDocument.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json(items)
  } catch (err) {
    console.error('[GET /api/admin/documents]', err)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const item = await prisma.transparencyDocument.create({
      data: {
        name: body.name,
        description: body.description,
        icon: body.icon ?? '📄',
        year: body.year,
        fileUrl: body.fileUrl ?? '',
      },
    })
    return NextResponse.json(item, { status: 201 })
  } catch (err) {
    console.error('[POST /api/admin/documents]', err)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}
