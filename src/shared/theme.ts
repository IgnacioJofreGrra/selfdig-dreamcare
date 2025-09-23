export type ThemeMode = 'system' | 'light' | 'dark'

const STORAGE_KEY = 'theme'

export function getSavedTheme(): ThemeMode | null {
  const v = localStorage.getItem(STORAGE_KEY)
  if (v === 'light' || v === 'dark' || v === 'system') return v
  return null
}

export function getSystemPrefersDark() {
  if (typeof window === 'undefined') return false
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function applyTheme(mode: ThemeMode) {
  const root = document.documentElement
  const prefersDark = getSystemPrefersDark()
  const isDark = mode === 'dark' || (mode === 'system' && prefersDark)
  root.classList.toggle('dark', isDark)
  // background helper classes on root
  root.classList.toggle('app-bg-dark', isDark)
  root.classList.toggle('app-bg-light', !isDark)
}

export function saveTheme(mode: ThemeMode) {
  localStorage.setItem(STORAGE_KEY, mode)
}

export function initTheme() {
  const saved = getSavedTheme() || 'system'
  applyTheme(saved)
  if (saved === 'system') {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => applyTheme('system')
    mq.addEventListener?.('change', handler)
    // return unsubscribe on hot reload contexts (ignored in prod)
    return () => mq.removeEventListener?.('change', handler)
  }
  return () => {}
}
