import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Lock } from 'lucide-react'
import { api } from '../../lib/api'
import { site } from '../../data/site'

export function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string })?.from ?? '/admin'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await api.login(password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao entrar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-[100svh] items-center justify-center px-4 py-20">
      <div className="w-full max-w-md rounded-2xl border border-line bg-surface-elevated p-8 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-xl bg-accent-soft p-2.5 text-accent">
            <Lock size={20} aria-hidden />
          </div>
          <div>
            <h1 className="font-heading text-xl font-semibold text-ink">
              Área do blog
            </h1>
            <p className="text-sm text-ink-muted">{site.name}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-medium text-ink"
            >
              Senha de administrador
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-ink outline-none transition-colors duration-200 focus:border-accent"
              placeholder="Sua senha"
              required
              autoComplete="current-password"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer rounded-xl bg-ink py-3 text-sm font-semibold text-surface transition-colors duration-200 hover:bg-accent disabled:opacity-60"
          >
            {loading ? 'Entrando…' : 'Entrar'}
          </button>
        </form>

        <Link
          to="/"
          className="mt-6 block text-center text-sm text-ink-muted transition-colors duration-200 hover:text-ink"
        >
          ← Voltar ao portfólio
        </Link>
      </div>
    </main>
  )
}
