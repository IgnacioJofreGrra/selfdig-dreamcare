type Props = {
  current: number
  total: number
}

export function ProgressHeader({ current, total }: Props) {
  const percent = Math.round((current / total) * 100)
  return (
    <header className="sticky top-0 z-10 bg-white/85 dark:bg-slate-900/85 backdrop-blur border-b border-slate-200 dark:border-slate-700">
      <div className="max-w-xl mx-auto p-3">
        <div className="flex items-center justify-between text-sm text-slate-700 dark:text-slate-200">
          <span>Pregunta {current} de {total}</span>
          <span>{percent}%</span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-800 rounded h-2 mt-2" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent} aria-label="Progreso del cuestionario">
          <div className="bg-slate-900 dark:bg-white h-2 rounded transition-[width] duration-300 ease-out" style={{ width: `${percent}%` }} />
        </div>
      </div>
    </header>
  )
}
