import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Spinner } from '../../components/Spinner'

export function AdminUserDetail() {
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<any | null>(null)
  const [q, setQ] = useState('')
  const [quizFilter, setQuizFilter] = useState<string>('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  useEffect(() => {
    if (!id) return
    setLoading(true)
    const token = localStorage.getItem('token')
    fetch(`/api/admin/user?id=${id}`, { headers: token ? { Authorization: `Bearer ${token}` } : undefined })
      .then(async (r) => r.ok ? r.json() : Promise.reject(await r.text()))
      .then(setData)
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false))
  }, [id])

  const filtered = useMemo(() => {
    if (!data) return []
    let items = data.assessments as any[]
    if (quizFilter) items = items.filter(a => a.quiz_id === quizFilter)
    if (from) items = items.filter(a => new Date(a.created_at) >= new Date(from))
    if (to) items = items.filter(a => new Date(a.created_at) <= new Date(to))
    if (q) {
      const t = q.toLowerCase()
      items = items.filter(a => `${a.quiz_id} ${a.score} ${a.interpretation}`.toLowerCase().includes(t))
    }
    return items
  }, [data, quizFilter, from, to, q])

  return (
  <main className="min-h-screen app-bg-light">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Detalle de Usuario</h1>
        </div>

        {loading && <Spinner label="Cargando datos…" />}
        {error && <div className="text-red-600">{error}</div>}
        {data && (
          <>
            <section className="bg-white border border-slate-200 rounded-2xl p-4">
              <h2 className="font-medium mb-2">Paciente</h2>
              <div className="text-sm text-slate-700 dark:text-slate-300">ID: {data.patient.id}</div>
              <div className="text-sm text-slate-700 dark:text-slate-300">Email: {data.patient.email ?? '—'}</div>
              <div className="text-sm text-slate-700 dark:text-slate-300">Alta: {new Date(data.patient.created_at).toLocaleString()}</div>
            </section>

            <section className="bg-white border border-slate-200 rounded-2xl p-4 space-y-4">
              <div className="flex flex-wrap items-end gap-3">
                <div className="flex-1 min-w-[180px]">
                  <label className="text-sm block mb-1">Buscar</label>
                  <input className="w-full" placeholder="Interpretación, puntaje…" value={q} onChange={e => setQ(e.target.value)} />
                </div>
                <div>
                  <label className="text-sm block mb-1">Test</label>
                  <select className="" value={quizFilter} onChange={e => setQuizFilter(e.target.value)}>
                    <option value="">Todos</option>
                    <option value="bai">BAI</option>
                    <option value="epds">EPDS</option>
                    <option value="bdi2">BDI-II</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm block mb-1">Desde</label>
                  <input type="date" className="" value={from} onChange={e => setFrom(e.target.value)} />
                </div>
                <div>
                  <label className="text-sm block mb-1">Hasta</label>
                  <input type="date" className="" value={to} onChange={e => setTo(e.target.value)} />
                </div>
              </div>

              <div className="overflow-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="p-2">Test</th>
                      <th className="p-2">Puntaje</th>
                      <th className="p-2">Interpretación</th>
                      <th className="p-2">Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((a: any) => (
                      <tr key={a.id} className="border-b align-top">
                        <td className="p-2">{a.quiz_id.toUpperCase()}</td>
                        <td className="p-2">{a.score}</td>
                        <td className="p-2">{a.interpretation}</td>
                        <td className="p-2">{new Date(a.created_at).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  )
}
