'use client'
import { useState, useEffect, FormEvent } from 'react'
import { Plus, Pencil, Trash2, X, Star } from 'lucide-react'

interface NewsArticle {
  id: number
  title: string
  excerpt: string
  content: string
  tag: string
  icon: string
  isFeatured: boolean
  publishedAt: string
}

type FormState = Omit<NewsArticle, 'id'>
const blank = (): FormState => ({
  title: '', excerpt: '', content: '', tag: 'News', icon: '📰',
  isFeatured: false, publishedAt: new Date().toISOString().slice(0, 16),
})

const TAGS = ['News', 'Announcement', 'Event', 'Ordinance']
const TAG_COLORS: Record<string, string> = {
  News: 'bg-sky-100 text-sky-700',
  Announcement: 'bg-amber-100 text-amber-700',
  Event: 'bg-green-100 text-green-700',
  Ordinance: 'bg-purple-100 text-purple-700',
}

export default function NewsPage() {
  const [items, setItems] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)
  const [form, setForm] = useState<FormState>(blank())
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [saving, setSaving] = useState(false)

  async function load() {
    setLoading(true)
    const res = await fetch('/api/admin/news')
    setItems(await res.json())
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  function openCreate() { setEditId(null); setForm(blank()); setShowForm(true) }
  function openEdit(item: NewsArticle) {
    setEditId(item.id)
    setForm({
      title: item.title, excerpt: item.excerpt, content: item.content,
      tag: item.tag, icon: item.icon, isFeatured: item.isFeatured,
      publishedAt: new Date(item.publishedAt).toISOString().slice(0, 16),
    })
    setShowForm(true)
  }
  function closeForm() { setShowForm(false); setEditId(null); setForm(blank()) }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    const payload = { ...form, publishedAt: new Date(form.publishedAt).toISOString() }
    if (editId) {
      await fetch(`/api/admin/news/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    } else {
      await fetch('/api/admin/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    }
    setSaving(false)
    closeForm()
    load()
  }

  async function handleDelete(id: number) {
    await fetch(`/api/admin/news/${id}`, { method: 'DELETE' })
    setDeleteId(null)
    load()
  }

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">News</h1>
          <p className="text-sm text-gray-500 mt-1">Manage news articles, announcements, events and ordinances</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-800 transition-colors"
        >
          <Plus size={15} /> Add New
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="py-14 text-center text-sm text-gray-400">Loading…</div>
        ) : items.length === 0 ? (
          <div className="py-14 text-center text-sm text-gray-400">No articles yet.</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-32">Tag</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-36">Published</th>
                <th className="px-5 py-3 w-28" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map(item => (
                <tr key={item.id} className="hover:bg-gray-50/70">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{item.icon}</span>
                      <div>
                        <div className="text-gray-900 font-medium line-clamp-1">{item.title}</div>
                        <div className="text-xs text-gray-400 line-clamp-1 mt-0.5">{item.excerpt}</div>
                      </div>
                      {item.isFeatured && <Star size={12} className="text-amber-500 ml-1 flex-shrink-0" />}
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${TAG_COLORS[item.tag] ?? 'bg-gray-100 text-gray-600'}`}>
                      {item.tag}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-gray-500 text-xs">
                    {new Date(item.publishedAt).toLocaleDateString('en-PH', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-1">
                      {deleteId === item.id ? (
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-gray-500">Delete?</span>
                          <button onClick={() => handleDelete(item.id)} className="text-red-600 font-medium hover:underline">Yes</button>
                          <button onClick={() => setDeleteId(null)} className="text-gray-400 hover:underline">No</button>
                        </div>
                      ) : (
                        <>
                          <button onClick={() => openEdit(item)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700"><Pencil size={14} /></button>
                          <button onClick={() => setDeleteId(item.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600"><Trash2 size={14} /></button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/30" onClick={closeForm} />
          <div className="w-full max-w-lg bg-white shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-900">{editId ? 'Edit Article' : 'New Article'}</h2>
              <button onClick={closeForm} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"><X size={18} /></button>
            </div>
            <form onSubmit={handleSubmit} className="flex-1 p-6 space-y-4 overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Title *</label>
                  <input
                    type="text" value={form.title}
                    onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                    required
                    className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Tag *</label>
                  <select
                    value={form.tag}
                    onChange={e => setForm(f => ({ ...f, tag: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
                  >
                    {TAGS.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Icon (emoji)</label>
                  <input
                    type="text" value={form.icon}
                    onChange={e => setForm(f => ({ ...f, icon: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Excerpt *</label>
                  <textarea
                    value={form.excerpt}
                    onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))}
                    rows={2} required
                    className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none bg-gray-50"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Content</label>
                  <textarea
                    value={form.content}
                    onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                    rows={6}
                    className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-y bg-gray-50"
                    placeholder="Full article content…"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Publish Date *</label>
                  <input
                    type="datetime-local" value={form.publishedAt}
                    onChange={e => setForm(f => ({ ...f, publishedAt: e.target.value }))}
                    required
                    className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
                  />
                </div>
                <div className="flex items-end pb-1">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox" checked={form.isFeatured}
                      onChange={e => setForm(f => ({ ...f, isFeatured: e.target.checked }))}
                      className="w-4 h-4 rounded border-gray-300 text-green-600"
                    />
                    <span className="text-sm text-gray-700 flex items-center gap-1.5">
                      <Star size={13} className="text-amber-500" /> Featured article
                    </span>
                  </label>
                </div>
              </div>
              <div className="pt-2">
                <button type="submit" disabled={saving}
                  className="w-full bg-green-700 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-green-800 disabled:opacity-50 transition-colors">
                  {saving ? 'Saving…' : editId ? 'Save Changes' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
