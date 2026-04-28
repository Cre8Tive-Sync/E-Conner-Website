'use client'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Lock, User } from 'lucide-react'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
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
      className="min-h-screen flex"
      style={{ fontFamily: 'Outfit, sans-serif', background: 'var(--forest, #0a1f12)' }}
    >
      {/* Left panel — branding */}
      <div className="hidden lg:flex flex-col justify-between w-[52%] relative overflow-hidden p-12"
        style={{ background: 'linear-gradient(135deg, #0d2b1a 0%, #1a4d2e 60%, #2d7a4f 100%)' }}
      >
        {/* Decorative blobs */}
        <div className="absolute top-[-80px] right-[-80px] w-80 h-80 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #4caf79, transparent)' }} />
        <div className="absolute bottom-[-60px] left-[-60px] w-64 h-64 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #c8922a, transparent)' }} />

        {/* Top brand */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
              style={{ background: 'rgba(76,175,121,0.15)', border: '1px solid rgba(76,175,121,0.3)' }}>
              🌿
            </div>
            <span className="text-white/70 text-sm font-medium tracking-wide uppercase">Admin Portal</span>
          </div>
        </div>

        {/* Center content */}
        <div>
          <p className="text-white/40 text-xs uppercase tracking-widest font-medium mb-3">
            Province of Apayao · CAR
          </p>
          <h1 className="text-white font-light leading-tight mb-4"
            style={{ fontSize: '2.6rem', fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
            Municipality<br />
            <span style={{ color: '#4caf79' }}>of Conner</span>
          </h1>
          <p className="text-white/50 text-sm leading-relaxed max-w-xs">
            Content management system for the official digital portal of the local government.
          </p>

          <div className="flex items-center gap-6 mt-10">
            {[['21', 'Barangays'], ['28K+', 'Residents'], ['NBC', '542 Compliant']].map(([val, label]) => (
              <div key={label}>
                <div className="text-lg font-semibold" style={{ color: '#4caf79' }}>{val}</div>
                <div className="text-white/40 text-xs mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-white/25 text-xs">
          Republic of the Philippines
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-sm">

          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
              style={{ background: 'rgba(76,175,121,0.12)', border: '1px solid rgba(76,175,121,0.25)' }}>
              🌿
            </div>
            <div>
              <div className="text-white text-sm font-medium">Municipality of Conner</div>
              <div className="text-white/40 text-xs">Admin Portal</div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-1.5">Welcome back</h2>
            <p className="text-white/40 text-sm">Sign in to manage site content</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-widest">
                Username
              </label>
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  autoComplete="username"
                  required
                  className="w-full rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                  onFocus={e => (e.currentTarget.style.border = '1px solid rgba(76,175,121,0.6)')}
                  onBlur={e => (e.currentTarget.style.border = '1px solid rgba(255,255,255,0.1)')}
                  placeholder="Enter your username"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-widest">
                Password
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="w-full rounded-xl pl-10 pr-11 py-3 text-sm text-white placeholder-white/20 outline-none transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                  onFocus={e => (e.currentTarget.style.border = '1px solid rgba(76,175,121,0.6)')}
                  onBlur={e => (e.currentTarget.style.border = '1px solid rgba(255,255,255,0.1)')}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(s => !s)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors"
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm"
                style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)', color: '#fca5a5' }}>
                <span className="text-base">⚠</span> {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl py-3 text-sm font-semibold transition-all mt-2 disabled:opacity-50"
              style={{
                background: loading ? 'rgba(76,175,121,0.4)' : 'linear-gradient(135deg, #2d7a4f, #4caf79)',
                color: '#fff',
                boxShadow: loading ? 'none' : '0 4px 20px rgba(76,175,121,0.35)',
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in…
                </span>
              ) : 'Sign In'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <a href="/" className="text-xs text-white/25 hover:text-white/50 transition-colors">
              ← Back to public site
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
