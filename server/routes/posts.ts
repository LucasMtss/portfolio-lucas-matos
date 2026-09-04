import { Router } from 'express'
import { sql, rowToPost } from '../db.js'
import { authMiddleware } from '../auth.js'
import { slugify, uniqueSlug } from '../slug.js'

export const postsRouter = Router()

/** Público — posts publicados */
postsRouter.get('/', async (_req, res) => {
  try {
    const rows = await sql`
      SELECT id, title, slug, excerpt, cover_image, images, published_at, created_at
      FROM blog_posts
      WHERE published = true
      ORDER BY COALESCE(published_at, created_at) DESC
    `
    res.json(rows.map((r) => rowToPost(r as Record<string, unknown>)))
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro ao listar posts' })
  }
})

postsRouter.get('/:slug', async (req, res) => {
  try {
    const rows = await sql`
      SELECT * FROM blog_posts
      WHERE slug = ${req.params.slug} AND published = true
      LIMIT 1
    `
    if (rows.length === 0) {
      res.status(404).json({ error: 'Post não encontrado' })
      return
    }
    res.json(rowToPost(rows[0] as Record<string, unknown>))
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro ao buscar post' })
  }
})

/** Admin — todos os posts */
postsRouter.get('/admin/all', authMiddleware, async (_req, res) => {
  try {
    const rows = await sql`
      SELECT * FROM blog_posts
      ORDER BY updated_at DESC
    `
    res.json(rows.map((r) => rowToPost(r as Record<string, unknown>)))
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro ao listar posts' })
  }
})

postsRouter.get('/admin/:id', authMiddleware, async (req, res) => {
  try {
    const id = Number(req.params.id)
    const rows = await sql`SELECT * FROM blog_posts WHERE id = ${id} LIMIT 1`
    if (rows.length === 0) {
      res.status(404).json({ error: 'Post não encontrado' })
      return
    }
    res.json(rowToPost(rows[0] as Record<string, unknown>))
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro ao buscar post' })
  }
})

postsRouter.post('/admin', authMiddleware, async (req, res) => {
  try {
    const { title, content, excerpt, cover_image, images, published } = req.body

    if (!title?.trim() || !content?.trim()) {
      res.status(400).json({ error: 'Título e conteúdo são obrigatórios' })
      return
    }

    const slug = await uniqueSlug(title, async (s) => {
      const r = await sql`SELECT id FROM blog_posts WHERE slug = ${s} LIMIT 1`
      return r.length > 0
    })

    const imageList = Array.isArray(images)
      ? images.filter((u: unknown) => typeof u === 'string' && u.trim())
      : []

    const isPublished = Boolean(published)
    const rows = await sql`
      INSERT INTO blog_posts (title, slug, content, excerpt, cover_image, images, published, published_at)
      VALUES (
        ${title.trim()},
        ${slug},
        ${content.trim()},
        ${excerpt?.trim() || null},
        ${cover_image?.trim() || null},
        ${JSON.stringify(imageList)}::jsonb,
        ${isPublished},
        ${isPublished ? new Date().toISOString() : null}
      )
      RETURNING *
    `
    res.status(201).json(rowToPost(rows[0] as Record<string, unknown>))
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro ao criar post' })
  }
})

postsRouter.put('/admin/:id', authMiddleware, async (req, res) => {
  try {
    const id = Number(req.params.id)
    const { title, content, excerpt, cover_image, images, published, slug: customSlug } =
      req.body

    const existing = await sql`SELECT * FROM blog_posts WHERE id = ${id} LIMIT 1`
    if (existing.length === 0) {
      res.status(404).json({ error: 'Post não encontrado' })
      return
    }

    const current = rowToPost(existing[0] as Record<string, unknown>)
    const nextTitle = title?.trim() || current.title
    const nextContent = content?.trim() ?? current.content
    const nextExcerpt = excerpt !== undefined ? excerpt?.trim() || null : current.excerpt
    const nextCover =
      cover_image !== undefined ? cover_image?.trim() || null : current.cover_image
    const nextImages = Array.isArray(images)
      ? images.filter((u: unknown) => typeof u === 'string' && u.trim())
      : current.images
    const nextPublished = published !== undefined ? Boolean(published) : current.published

    let nextSlug = current.slug
    if (customSlug?.trim()) {
      nextSlug = slugify(customSlug)
    } else if (title?.trim() && title.trim() !== current.title) {
      nextSlug = await uniqueSlug(
        title,
        async (s, excludeId) => {
          const r = await sql`
            SELECT id FROM blog_posts WHERE slug = ${s} AND id != ${excludeId ?? id} LIMIT 1
          `
          return r.length > 0
        },
        id,
      )
    }

    const slugTaken = await sql`
      SELECT id FROM blog_posts WHERE slug = ${nextSlug} AND id != ${id} LIMIT 1
    `
    if (slugTaken.length > 0) {
      res.status(409).json({ error: 'Slug já em uso' })
      return
    }

    let publishedAt = current.published_at
    if (nextPublished && !current.published) {
      publishedAt = new Date().toISOString()
    } else if (!nextPublished) {
      publishedAt = null
    }

    const rows = await sql`
      UPDATE blog_posts SET
        title = ${nextTitle},
        slug = ${nextSlug},
        content = ${nextContent},
        excerpt = ${nextExcerpt},
        cover_image = ${nextCover},
        images = ${JSON.stringify(nextImages)}::jsonb,
        published = ${nextPublished},
        published_at = ${publishedAt},
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `
    res.json(rowToPost(rows[0] as Record<string, unknown>))
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro ao atualizar post' })
  }
})

postsRouter.delete('/admin/:id', authMiddleware, async (req, res) => {
  try {
    const id = Number(req.params.id)
    const rows = await sql`DELETE FROM blog_posts WHERE id = ${id} RETURNING id`
    if (rows.length === 0) {
      res.status(404).json({ error: 'Post não encontrado' })
      return
    }
    res.json({ ok: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro ao excluir post' })
  }
})
