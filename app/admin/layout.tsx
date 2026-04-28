'use client'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import {
  LayoutDashboard, Megaphone, Newspaper, Mountain,
  FileText, ClipboardList, Users, Mail, ExternalLink, LogOut, Menu, X, ChevronRight,
} from 'lucide-react'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/announcements', label: 'Announcements', icon: Megaphone },
  { href: '/admin/news', label: 'News', icon: Newspaper },
  { href: '/admin/tourism', label: 'Tourism', icon: Mountain },
  { href: '/admin/documents', label: 'Documents', icon: FileText },
  { href: '/admin/forms', label: 'Service Forms', icon: ClipboardList },
  { href: '/admin/officials', label: 'Officials', icon: Users },
  { href: '/admin/contacts', label: 'Contact Inbox', icon: Mail },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  if (pathname === '/admin/login') return <>{children}</>

  const currentPage = navItems.find(n => n.exact ? pathname === n.href : pathname.startsWith(n.href))

  async function handleLogout() {
    await fetch('/api/admin/auth/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen flex" style={{ fontFamily: 'Outfit, sans-serif', background: '#f4f6f8' }}>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-60 flex flex-col transform transition-transform duration-200 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ background: '#0d1b12', borderRight: '1px solid rgba(255,255,255,0.05)' }}
      >
        {/* Brand */}
        <div className="h-16 flex items-center gap-3 px-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0"
            style={{ background: 'rgba(76,175,121,0.15)', border: '1px solid rgba(76,175,121,0.3)' }}>
            🌿
          </div>
          <div>
            <div className="text-white text-xs font-semibold leading-tight">Conner Admin</div>
            <div className="text-xs mt-0.5" style={{ color: 'rgba(76,175,121,0.7)' }}>Content Portal</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 overflow-y-auto px-3 space-y-0.5">
          {navItems.map(({ href, label, icon: Icon, exact }) => {
            const active = exact ? pathname === href : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all group"
                style={active
                  ? { background: 'rgba(76,175,121,0.15)', color: '#4caf79' }
                  : { color: 'rgba(255,255,255,0.45)' }
                }
                onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.85)' }}
                onMouseLeave={e => { if (!active) { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.45)' } }}
              >
                <Icon size={15} />
                <span className="flex-1">{label}</span>
                {active && <ChevronRight size={12} style={{ color: 'rgba(76,175,121,0.6)' }} />}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 space-y-0.5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all"
            style={{ color: 'rgba(255,255,255,0.35)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.35)'; (e.currentTarget as HTMLElement).style.background = 'transparent' }}
          >
            <ExternalLink size={14} />
            View Public Site
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all"
            style={{ color: 'rgba(255,255,255,0.35)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#f87171'; (e.currentTarget as HTMLElement).style.background = 'rgba(239,68,68,0.08)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.35)'; (e.currentTarget as HTMLElement).style.background = 'transparent' }}
          >
            <LogOut size={14} />
            Log Out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" style={{ background: 'rgba(0,0,0,0.5)' }}
          onClick={() => setMobileOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">

        {/* Top bar */}
        <header className="h-14 flex items-center px-5 gap-4 sticky top-0 z-30"
          style={{ background: '#fff', borderBottom: '1px solid #e8ecf0' }}>
          <button className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-400">Admin</span>
            {currentPage && currentPage.href !== '/admin' && (
              <>
                <ChevronRight size={13} className="text-gray-300" />
                <span className="font-medium text-gray-700">{currentPage.label}</span>
              </>
            )}
          </div>

          <div className="flex-1" />

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs text-gray-400">
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                style={{ background: 'linear-gradient(135deg, #2d7a4f, #4caf79)' }}>
                A
              </div>
              Admin
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-5 lg:p-7">
          {children}
        </main>
      </div>
    </div>
  )
}
