import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  const body = await request.json()
  const item = await prisma.tourismSpot.update({
    where: { id },
    data: { name: body.name, description: body.description, icon: body.icon, order: body.order },
  })
  return NextResponse.json(item)
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  await prisma.tourismSpot.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
