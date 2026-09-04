import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ArrowLeft, Calendar } from 'lucide-react'
import { api, formatPostDate } from '../lib/api'
import { renderMarkdown } from '../lib/markdown'
import type { BlogPost } from '../types/blog'
import { PreviewImage } from '../components/PreviewImage'
import { Reveal } from '../components/Reveal'

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')

  useEffect(() => {
    if (!slug) return
    api
      .getPost(slug)
      .then(setPost)
      .then(() => setStatus('ready'))
      .catch(() => setStatus('error'))
  }, [slug])

  if (status === 'loading') {
    return (
      <main className="min-h-[60svh] pt-28 pb-20">
        <div className="mx-auto max-w-3xl animate-pulse px-4 md:px-6">
          <div className="mb-8 h-4 w-32 rounded bg-line" />
          <div className="mb-4 h-10 w-3/4 rounded bg-line" />
          <div className="mb-8 h-64 rounded-2xl bg-line" />
          <div className="space-y-3">
            <div className="h-4 w-full rounded bg-line" />
            <div className="h-4 w-full rounded bg-line" />
            <div className="h-4 w-2/3 rounded bg-line" />
          </div>
        </div>
      </main>
    )
  }

  if (status === 'error' || !post) {
    return (
      <main className="min-h-[60svh] pt-28 pb-20 text-center">
        <p className="text-ink-muted">Post não encontrado.</p>
        <Link
          to="/blog"
          className="mt-4 inline-flex cursor-pointer items-center gap-2 text-accent hover:underline"
        >
          <ArrowLeft size={16} aria-hidden />
          Voltar ao blog
        </Link>
      </main>
    )
  }

  const date = formatPostDate(post.published_at ?? post.created_at)
  const gallery = post.images.filter((url) => url !== post.cover_image)

  return (
    <main className="scroll-mt-24 pt-28 pb-20 md:pt-32 md:pb-28">
      <article className="mx-auto max-w-3xl px-4 md:px-6 lg:px-8">
        <Reveal>
          <Link
            to="/blog"
            className="mb-8 inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-ink-muted transition-colors duration-200 hover:text-ink"
          >
            <ArrowLeft size={16} aria-hidden />
            Voltar ao blog
          </Link>

          <time
            dateTime={post.published_at ?? post.created_at}
            className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-ink-subtle"
          >
            <Calendar size={14} aria-hidden />
            {date}
          </time>

          <h1 className="font-heading text-3xl font-semibold tracking-tight text-ink md:text-5xl">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="mt-4 text-lg leading-relaxed text-ink-muted">
              {post.excerpt}
            </p>
          )}
        </Reveal>

        {post.cover_image && (
          <Reveal delay={0.08} className="mt-8">
            <div className="overflow-hidden rounded-2xl border border-line">
              <PreviewImage
                sources={[post.cover_image]}
                alt=""
                fallbackLabel={post.title}
                className="aspect-[16/10] w-full object-cover object-top"
              />
            </div>
          </Reveal>
        )}

        <Reveal delay={0.12} className="mt-10">
          <div
            className="blog-prose"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
          />
        </Reveal>

        {gallery.length > 0 && (
          <Reveal delay={0.16} className="mt-10">
            <h2 className="mb-4 font-heading text-lg font-semibold text-ink">
              Galeria
            </h2>
            <ul className="grid gap-4 sm:grid-cols-2">
              {gallery.map((url) => (
                <li
                  key={url}
                  className="overflow-hidden rounded-xl border border-line"
                >
                  <img
                    src={url}
                    alt=""
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </article>
    </main>
  )
}
