import { Outlet, useNavigation } from 'react-router-dom'
import { Spinner } from './Spinner'

export function RootLayout() {
  const nav = useNavigation()
  const busy = nav.state !== 'idle'
  return (
    <div>
      {busy && (
        <div className="fixed inset-0 pointer-events-none flex items-start justify-center pt-6 z-[60]">
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur rounded-full px-3 py-1 shadow-sm">
            <Spinner label="Cargando…" />
          </div>
        </div>
      )}
      <Outlet />
    </div>
  )
}
