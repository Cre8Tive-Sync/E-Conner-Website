import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const items = await prisma.serviceForm.findMany({ orderBy: { order: 'asc' } })
    return NextResponse.json(items)
  } catch (err) {
    console.error('[GET /api/admin/forms]', err)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const item = await prisma.serviceForm.create({
      data: {
        name: body.name,
        office: body.office,
        fileUrl: body.fileUrl ?? '',
        order: body.order ?? 0,
      },
    })
    return NextResponse.json(item, { status: 201 })
  } catch (err) {
    console.error('[POST /api/admin/forms]', err)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}
