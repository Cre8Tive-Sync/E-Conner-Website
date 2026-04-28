import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const items = await prisma.contactSubmission.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json(items)
  } catch (err) {
    console.error('[GET /api/admin/contacts]', err)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}
