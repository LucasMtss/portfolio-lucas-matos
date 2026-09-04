import type { BlogPost, BlogPostInput } from '../types/blog'

const BASE = '/api'

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  })

  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    throw new Error((data as { error?: string }).error ?? 'Erro na requisição')
  }

  return data as T
}

export const api = {
  health: () => request<{ ok: boolean }>('/health'),

  login: (password: string) =>
    request<{ ok: boolean }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ password }),
    }),

  logout: () =>
    request<{ ok: boolean }>('/auth/logout', { method: 'POST' }),

  me: () => request<{ authenticated: boolean }>('/auth/me'),

  getPosts: () => request<BlogPost[]>('/posts'),

  getPost: (slug: string) => request<BlogPost>(`/posts/${slug}`),

  getAdminPosts: () => request<BlogPost[]>('/posts/admin/all'),

  getAdminPost: (id: number) => request<BlogPost>(`/posts/admin/${id}`),

  createPost: (input: BlogPostInput) =>
    request<BlogPost>('/posts/admin', {
      method: 'POST',
      body: JSON.stringify(input),
    }),

  updatePost: (id: number, input: BlogPostInput) =>
    request<BlogPost>(`/posts/admin/${id}`, {
      method: 'PUT',
      body: JSON.stringify(input),
    }),

  deletePost: (id: number) =>
    request<{ ok: boolean }>(`/posts/admin/${id}`, { method: 'DELETE' }),
}

export function formatPostDate(iso: string | null) {
  if (!iso) return ''
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(iso))
}
