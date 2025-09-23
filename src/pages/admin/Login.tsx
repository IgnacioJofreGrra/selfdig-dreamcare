import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../services/api'
import { ThemeToggle } from '../../components/ThemeToggle'

export function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const nav = useNavigate()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await api.post('/api/auth/login', { email, password })
      localStorage.setItem('token', res.token)
      nav('/admin/dashboard')
    } catch (err: any) {
      setError(err?.message ?? 'Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen app-bg-light dark:app-bg-dark">
      <div className="max-w-sm mx-auto p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">Acceso Administrador</h1>
          <ThemeToggle />
        </div>
        <form className="space-y-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-sm" onSubmit={onSubmit}>
          <input className="w-full border rounded-md p-2 bg-white dark:bg-slate-900" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <input className="w-full border rounded-md p-2 bg-white dark:bg-slate-900" placeholder="Contraseña" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button className="w-full py-2 bg-slate-900 text-white rounded-xl" disabled={loading}>{loading ? 'Entrando…' : 'Entrar'}</button>
        </form>
      </div>
    </main>
  )
}
