'use client'
import { useState, useEffect, FormEvent } from 'react'
import { Plus, Pencil, Trash2, X } from 'lucide-react'

interface Official {
  id: number
  name: string
  position: string
  badge: string | null
  order: number
}

type FormState = { name: string; position: string; badge: string; order: number }
const blank = (): FormState => ({ name: '', position: '', badge: '', order: 0 })

export default function OfficialsPage() {
  const [items, setItems] = useState<Official[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)
  const [form, setForm] = useState<FormState>(blank())
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [saving, setSaving] = useState(false)

  async function load() {
    setLoading(true)
    const res = await fetch('/api/admin/officials')
    setItems(await res.json())
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  function openCreate() { setEditId(null); setForm(blank()); setShowForm(true) }
  function openEdit(item: Official) {
    setEditId(item.id)
    setForm({ name: item.name, position: item.position, badge: item.badge ?? '', order: item.order })
    setShowForm(true)
  }
  function closeForm() { setShowForm(false); setEditId(null); setForm(blank()) }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    if (editId) {
      await fetch(`/api/admin/officials/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
    } else {
      await fetch('/api/admin/officials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
    }
    setSaving(false)
    closeForm()
    load()
  }

  async function handleDelete(id: number) {
    await fetch(`/api/admin/officials/${id}`, { method: 'DELETE' })
    setDeleteId(null)
    load()
  }

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Officials</h1>
          <p className="text-sm text-gray-500 mt-1">Elected and appointed municipal officials</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-800 transition-colors">
          <Plus size={15} /> Add Official
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="py-14 text-center text-sm text-gray-400">Loading…</div>
        ) : items.length === 0 ? (
          <div className="py-14 text-center text-sm text-gray-400">No officials yet.</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Position</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-28">Badge</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-20">Order</th>
                <th className="px-5 py-3 w-28" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map(item => (
                <tr key={item.id} className="hover:bg-gray-50/70">
                  <td className="px-5 py-3.5">
                    <div className="font-medium text-gray-900">{item.name}</div>
                  </td>
                  <td className="px-5 py-3.5 text-gray-600">{item.position}</td>
                  <td className="px-5 py-3.5 text-gray-500 text-xs">{item.badge ?? '—'}</td>
                  <td className="px-5 py-3.5 text-gray-500">{item.order}</td>
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
          <div className="w-full max-w-md bg-white shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-900">{editId ? 'Edit Official' : 'Add Official'}</h2>
              <button onClick={closeForm} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"><X size={18} /></button>
            </div>
            <form onSubmit={handleSubmit} className="flex-1 p-6 space-y-4 overflow-y-auto">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Full Name *</label>
                <input
                  type="text" value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  required
                  className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Position *</label>
                <input
                  type="text" value={form.position}
                  onChange={e => setForm(f => ({ ...f, position: e.target.value }))}
                  required placeholder="e.g. Municipal Mayor"
                  className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Badge / Ward</label>
                <input
                  type="text" value={form.badge}
                  onChange={e => setForm(f => ({ ...f, badge: e.target.value }))}
                  placeholder="Optional — e.g. 1st District, SB Member"
                  className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Display Order</label>
                <input
                  type="number" value={form.order}
                  onChange={e => setForm(f => ({ ...f, order: parseInt(e.target.value) || 0 }))}
                  className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
                />
              </div>
              <div className="pt-2">
                <button type="submit" disabled={saving}
                  className="w-full bg-green-700 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-green-800 disabled:opacity-50 transition-colors">
                  {saving ? 'Saving…' : editId ? 'Save Changes' : 'Add Official'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
