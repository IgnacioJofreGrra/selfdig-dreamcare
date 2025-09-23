import { useEffect, useState } from 'react'
import { api } from '../../services/api'
import { Link } from 'react-router-dom'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ThemeToggle } from '../../components/ThemeToggle'

type ResultRow = {
  id: string
  patient_id: string
  quiz_id: string
  score: number
  interpretation: string
  created_at: string
}

export function AdminDashboard() {
  const [rows, setRows] = useState<ResultRow[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    api.get('/api/admin/results')
      .then((data) => setRows(data.items ?? []))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const stats = ['bai', 'epds', 'bdi2'].map((id) => ({ quiz: id.toUpperCase(), count: rows.filter(r => r.quiz_id === id).length }))

  async function onExport() {
    const token = localStorage.getItem('token')
    const res = await fetch('/api/admin/export', { headers: token ? { Authorization: `Bearer ${token}` } : undefined })
    if (!res.ok) {
      alert('Error exportando CSV')
      return
    }
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'resultados.csv'
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <main className="min-h-screen app-bg-light dark:app-bg-dark">
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Panel de Administración</h1>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button onClick={onExport} className="px-3 py-2 bg-slate-900 text-white rounded-xl">Exportar CSV</button>
          </div>
        </div>

      {error && <div className="text-red-600">{error}</div>}
      {loading ? <div>Cargando…</div> : (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 shadow-sm">
            <h2 className="font-medium mb-3">Resultados recientes</h2>
            <div className="overflow-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b">
                    <th className="p-2">Paciente</th>
                    <th className="p-2">Test</th>
                    <th className="p-2">Puntaje</th>
                    <th className="p-2">Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map(r => (
                    <tr key={r.id} className="border-b">
                      <td className="p-2"><Link className="underline" to={`/admin/users/${r.patient_id}`}>{r.patient_id.slice(0, 6)}</Link></td>
                      <td className="p-2">{r.quiz_id.toUpperCase()}</td>
                      <td className="p-2">{r.score}</td>
                      <td className="p-2">{new Date(r.created_at).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 shadow-sm">
            <h2 className="font-medium mb-3">Evaluaciones por tipo</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quiz" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#0f172a" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
      </div>
    </main>
  )
}
