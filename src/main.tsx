import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { Home } from './pages/Home'
import { Quiz } from './pages/Quiz'
import { Result } from './pages/Result'
import { AdminLogin } from './pages/admin/Login'
import { AdminDashboard } from './pages/admin/Dashboard'
import { AdminUserDetail } from './pages/admin/UserDetail'
import { RootLayout } from './components/RootLayout'

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
    <RouterProvider router={router} />
  </React.StrictMode>
)
