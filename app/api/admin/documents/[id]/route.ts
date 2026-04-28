import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  const body = await request.json()
  const item = await prisma.transparencyDocument.update({
    where: { id },
    data: {
      name: body.name,
      description: body.description,
      icon: body.icon,
      year: body.year,
      fileUrl: body.fileUrl,
    },
  })
  return NextResponse.json(item)
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  await prisma.transparencyDocument.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
