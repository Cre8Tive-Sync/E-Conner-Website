import { NextRequest, NextResponse } from 'next/server'
import { createSession } from '@/lib/auth'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  const { username, password } = await request.json()

  const validUsername = process.env.ADMIN_USERNAME ?? 'admin'
  const validPassword = process.env.ADMIN_PASSWORD ?? 'admin123'

  if (username !== validUsername || password !== validPassword) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const token = await createSession()

  const response = NextResponse.json({ ok: true })
  response.cookies.set('admin_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24,
    path: '/',
  })

  return response
}
