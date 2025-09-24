// Con el tema fijo, no exponemos ningún API; dejamos no-ops para compatibilidad.
export type ThemeMode = 'light'

export function initTheme() {
  const root = document.documentElement
  root.classList.remove('dark')
  root.classList.add('app-bg-light')
  root.classList.remove('app-bg-dark')
  return () => {}
}
