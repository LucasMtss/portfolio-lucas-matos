import { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { AdminLoginPage } from './AdminLoginPage'
import { api } from '../../lib/api'

export function AdminLoginRoute() {
  const [checking, setChecking] = useState(true)
  const [authed, setAuthed] = useState(false)
  const location = useLocation()

  useEffect(() => {
    api
      .me()
      .then(() => setAuthed(true))
      .catch(() => setAuthed(false))
      .finally(() => setChecking(false))
  }, [])

  if (checking) {
    return (
      <div className="flex min-h-[50svh] items-center justify-center text-ink-muted">
        Verificando sessão…
      </div>
    )
  }

  if (authed) {
    const from = (location.state as { from?: string })?.from ?? '/admin'
    return <Navigate to={from} replace />
  }

  return <AdminLoginPage />
}
