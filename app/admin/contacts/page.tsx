'use client'
import { useState, useEffect } from 'react'
import { Mail, ChevronDown, ChevronUp } from 'lucide-react'

interface ContactSubmission {
  id: number
  fullName: string
  email: string
  department: string
  subject: string
  message: string
  createdAt: string
}

export default function ContactsPage() {
  const [items, setItems] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState<number | null>(null)

  useEffect(() => {
    fetch('/api/admin/contacts')
      .then(r => r.json())
      .then(data => { setItems(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => { setItems([]); setLoading(false) })
  }, [])

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Contact Inbox</h1>
        <p className="text-sm text-gray-500 mt-1">Messages submitted through the public contact form</p>
      </div>

      {loading ? (
        <div className="py-14 text-center text-sm text-gray-400">Loading…</div>
      ) : items.length === 0 ? (
        <div className="py-14 text-center">
          <Mail size={32} className="text-gray-300 mx-auto mb-3" />
          <p className="text-sm text-gray-400">No messages yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map(item => (
            <div key={item.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <button
                className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-gray-50/70 transition-colors"
                onClick={() => setExpanded(expanded === item.id ? null : item.id)}
              >
                <div className="w-9 h-9 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0">
                  <Mail size={16} className="text-indigo-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-medium text-gray-900 text-sm">{item.fullName}</span>
                    <span className="text-xs text-gray-400">{item.email}</span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{item.department}</span>
                  </div>
                  <div className="text-sm text-gray-600 mt-0.5 truncate">{item.subject}</div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-xs text-gray-400 hidden sm:block">
                    {new Date(item.createdAt).toLocaleDateString('en-PH', {
                      year: 'numeric', month: 'short', day: 'numeric',
                    })}
                  </span>
                  {expanded === item.id ? (
                    <ChevronUp size={16} className="text-gray-400" />
                  ) : (
                    <ChevronDown size={16} className="text-gray-400" />
                  )}
                </div>
              </button>

              {expanded === item.id && (
                <div className="px-5 pb-5 border-t border-gray-100">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 mb-4">
                    {[
                      ['From', item.fullName],
                      ['Email', item.email],
                      ['Department', item.department],
                      ['Received', new Date(item.createdAt).toLocaleString('en-PH')],
                    ].map(([label, value]) => (
                      <div key={label}>
                        <div className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-0.5">{label}</div>
                        <div className="text-sm text-gray-700 break-all">{value}</div>
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-1.5">Subject</div>
                    <div className="text-sm font-medium text-gray-800 mb-3">{item.subject}</div>
                    <div className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-1.5">Message</div>
                    <div className="text-sm text-gray-700 whitespace-pre-wrap bg-gray-50 rounded-lg p-3 border border-gray-100 leading-relaxed">
                      {item.message}
                    </div>
                  </div>
                  <div className="mt-4">
                    <a
                      href={`mailto:${item.email}?subject=Re: ${encodeURIComponent(item.subject)}`}
                      className="inline-flex items-center gap-2 text-xs bg-indigo-600 text-white px-3.5 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      <Mail size={13} /> Reply via Email
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
