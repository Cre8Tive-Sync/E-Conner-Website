'use client'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import {
  LayoutDashboard, Megaphone, Newspaper, Mountain,
  FileText, ClipboardList, Users, Mail, ExternalLink, LogOut, Menu, X,
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

  async function handleLogout() {
    await fetch('/api/admin/auth/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen flex bg-gray-50" style={{ fontFamily: 'Outfit, sans-serif' }}>
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 flex flex-col transform transition-transform duration-200 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-16 flex items-center px-6 border-b border-gray-700 gap-3">
          <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center text-sm flex-shrink-0">
            🌿
          </div>
          <div>
            <div className="text-white font-semibold text-sm leading-tight">Municipality of Conner</div>
            <div className="text-gray-400 text-xs">Admin Panel</div>
          </div>
        </div>

        <nav className="flex-1 py-3 overflow-y-auto">
          {navItems.map(({ href, label, icon: Icon, exact }) => {
            const active = exact ? pathname === href : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-5 py-2.5 text-sm transition-colors ${
                  active
                    ? 'bg-green-600/20 text-green-400 border-r-2 border-green-400'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Icon size={16} />
                {label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-gray-700 space-y-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors rounded-lg"
          >
            <ExternalLink size={15} />
            View Public Site
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-400 hover:text-red-400 transition-colors rounded-lg"
          >
            <LogOut size={15} />
            Log Out
          </button>
        </div>
      </aside>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        <header className="h-14 bg-white border-b border-gray-200 flex items-center px-4 gap-3 sticky top-0 z-30">
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-500"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          <div className="flex-1" />
          <span className="text-xs text-gray-400 hidden sm:block">Logged in as Admin</span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-red-500 transition-colors px-2 py-1.5 rounded-lg hover:bg-red-50"
          >
            <LogOut size={13} />
            <span className="hidden sm:block">Log out</span>
          </button>
        </header>

        <main className="flex-1 p-5 lg:p-7">{children}</main>
      </div>
    </div>
  )
}
