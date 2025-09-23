import { Link } from 'react-router-dom'
import { quizzes } from '../shared/quizzes/meta'

export function Home() {
  return (
    <main className="min-h-screen app-bg-light dark:app-bg-dark">
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
                <Link className="mt-4 inline-flex items-center justify-center px-3 py-2 bg-slate-900 text-white rounded-xl" to={`/quiz/${q.id}`}>Iniciar</Link>
              </div>
            </li>
          ))}
        </ul>
        <div className="text-center text-sm text-slate-600 dark:text-slate-300">
          <Link className="underline" to="/admin/login">Administración</Link>
        </div>
      </div>
    </main>
  )
}
