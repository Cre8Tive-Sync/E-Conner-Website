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

  const sections = stats ? [
    {
      label: 'Announcements',
      desc: 'Homepage marquee ticker',
      value: stats.announcements,
      icon: Megaphone,
      href: '/admin/announcements',
      accent: '#f59e0b',
      bg: 'rgba(245,158,11,0.08)',
    },
    {
      label: 'News Articles',
      desc: 'Posts, events & ordinances',
      value: stats.news,
      icon: Newspaper,
      href: '/admin/news',
      accent: '#3b82f6',
      bg: 'rgba(59,130,246,0.08)',
    },
    {
      label: 'Tourism Spots',
      desc: 'Destinations & attractions',
      value: stats.tourism,
      icon: Mountain,
      href: '/admin/tourism',
      accent: '#10b981',
      bg: 'rgba(16,185,129,0.08)',
    },
    {
      label: 'Documents',
      desc: 'Transparency & NBC 542',
      value: stats.documents,
      icon: FileText,
      href: '/admin/documents',
      accent: '#8b5cf6',
      bg: 'rgba(139,92,246,0.08)',
    },
    {
      label: 'Service Forms',
      desc: 'Downloadable gov forms',
      value: stats.forms,
      icon: ClipboardList,
      href: '/admin/forms',
      accent: '#6366f1',
      bg: 'rgba(99,102,241,0.08)',
    },
    {
      label: 'Officials',
      desc: 'Elected & appointed',
      value: stats.officials,
      icon: Users,
      href: '/admin/officials',
      accent: '#ec4899',
      bg: 'rgba(236,72,153,0.08)',
    },
    {
      label: 'Contact Inbox',
      desc: 'Public form submissions',
      value: stats.contacts,
      icon: Mail,
      href: '/admin/contacts',
      accent: '#14b8a6',
      bg: 'rgba(20,184,166,0.08)',
    },
  ] : []

  return (
    <div>
      {/* Hero header */}
      <div className="rounded-2xl p-7 mb-7 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0d2b1a 0%, #1a4d2e 60%, #2d7a4f 100%)' }}>
        <div className="absolute top-[-40px] right-[-40px] w-52 h-52 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #4caf79, transparent)' }} />
        <div className="absolute bottom-[-30px] left-[30%] w-36 h-36 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #c8922a, transparent)' }} />
        <p className="text-xs font-medium uppercase tracking-widest mb-2" style={{ color: 'rgba(76,175,121,0.8)' }}>
          Content Management
        </p>
        <h1 className="text-2xl font-semibold text-white mb-1.5">
          Welcome to the Admin Portal
        </h1>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
          Municipality of Conner, Apayao · CAR
        </p>
        {stats && (
          <div className="flex items-center gap-6 mt-5">
            <div>
              <span className="text-2xl font-bold" style={{ color: '#4caf79' }}>
                {Object.values(stats).reduce((a, b) => a + b, 0)}
              </span>
              <span className="text-xs ml-2" style={{ color: 'rgba(255,255,255,0.4)' }}>total records</span>
            </div>
            <div>
              <span className="text-2xl font-bold" style={{ color: '#c8922a' }}>
                {stats.contacts}
              </span>
              <span className="text-xs ml-2" style={{ color: 'rgba(255,255,255,0.4)' }}>messages received</span>
            </div>
          </div>
        )}
      </div>

      {/* Section label */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Content Sections</h2>
      </div>

      {!stats ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 h-28 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sections.map(({ label, desc, value, icon: Icon, href, accent, bg }) => (
            <Link
              key={href}
              href={href}
              className="group bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-4 hover:shadow-md hover:border-gray-200 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: bg }}>
                  <Icon size={18} style={{ color: accent }} />
                </div>
                <ArrowRight size={14} className="text-gray-300 group-hover:text-gray-400 group-hover:translate-x-0.5 transition-all mt-0.5" />
              </div>
              <div>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold text-gray-900">{value}</span>
                  <span className="text-xs text-gray-400 mb-1">items</span>
                </div>
                <div className="text-sm font-medium text-gray-800 mt-0.5">{label}</div>
                <div className="text-xs text-gray-400 mt-0.5">{desc}</div>
              </div>
            </Link>
          ))}

          {/* Quick tip card */}
          <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-5 flex flex-col justify-center gap-2">
            <div className="text-lg">💡</div>
            <div className="text-sm font-medium text-gray-600">Quick tip</div>
            <div className="text-xs text-gray-400 leading-relaxed">
              Changes you make here reflect on the public site immediately.
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
