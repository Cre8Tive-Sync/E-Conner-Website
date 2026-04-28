'use client'
import { useState, useEffect, FormEvent } from 'react'
import { Plus, Pencil, Trash2, X, ExternalLink, AlertCircle } from 'lucide-react'

interface TransparencyDocument {
  id: number
  name: string
  description: string
  icon: string
  year: string
  fileUrl: string
}

type FormState = Omit<TransparencyDocument, 'id'>
const blank = (): FormState => ({
  name: '', description: '', icon: '📄',
  year: new Date().getFullYear().toString(), fileUrl: '',
})

function DeleteModal({
  name,
  onConfirm,
  onCancel,
}: {
  name: string
  onConfirm: () => void
  onCancel: () => void
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onCancel() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onCancel])

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 max-w-sm w-full mx-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-red-50 border border-red-100 flex items-center justify-center flex-shrink-0">
            <AlertCircle size={18} className="text-red-500" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">Delete this document?</h3>
            <p className="text-xs text-gray-500 mt-0.5">This action cannot be undone.</p>
          </div>
        </div>
        <p className="text-sm text-gray-700 bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 mb-5 line-clamp-2">
          {name}
        </p>
        <div className="flex gap-2 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default function DocumentsPage() {
  const [items, setItems] = useState<TransparencyDocument[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)
  const [form, setForm] = useState<FormState>(blank())
  const [deleteTarget, setDeleteTarget] = useState<TransparencyDocument | null>(null)
  const [saving, setSaving] = useState(false)

  async function load() {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/documents')
      const data = await res.json()
      setItems(Array.isArray(data) ? data : [])
    } catch {
      setItems([])
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => { load() }, [])

  useEffect(() => {
    if (!showForm) return
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') closeForm() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [showForm])

  function openCreate() { setEditId(null); setForm(blank()); setShowForm(true) }
  function openEdit(item: TransparencyDocument) {
    setEditId(item.id)
    setForm({ name: item.name, description: item.description, icon: item.icon, year: item.year, fileUrl: item.fileUrl })
    setShowForm(true)
  }
  function closeForm() { setShowForm(false); setEditId(null); setForm(blank()) }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    if (editId) {
      await fetch(`/api/admin/documents/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
    } else {
      await fetch('/api/admin/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
    }
    setSaving(false)
    closeForm()
    load()
  }

  async function handleDelete(item: TransparencyDocument) {
    await fetch(`/api/admin/documents/${item.id}`, { method: 'DELETE' })
    setDeleteTarget(null)
    load()
  }

  const byYear = items.reduce<Record<string, TransparencyDocument[]>>((acc, item) => {
    ;(acc[item.year] ??= []).push(item)
    return acc
  }, {})
  const years = Object.keys(byYear).sort((a, b) => Number(b) - Number(a))

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Transparency Documents</h1>
          <p className="text-sm text-gray-500 mt-0.5">NBC 542 compliance documents and public records</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-green-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-green-800 transition-colors shadow-sm"
        >
          <Plus size={15} /> Add Document
        </button>
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm py-16 text-center text-sm text-gray-400">
          Loading…
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm py-16 text-center">
          <p className="text-sm text-gray-400">No documents yet.</p>
          <button onClick={openCreate} className="mt-3 text-sm text-green-700 hover:underline font-medium">
            Add the first document
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {years.map(year => (
            <div key={year}>
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-1">{year}</h2>
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Document</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Description</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-24">File</th>
                      <th className="px-5 py-3 w-20" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {byYear[year].map(item => (
                      <tr
                        key={item.id}
                        className="hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => openEdit(item)}
                      >
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2.5">
                            <span className="text-lg">{item.icon}</span>
                            <span className="font-medium text-gray-900">{item.name}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 text-gray-500 hidden md:table-cell max-w-xs">
                          <span className="line-clamp-1">{item.description}</span>
                        </td>
                        <td className="px-5 py-3.5" onClick={e => e.stopPropagation()}>
                          {item.fileUrl ? (
                            <a
                              href={item.fileUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 hover:underline font-medium"
                            >
                              <ExternalLink size={11} /> Open
                            </a>
                          ) : (
                            <span className="text-xs text-gray-400">No link</span>
                          )}
                        </td>
                        <td className="px-5 py-3.5" onClick={e => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => openEdit(item)}
                              className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
                              title="Edit"
                            >
                              <Pencil size={14} />
                            </button>
                            <button
                              onClick={() => setDeleteTarget(item)}
                              className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors"
                              title="Delete"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}

      {deleteTarget && (
        <DeleteModal
          name={deleteTarget.name}
          onConfirm={() => handleDelete(deleteTarget)}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/30 backdrop-blur-[2px]" onClick={closeForm} />
          <div className="w-full max-w-md bg-white shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <div>
                <h2 className="font-semibold text-gray-900">{editId ? 'Edit Document' : 'Add Document'}</h2>
                <p className="text-xs text-gray-500 mt-0.5">Press Esc to close</p>
              </div>
              <button
                onClick={closeForm}
                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="flex-1 p-6 space-y-5 overflow-y-auto">
              <div className="grid grid-cols-4 gap-3">
                <div className="col-span-1">
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Icon</label>
                  <input
                    type="text" value={form.icon}
                    onChange={e => setForm(f => ({ ...f, icon: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-xl text-center focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 bg-gray-50 transition"
                  />
                </div>
                <div className="col-span-3">
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                    Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text" value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    required
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 bg-gray-50 transition"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Description</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  rows={3}
                  className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 resize-none bg-gray-50 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                  Year <span className="text-red-400">*</span>
                </label>
                <input
                  type="text" value={form.year}
                  onChange={e => setForm(f => ({ ...f, year: e.target.value }))}
                  required placeholder="e.g. 2026"
                  className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 bg-gray-50 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Document URL</label>
                <input
                  type="url" value={form.fileUrl}
                  onChange={e => setForm(f => ({ ...f, fileUrl: e.target.value }))}
                  placeholder="https://drive.google.com/…"
                  className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 bg-gray-50 transition"
                />
                <p className="text-xs text-gray-400 mt-1">Paste a public Google Drive, OneDrive, or Dropbox link.</p>
              </div>
              <div className="pt-2">
                <button type="submit" disabled={saving}
                  className="w-full bg-green-700 text-white rounded-xl py-2.5 text-sm font-medium hover:bg-green-800 disabled:opacity-50 transition-colors">
                  {saving ? 'Saving…' : editId ? 'Save Changes' : 'Add Document'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
