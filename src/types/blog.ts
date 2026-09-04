export type BlogPost = {
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

export type BlogPostInput = {
  title: string
  content: string
  excerpt?: string
  cover_image?: string
  images?: string[]
  published?: boolean
  slug?: string
}

export type BlogPostSummary = Pick<
  BlogPost,
  | 'id'
  | 'title'
  | 'slug'
  | 'excerpt'
  | 'cover_image'
  | 'images'
  | 'published_at'
  | 'created_at'
>
