import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ArrowLeft, Save } from 'lucide-react'
import { api } from '../../lib/api'
import type { BlogPostInput } from '../../types/blog'

const emptyForm: BlogPostInput & { slug?: string } = {
  title: '',
  content: '',
  excerpt: '',
  cover_image: '',
  images: [],
  published: false,
  slug: '',
}

export function AdminEditorPage() {
  const { id } = useParams<{ id: string }>()
  const isNew = !id || id === 'new'
  const navigate = useNavigate()

  const [form, setForm] = useState(emptyForm)
  const [imagesText, setImagesText] = useState('')
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isNew) return
    api
      .getAdminPost(Number(id))
      .then((post) => {
        setForm({
          title: post.title,
          content: post.content,
          excerpt: post.excerpt ?? '',
          cover_image: post.cover_image ?? '',
          images: post.images,
          published: post.published,
          slug: post.slug,
        })
        setImagesText(post.images.join('\n'))
      })
      .catch(() => setError('Post não encontrado'))
      .finally(() => setLoading(false))
  }, [id, isNew])

  function updateField<K extends keyof typeof form>(
    key: K,
    value: (typeof form)[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSaving(true)

    const images = imagesText
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)

    const payload: BlogPostInput = {
      title: form.title,
      content: form.content,
      excerpt: form.excerpt,
      cover_image: form.cover_image,
      images,
      published: form.published,
      slug: form.slug,
    }

    try {
      if (isNew) {
        const created = await api.createPost(payload)
        navigate(`/admin/posts/${created.id}/edit`, { replace: true })
      } else {
        await api.updatePost(Number(id), payload)
        navigate('/admin')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <main className="min-h-[60svh] pt-28 pb-20">
        <p className="px-4 text-ink-muted">Carregando post…</p>
      </main>
    )
  }

  return (
    <main className="min-h-[100svh] pt-28 pb-20 md:pt-32">
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-3xl px-4 md:px-6"
      >
        <Link
          to="/admin"
          className="mb-6 inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-ink-muted hover:text-ink"
        >
          <ArrowLeft size={16} aria-hidden />
          Voltar ao painel
        </Link>

        <h1 className="font-heading text-2xl font-semibold text-ink md:text-3xl">
          {isNew ? 'Novo post' : 'Editar post'}
        </h1>

        <div className="mt-8 space-y-5">
          <Field label="Título" required>
            <input
              value={form.title}
              onChange={(e) => updateField('title', e.target.value)}
              className={inputClass}
              placeholder="Título do post"
              required
            />
          </Field>

          <Field label="Slug (opcional)">
            <input
              value={form.slug ?? ''}
              onChange={(e) => updateField('slug', e.target.value)}
              className={inputClass}
              placeholder="gerado-automaticamente-do-titulo"
            />
          </Field>

          <Field label="Resumo">
            <textarea
              value={form.excerpt ?? ''}
              onChange={(e) => updateField('excerpt', e.target.value)}
              className={`${inputClass} min-h-[80px] resize-y`}
              placeholder="Breve descrição para a listagem"
              rows={2}
            />
          </Field>

          <Field label="Imagem de capa (URL)">
            <input
              value={form.cover_image ?? ''}
              onChange={(e) => updateField('cover_image', e.target.value)}
              className={inputClass}
              placeholder="https://..."
              type="url"
            />
          </Field>

          <Field label="Imagens extras (uma URL por linha)">
            <textarea
              value={imagesText}
              onChange={(e) => setImagesText(e.target.value)}
              className={`${inputClass} min-h-[100px] resize-y font-mono text-sm`}
              placeholder="https://imagem1.jpg&#10;https://imagem2.jpg"
              rows={4}
            />
          </Field>

          <Field label="Conteúdo (Markdown)" required>
            <textarea
              value={form.content}
              onChange={(e) => updateField('content', e.target.value)}
              className={`${inputClass} min-h-[320px] resize-y font-mono text-sm leading-relaxed`}
              placeholder="Escreva em Markdown. Use **negrito**, listas, links e ![alt](url) para imagens."
              required
            />
          </Field>

          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3">
            <input
              type="checkbox"
              checked={Boolean(form.published)}
              onChange={(e) => updateField('published', e.target.checked)}
              className="h-4 w-4 cursor-pointer accent-accent"
            />
            <span className="text-sm font-medium text-ink">Publicar post</span>
          </label>

          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={saving}
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-ink px-6 py-3 text-sm font-semibold text-surface transition-colors duration-200 hover:bg-accent disabled:opacity-60"
          >
            <Save size={16} aria-hidden />
            {saving ? 'Salvando…' : isNew ? 'Criar post' : 'Salvar e voltar'}
          </button>
        </div>
      </form>
    </main>
  )
}

function Field({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink">
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      {children}
    </div>
  )
}

const inputClass =
  'w-full rounded-xl border border-line bg-surface-elevated px-4 py-3 text-ink outline-none transition-colors duration-200 focus:border-accent'
