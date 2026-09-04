import { neon } from '@neondatabase/serverless'

const connectionString = process.env.DATABASE_URL
if (!connectionString) {
  throw new Error('DATABASE_URL não definida no ambiente')
}

export const sql = neon(connectionString)

export type BlogPostRow = {
  id: number
  title: string
  slug: string
  content: string
  excerpt: string | null
  cover_image: string | null
  images: string[]
  published: boolean
  published_at: string | null
  created_at: string
  updated_at: string
}

export async function initDb() {
  await sql`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      slug VARCHAR(255) UNIQUE NOT NULL,
      content TEXT NOT NULL,
      excerpt TEXT,
      cover_image TEXT,
      images JSONB DEFAULT '[]'::jsonb,
      published BOOLEAN DEFAULT false,
      published_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `
  await sql`
    CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug)
  `
  await sql`
    CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC)
  `
}

export function rowToPost(row: Record<string, unknown>): BlogPostRow {
  const images = row.images
  return {
    id: row.id as number,
    title: row.title as string,
    slug: row.slug as string,
    content: row.content as string,
    excerpt: (row.excerpt as string | null) ?? null,
    cover_image: (row.cover_image as string | null) ?? null,
    images: Array.isArray(images) ? (images as string[]) : [],
    published: Boolean(row.published),
    published_at: (row.published_at as string | null) ?? null,
    created_at: row.created_at as string,
    updated_at: row.updated_at as string,
  }
}
