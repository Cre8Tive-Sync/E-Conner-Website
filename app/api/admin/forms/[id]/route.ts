import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  const body = await request.json()
  const item = await prisma.serviceForm.update({
    where: { id },
    data: { name: body.name, office: body.office, fileUrl: body.fileUrl, order: body.order },
  })
  return NextResponse.json(item)
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  await prisma.serviceForm.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
