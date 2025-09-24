import { useEffect, useState } from 'react'
import { ThemeMode, applyTheme, getSavedTheme, saveTheme } from '../shared/theme'

export function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>('system')

  useEffect(() => {
    const saved = getSavedTheme()
    const next = saved ?? 'system'
    setMode(next)
    applyTheme(next)
  }, [])

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value as ThemeMode
    setMode(next)
    saveTheme(next)
    applyTheme(next)
  }

  return (
    <label className="text-sm inline-flex items-center gap-2">
      <span>Tema</span>
      <select value={mode} onChange={onChange} className="border border-slate-300 dark:border-slate-700 rounded-md px-2 py-1 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400">
        <option value="system">Sistema</option>
        <option value="light">Claro</option>
        <option value="dark">Oscuro</option>
      </select>
    </label>
  )
}
