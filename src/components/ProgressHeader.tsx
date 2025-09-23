type Props = {
  current: number
  total: number
}

export function ProgressHeader({ current, total }: Props) {
  const percent = Math.round((current / total) * 100)
  return (
    <header className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b">
      <div className="max-w-xl mx-auto p-3">
        <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
          <span>Pregunta {current} de {total}</span>
          <span>{percent}%</span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-800 rounded h-2 mt-2">
          <div className="bg-slate-900 dark:bg-slate-200 h-2 rounded transition-all" style={{ width: `${percent}%` }} />
        </div>
      </div>
    </header>
  )
}
