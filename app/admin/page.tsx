'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Megaphone, Newspaper, Mountain, FileText, ClipboardList, Users, Mail, ArrowRight } from 'lucide-react'

interface Stats {
  announcements: number
  news: number
  tourism: number
  documents: number
  forms: number
  officials: number
  contacts: number
}

const sections = [
  {
    key: 'announcements' as keyof Stats,
    label: 'Announcements',
    desc: 'Homepage marquee ticker',
    icon: Megaphone,
    href: '/admin/announcements',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
  },
  {
    key: 'news' as keyof Stats,
    label: 'News Articles',
    desc: 'Posts, events & ordinances',
    icon: Newspaper,
    href: '/admin/news',
    color: 'text-sky-600',
    bg: 'bg-sky-50',
    border: 'border-sky-100',
  },
  {
    key: 'tourism' as keyof Stats,
    label: 'Tourism Spots',
    desc: 'Destinations & attractions',
    icon: Mountain,
    href: '/admin/tourism',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
  },
  {
    key: 'documents' as keyof Stats,
    label: 'Documents',
    desc: 'Transparency & NBC 542',
    icon: FileText,
    href: '/admin/documents',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    border: 'border-violet-100',
  },
  {
    key: 'forms' as keyof Stats,
    label: 'Service Forms',
    desc: 'Downloadable gov forms',
    icon: ClipboardList,
    href: '/admin/forms',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    border: 'border-indigo-100',
  },
  {
    key: 'officials' as keyof Stats,
    label: 'Officials',
    desc: 'Elected & appointed',
    icon: Users,
    href: '/admin/officials',
    color: 'text-pink-600',
    bg: 'bg-pink-50',
    border: 'border-pink-100',
  },
  {
    key: 'contacts' as keyof Stats,
    label: 'Contact Inbox',
    desc: 'Public form submissions',
    icon: Mail,
    href: '/admin/contacts',
    color: 'text-teal-600',
    bg: 'bg-teal-50',
    border: 'border-teal-100',
  },
]

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/announcements').then(r => r.json()),
      fetch('/api/admin/news').then(r => r.json()),
      fetch('/api/admin/tourism').then(r => r.json()),
      fetch('/api/admin/documents').then(r => r.json()),
      fetch('/api/admin/forms').then(r => r.json()),
      fetch('/api/admin/officials').then(r => r.json()),
      fetch('/api/admin/contacts').then(r => r.json()),
    ]).then(([ann, news, tour, docs, forms, officials, contacts]) => {
      setStats({
        announcements: Array.isArray(ann) ? ann.length : 0,
        news: Array.isArray(news) ? news.length : 0,
        tourism: Array.isArray(tour) ? tour.length : 0,
        documents: Array.isArray(docs) ? docs.length : 0,
        forms: Array.isArray(forms) ? forms.length : 0,
        officials: Array.isArray(officials) ? officials.length : 0,
        contacts: Array.isArray(contacts) ? contacts.length : 0,
      })
    }).catch(() => {
      setStats({ announcements: 0, news: 0, tourism: 0, documents: 0, forms: 0, officials: 0, contacts: 0 })
    })
  }, [])

  const totalRecords = stats ? Object.values(stats).reduce((a, b) => a + b, 0) : null

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div
        className="rounded-2xl p-7 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0a1f12 0%, #1a4d2e 65%, #2d7a4f 100%)' }}
      >
        <div className="absolute -top-10 -right-10 w-56 h-56 rounded-full opacity-[0.08]"
          style={{ background: 'radial-gradient(circle, #4caf79, transparent)' }} />
        <div className="absolute -bottom-8 left-[35%] w-40 h-40 rounded-full opacity-[0.07]"
          style={{ background: 'radial-gradient(circle, #c8922a, transparent)' }} />

        <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-2" style={{ color: 'rgba(76,175,121,0.8)' }}>
          Content Management
        </p>
        <h1 className="text-2xl font-semibold text-white mb-1">Welcome back</h1>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
          Municipality of Conner, Apayao · CAR
        </p>

        {stats && (
          <div className="flex items-center gap-6 mt-5 pt-5 border-t border-white/10">
            <div>
              <span className="text-2xl font-bold" style={{ color: '#4caf79' }}>{totalRecords}</span>
              <span className="text-xs ml-2" style={{ color: 'rgba(255,255,255,0.4)' }}>total records</span>
            </div>
            <div>
              <span className="text-2xl font-bold" style={{ color: '#e8b84b' }}>{stats.contacts}</span>
              <span className="text-xs ml-2" style={{ color: 'rgba(255,255,255,0.4)' }}>messages received</span>
            </div>
          </div>
        )}
      </div>

      {/* Section heading */}
      <div>
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Content Sections</h2>

        {!stats ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-200 p-5 h-28 animate-pulse shadow-sm" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {sections.map(({ key, label, desc, icon: Icon, href, color, bg, border }) => (
              <Link
                key={href}
                href={href}
                className="group bg-white rounded-2xl border border-gray-200 p-5 flex flex-col gap-4 hover:shadow-md hover:border-gray-300 transition-all shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border ${bg} ${border}`}>
                    <Icon size={17} className={color} />
                  </div>
                  <ArrowRight size={14} className="text-gray-300 group-hover:text-gray-500 group-hover:translate-x-0.5 transition-all mt-1" />
                </div>
                <div>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold text-gray-900">{stats[key]}</span>
                    <span className="text-xs text-gray-400 mb-1">items</span>
                  </div>
                  <div className="text-sm font-semibold text-gray-800 mt-0.5">{label}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{desc}</div>
                </div>
              </Link>
            ))}

            <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-5 flex flex-col justify-center gap-2 shadow-sm">
              <div className="text-lg">💡</div>
              <div className="text-sm font-semibold text-gray-600">Quick tip</div>
              <div className="text-xs text-gray-400 leading-relaxed">
                Changes here reflect on the public site immediately. Click any row to edit it.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
