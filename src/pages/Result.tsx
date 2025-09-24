import { useLocation, Link } from 'react-router-dom'

export function Result() {
  const { state } = useLocation() as any
  const { quizId, result } = state ?? {}
  if (!quizId || !result) {
    return (
      <>
        <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 bg-white text-slate-900 px-3 py-2 rounded shadow">Saltar al contenido</a>
        <main id="contenido" role="main" className="max-w-xl mx-auto p-6 min-h-screen app-bg-light">
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <p className="text-slate-700">No hay resultado para mostrar.</p>
          <Link className="underline mt-3 inline-block" to="/">Volver</Link>
        </div>
        </main>
      </>
    )
  }
  return (
    <>
      <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 bg-white text-slate-900 px-3 py-2 rounded shadow">Saltar al contenido</a>
  <main id="contenido" role="main" className="max-w-xl mx-auto p-6 space-y-5 min-h-screen app-bg-light">
  <h1 className="text-2xl font-semibold text-slate-900">Resultado</h1>
  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-lg">Puntuación total: <strong>{result.total}</strong></p>
          <span className="text-xs px-2 py-1 rounded-full bg-slate-100 border border-slate-200">{(quizId as string).toUpperCase()}</span>
        </div>
  <p className="text-slate-700 mt-2">Interpretación: {result.interpretation}</p>
        {result.alertQ10 && (
          <p className="text-red-600 mt-3">Alerta: respuesta positiva en el ítem 10 (autolesión).</p>
        )}
        {result.alertItem9 && (
          <p className="text-red-600 mt-3">Alerta: ideación suicida reportada en el BDI-II.</p>
        )}
      </div>
      <Link className="px-3 py-2 bg-slate-900 text-white rounded-xl inline-block" to="/">Volver al inicio</Link>
      </main>
    </>
  )
}
