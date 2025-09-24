export function Spinner({ label }: { label?: string }) {
  return (
    <div
      className="flex items-center gap-2 text-slate-700 dark:text-slate-300"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span
        className="inline-block h-4 w-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"
        aria-hidden="true"
      />
      {label ? <span className="text-sm">{label}</span> : <span className="sr-only">Cargando…</span>}
    </div>
  )
}
