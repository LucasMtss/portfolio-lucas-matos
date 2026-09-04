import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Calendar, ArrowRight } from 'lucide-react'
import { api, formatPostDate } from '../lib/api'
import type { BlogPost } from '../types/blog'
import { PreviewImage } from '../components/PreviewImage'
import { Reveal } from '../components/Reveal'

export function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')

  useEffect(() => {
    api
      .getPosts()
      .then(setPosts)
      .then(() => setStatus('ready'))
      .catch(() => setStatus('error'))
  }, [])

  return (
    <main className="min-h-[100svh] scroll-mt-24 pt-28 pb-20 md:pt-32 md:pb-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <Reveal>
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-ink-subtle">
            Blog
          </p>
          <h1 className="font-heading max-w-3xl text-3xl font-semibold tracking-tight text-ink md:text-5xl">
            Projetos, aprendizados e atualizações
          </h1>
          <p className="mt-4 max-w-xl text-base text-ink-muted md:text-lg">
            Textos sobre desenvolvimento, projetos em andamento e outras coisas
            que estou explorando.
          </p>
        </Reveal>

        {status === 'loading' && (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse overflow-hidden rounded-2xl border border-line"
              >
                <div className="aspect-[16/10] bg-line" />
                <div className="space-y-3 p-5">
                  <div className="h-4 w-1/3 rounded bg-line" />
                  <div className="h-6 w-2/3 rounded bg-line" />
                  <div className="h-4 w-full rounded bg-line" />
                </div>
              </div>
            ))}
          </div>
        )}

        {status === 'error' && (
          <p className="mt-12 text-center text-ink-muted">
            Não foi possível carregar os posts. Tente novamente mais tarde.
          </p>
        )}

        {status === 'ready' && posts.length === 0 && (
          <p className="mt-12 rounded-2xl border border-dashed border-line bg-surface-elevated px-6 py-12 text-center text-ink-muted">
            Nenhum post publicado ainda. Volte em breve!
          </p>
        )}

        {status === 'ready' && posts.length > 0 && (
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <Reveal key={post.id} delay={index * 0.05}>
                <li>
                  <BlogCard post={post} />
                </li>
              </Reveal>
            ))}
          </ul>
        )}
      </div>
    </main>
  )
}

function BlogCard({ post }: { post: BlogPost }) {
  const date = formatPostDate(post.published_at ?? post.created_at)
  const preview = post.cover_image ?? post.images[0] ?? null

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface-elevated transition-colors duration-300 hover:border-ink/20">
      <Link to={`/blog/${post.slug}`} className="cursor-pointer">
        <div className="relative aspect-[16/10] overflow-hidden bg-line">
          {preview ? (
            <PreviewImage
              sources={[preview]}
              alt=""
              fallbackLabel={post.title}
              className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-accent-soft to-line px-6">
              <span className="font-heading text-lg font-semibold text-accent-deep">
                {post.title}
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col p-5">
          <time
            dateTime={post.published_at ?? post.created_at}
            className="mb-2 inline-flex items-center gap-1.5 text-xs font-medium text-ink-subtle"
          >
            <Calendar size={13} aria-hidden />
            {date}
          </time>
          <h2 className="font-heading text-xl font-semibold tracking-tight text-ink transition-colors duration-200 group-hover:text-accent">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-muted">
              {post.excerpt}
            </p>
          )}
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
            Ler mais
            <ArrowRight
              size={14}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden
            />
          </span>
        </div>
      </Link>
    </article>
  )
}
