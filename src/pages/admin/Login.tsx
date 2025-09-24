import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../services/api'

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
  <main className="min-h-screen app-bg-light">
      <div className="max-w-sm mx-auto p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">Acceso Administrador</h1>
        </div>
  <form className="space-y-3 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm" onSubmit={onSubmit} noValidate>
          <div className="space-y-1">
            <label htmlFor="admin-email" className="text-sm">Email</label>
            <input
              id="admin-email"
              className="w-full"
              placeholder="admin@ejemplo.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
              autoComplete="username"
              required
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="admin-password" className="text-sm">Contraseña</label>
            <input
              id="admin-password"
              className="w-full"
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              minLength={6}
            />
          </div>
          {error && <div className="text-red-600 text-sm" role="alert">{error}</div>}
          <button className="w-full btn-primary min-h-[44px]" disabled={loading}>{loading ? 'Entrando…' : 'Entrar'}</button>
        </form>
      </div>
    </main>
  )
}
