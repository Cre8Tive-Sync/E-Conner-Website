'use client'
import { useState, useEffect } from 'react'
import { Mail, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'

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
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Contact Inbox</h1>
          <p className="text-sm text-gray-500 mt-0.5">Messages submitted through the public contact form</p>
        </div>
        {!loading && items.length > 0 && (
          <div className="text-sm text-gray-500 tabular-nums">
            {items.length} message{items.length !== 1 ? 's' : ''}
          </div>
        )}
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm py-16 text-center text-sm text-gray-400">
          Loading…
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm py-16 text-center">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
            <Mail size={20} className="text-gray-400" />
          </div>
          <p className="text-sm font-medium text-gray-600">No messages yet</p>
          <p className="text-xs text-gray-400 mt-1">Submissions from the public contact form will appear here.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {items.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden transition-shadow hover:shadow-md"
            >
              <button
                className="w-full flex items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-gray-50/80"
                onClick={() => setExpanded(expanded === item.id ? null : item.id)}
              >
                <div className="w-9 h-9 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center flex-shrink-0">
                  <Mail size={15} className="text-indigo-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="font-semibold text-gray-900 text-sm">{item.fullName}</span>
                    <span className="text-xs text-gray-400">{item.email}</span>
                    <span className="text-xs bg-indigo-50 text-indigo-600 border border-indigo-100 px-2 py-0.5 rounded-full font-medium">
                      {item.department}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mt-0.5 truncate">{item.subject}</div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-xs text-gray-400 hidden sm:block">
                    {new Date(item.createdAt).toLocaleDateString('en-PH', {
                      year: 'numeric', month: 'short', day: 'numeric',
                    })}
                  </span>
                  {expanded === item.id
                    ? <ChevronUp size={15} className="text-gray-400" />
                    : <ChevronDown size={15} className="text-gray-400" />
                  }
                </div>
              </button>

              {expanded === item.id && (
                <div className="border-t border-gray-100 px-5 pb-5 pt-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                    {[
                      ['From', item.fullName],
                      ['Email', item.email],
                      ['Department', item.department],
                      ['Received', new Date(item.createdAt).toLocaleString('en-PH')],
                    ].map(([label, value]) => (
                      <div key={label}>
                        <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">{label}</div>
                        <div className="text-sm text-gray-800 break-all">{value}</div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Subject</div>
                      <div className="text-sm font-medium text-gray-900">{item.subject}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Message</div>
                      <div className="text-sm text-gray-700 whitespace-pre-wrap bg-gray-50 border border-gray-100 rounded-xl p-3.5 leading-relaxed">
                        {item.message}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <a
                      href={`mailto:${item.email}?subject=Re: ${encodeURIComponent(item.subject)}`}
                      className="inline-flex items-center gap-2 text-xs bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                    >
                      <ExternalLink size={12} /> Reply via Email
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
