'use client'

import Link from 'next/link'
import { AlertTriangle, RefreshCw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(76,175,121,0.12),_transparent_30%),linear-gradient(180deg,_#07140c_0%,_#0d2b1a_100%)] px-6 py-16 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-3xl items-center justify-center">
        <div className="w-full rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-[0_30px_90px_rgba(0,0,0,0.28)] backdrop-blur md:p-10">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-300/20 bg-amber-400/10 text-amber-300">
            <AlertTriangle size={24} />
          </div>

          <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-200/75">
            Application Error
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
            Something went wrong while loading this page.
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/65">
            The request failed inside the app router. You can retry this screen or go back to the homepage.
          </p>

          {error?.digest && (
            <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-xs text-white/45">
              Reference: {error.digest}
            </div>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={reset}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-white/90"
            >
              <RefreshCw size={16} />
              Try again
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/8"
            >
              Return home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}