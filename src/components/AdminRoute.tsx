import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { api } from '../lib/api'

export function AdminRoute() {
  const [status, setStatus] = useState<'loading' | 'ok' | 'denied'>('loading')
  const location = useLocation()

  useEffect(() => {
    api
      .me()
      .then(() => setStatus('ok'))
      .catch(() => setStatus('denied'))
  }, [])

  if (status === 'loading') {
    return (
      <div className="flex min-h-[50svh] items-center justify-center text-ink-muted">
        Verificando sessão…
      </div>
    )
  }

  if (status === 'denied') {
    return (
      <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
    )
  }

  return <Outlet />
}
