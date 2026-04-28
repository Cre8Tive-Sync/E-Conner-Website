'use client'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const res = await fetch('/api/admin/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })

    setLoading(false)

    if (res.ok) {
      router.push('/admin')
    } else {
      setError('Invalid username or password.')
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: '#0a1f12', fontFamily: 'Outfit, sans-serif' }}
    >
      <div className="w-full max-w-sm px-4">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-green-700 px-8 py-7 text-center">
            <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">
              🌿
            </div>
            <h1 className="text-white font-semibold text-lg">Admin Portal</h1>
            <p className="text-green-200 text-xs mt-0.5">Municipality of Conner, Apayao</p>
          </div>

          <form onSubmit={handleSubmit} className="px-8 py-7 space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5 uppercase tracking-wide">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                autoComplete="username"
                required
                className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5 uppercase tracking-wide">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50"
              />
            </div>

            {error && (
              <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-700 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-green-800 disabled:opacity-50 transition-colors mt-2"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-green-700/60 mt-5">
          <a href="/" className="hover:text-green-500 transition-colors">
            ← Back to public site
          </a>
        </p>
      </div>
    </div>
  )
}
