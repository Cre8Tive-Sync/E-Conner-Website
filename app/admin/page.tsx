'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Megaphone, Newspaper, Mountain, FileText, ClipboardList, Users, Mail } from 'lucide-react'

interface Stats {
  announcements: number
  news: number
  tourism: number
  documents: number
  forms: number
  officials: number
  contacts: number
}

const cards = (s: Stats) => [
  { label: 'Announcements', value: s.announcements, icon: Megaphone, href: '/admin/announcements', bg: 'bg-amber-50', fg: 'text-amber-600' },
  { label: 'News Articles', value: s.news, icon: Newspaper, href: '/admin/news', bg: 'bg-sky-50', fg: 'text-sky-600' },
  { label: 'Tourism Spots', value: s.tourism, icon: Mountain, href: '/admin/tourism', bg: 'bg-emerald-50', fg: 'text-emerald-600' },
  { label: 'Documents', value: s.documents, icon: FileText, href: '/admin/documents', bg: 'bg-violet-50', fg: 'text-violet-600' },
  { label: 'Service Forms', value: s.forms, icon: ClipboardList, href: '/admin/forms', bg: 'bg-indigo-50', fg: 'text-indigo-600' },
  { label: 'Officials', value: s.officials, icon: Users, href: '/admin/officials', bg: 'bg-rose-50', fg: 'text-rose-600' },
  { label: 'Contact Inbox', value: s.contacts, icon: Mail, href: '/admin/contacts', bg: 'bg-teal-50', fg: 'text-teal-600' },
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
        announcements: ann.length,
        news: news.length,
        tourism: tour.length,
        documents: docs.length,
        forms: forms.length,
        officials: officials.length,
        contacts: contacts.length,
      })
    })
  }, [])

  return (
    <div>
      <div className="mb-7">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Municipality of Conner — Content Management System
        </p>
      </div>

      {!stats ? (
        <div className="py-16 text-center text-sm text-gray-400">Loading stats…</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {cards(stats).map(({ label, value, icon: Icon, href, bg, fg }) => (
            <Link
              key={href}
              href={href}
              className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4 hover:shadow-md hover:border-gray-300 transition-all"
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${bg} ${fg} flex-shrink-0`}>
                <Icon size={22} />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{value}</div>
                <div className="text-xs text-gray-500 mt-0.5">{label}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
