import { SignJWT, jwtVerify } from 'jose'

const secret = new TextEncoder().encode(
  process.env.SESSION_SECRET ?? 'dev-secret-please-change-in-production-32ch'
)

export async function createSession(): Promise<string> {
  return new SignJWT({})
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret)
}

export async function verifySession(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, secret)
    return true
  } catch {
    return false
  }
}
