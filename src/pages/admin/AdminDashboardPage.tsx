import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, LogOut, Eye, EyeOff } from 'lucide-react'
import { api, formatPostDate } from '../../lib/api'
import type { BlogPost } from '../../types/blog'

export function AdminDashboardPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  async function loadPosts() {
    setLoading(true)
    try {
      setPosts(await api.getAdminPosts())
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPosts()
  }, [])

  async function handleLogout() {
    await api.logout()
    navigate('/admin/login')
  }

  async function handleDelete(id: number, title: string) {
    if (!confirm(`Excluir "${title}"?`)) return
    await api.deletePost(id)
    loadPosts()
  }

  return (
    <main className="min-h-[100svh] pt-28 pb-20 md:pt-32">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-2xl font-semibold text-ink md:text-3xl">
              Painel do blog
            </h1>
            <p className="mt-1 text-sm text-ink-muted">
              Escreva, edite e publique posts
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              to="/admin/posts/new"
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-accent-deep"
            >
              <Plus size={16} aria-hidden />
              Novo post
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-line px-4 py-2.5 text-sm font-medium text-ink transition-colors duration-200 hover:bg-surface"
            >
              <LogOut size={16} aria-hidden />
              Sair
            </button>
          </div>
        </div>

        {loading ? (
          <p className="text-ink-muted">Carregando…</p>
        ) : posts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-line px-6 py-16 text-center">
            <p className="text-ink-muted">Nenhum post ainda.</p>
            <Link
              to="/admin/posts/new"
              className="mt-4 inline-flex cursor-pointer text-sm font-semibold text-accent hover:underline"
            >
              Criar o primeiro post
            </Link>
          </div>
        ) : (
          <ul className="space-y-3">
            {posts.map((post) => (
              <li
                key={post.id}
                className="flex flex-col gap-3 rounded-2xl border border-line bg-surface-elevated p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                        post.published
                          ? 'bg-green-100 text-green-800'
                          : 'bg-zinc-100 text-zinc-600'
                      }`}
                    >
                      {post.published ? (
                        <>
                          <Eye size={11} aria-hidden /> Publicado
                        </>
                      ) : (
                        <>
                          <EyeOff size={11} aria-hidden /> Rascunho
                        </>
                      )}
                    </span>
                    <time className="text-xs text-ink-subtle">
                      {formatPostDate(post.updated_at)}
                    </time>
                  </div>
                  <h2 className="truncate font-heading text-lg font-semibold text-ink">
                    {post.title}
                  </h2>
                  <p className="truncate text-sm text-ink-muted">/blog/{post.slug}</p>
                </div>
                <div className="flex shrink-0 gap-2">
                  {post.published && (
                    <a
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-line px-3 py-2 text-xs font-medium text-ink hover:bg-surface"
                    >
                      <Eye size={14} aria-hidden />
                      Ver
                    </a>
                  )}
                  <Link
                    to={`/admin/posts/${post.id}/edit`}
                    className="inline-flex cursor-pointer items-center gap-1 rounded-lg bg-ink px-3 py-2 text-xs font-medium text-surface hover:bg-accent"
                  >
                    <Pencil size={14} aria-hidden />
                    Editar
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(post.id, post.title)}
                    className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-red-200 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50"
                  >
                    <Trash2 size={14} aria-hidden />
                    Excluir
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  )
}
