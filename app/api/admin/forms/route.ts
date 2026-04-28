import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  const items = await prisma.serviceForm.findMany({ orderBy: { order: 'asc' } })
  return NextResponse.json(items)
}

export async function POST(request: NextRequest) {
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
}
