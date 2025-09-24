import React, { Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { Home } from './pages/Home'
const Quiz = lazy(() => import('./pages/Quiz').then(m => ({ default: m.Quiz })))
const Result = lazy(() => import('./pages/Result').then(m => ({ default: m.Result })))
const AdminLogin = lazy(() => import('./pages/admin/Login').then(m => ({ default: m.AdminLogin })))
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard').then(m => ({ default: m.AdminDashboard })))
const AdminUserDetail = lazy(() => import('./pages/admin/UserDetail').then(m => ({ default: m.AdminUserDetail })))
import { RootLayout } from './components/RootLayout'
import { Spinner } from './components/Spinner'

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/quiz/:id', element: <Quiz /> },
      { path: '/result', element: <Result /> },
      { path: '/admin/login', element: <AdminLogin /> },
      { path: '/admin/dashboard', element: <AdminDashboard /> },
      { path: '/admin/users/:id', element: <AdminUserDetail /> },
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback={<div className="fixed inset-0 flex items-center justify-center"><Spinner label="Cargando…" /></div>}>
      <RouterProvider router={router} />
    </Suspense>
  </React.StrictMode>
)
