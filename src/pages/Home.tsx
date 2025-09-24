import { Link } from 'react-router-dom'
import { useCallback, useEffect, useRef } from 'react'
import { quizzes } from '../shared/quizzes/meta'

export function Home() {
  // Prefetch inteligente de rutas de administración y gráfico (Recharts) cuando el link
  // aparece en viewport, hover o foco; mejora el tiempo de navegación sin costo inicial.
  const adminLinkRef = useRef<HTMLAnchorElement | null>(null)
  const prefetchedRef = useRef(false)

  const prefetchAdmin = useCallback(() => {
    if (prefetchedRef.current) return
    prefetchedRef.current = true
    const trigger = () => {
      import('../pages/admin/Login')
      import('../pages/admin/Dashboard')
      import('../pages/admin/UserDetail')
      import('../pages/admin/AdminBarChart')
    }
    if (typeof window !== 'undefined') {
      const w = window as unknown as { requestIdleCallback?: (cb: () => void) => void }
      const fallback = (cb: () => void) => setTimeout(cb, 100)
      const ric = typeof w.requestIdleCallback === 'function' ? w.requestIdleCallback : fallback
      ric(trigger)
    } else {
      trigger()
    }
  }, [])

  useEffect(() => {
    const el = adminLinkRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const obs = new IntersectionObserver((entries, observer) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          prefetchAdmin()
          observer.disconnect()
          break
        }
      }
    }, { rootMargin: '200px' })
    obs.observe(el)
    return () => obs.disconnect()
  }, [prefetchAdmin])

  return (
    <>
      <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 bg-white text-slate-900 px-3 py-2 rounded shadow">Saltar al contenido</a>
      <main id="contenido" role="main" className="min-h-screen app-bg-light dark:app-bg-dark">
      <div className="max-w-3xl mx-auto p-6 space-y-8">
        <header className="text-center space-y-3 pt-4">
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-100">Plataforma de Evaluaciones</h1>
          <p className="text-slate-600 dark:text-slate-300">Seleccione un cuestionario para comenzar</p>
        </header>
        <ul className="grid sm:grid-cols-2 gap-4">
          {quizzes.map(q => (
            <li key={q.id} className="border border-slate-200 dark:border-slate-700 rounded-2xl p-5 bg-white/80 dark:bg-slate-900/60 shadow-sm">
              <div className="flex flex-col h-full">
                <div className="flex-1">
                  <h2 className="font-medium text-slate-900 dark:text-slate-100">{q.title}</h2>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{q.description}</p>
                </div>
                <Link className="mt-4 btn-primary" to={`/quiz/${q.id}`}>Iniciar</Link>
              </div>
            </li>
          ))}
        </ul>
        <div className="text-center text-sm text-slate-600 dark:text-slate-300">
          <Link
            ref={adminLinkRef}
            className="underline"
            to="/admin/login"
            onMouseEnter={prefetchAdmin}
            onFocus={prefetchAdmin}
          >
            Administración
          </Link>
        </div>
      </div>
      </main>
    </>
  )
}
