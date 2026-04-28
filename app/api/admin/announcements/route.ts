import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const items = await prisma.announcement.findMany({ orderBy: { order: 'asc' } })
    return NextResponse.json(items)
  } catch (err) {
    console.error('[GET /api/admin/announcements]', err)
    return NextResponse.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const item = await prisma.announcement.create({
      data: {
        text: body.text,
        isActive: body.isActive ?? true,
        order: body.order ?? 0,
      },
    })
    return NextResponse.json(item, { status: 201 })
  } catch (err) {
    console.error('[POST /api/admin/announcements]', err)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}
