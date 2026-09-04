import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { initDb } from './db.js'
import { postsRouter } from './routes/posts.js'
import { authRouter } from './routes/auth.js'

let dbReady = false

async function ensureDb() {
  if (!dbReady) {
    await initDb()
    dbReady = true
  }
}

export async function createApp() {
  await ensureDb()

  const app = express()
  const isLocalDev = !process.env.VERCEL && process.env.NODE_ENV !== 'production'

  app.use(
    cors({
      origin: isLocalDev
        ? ['http://localhost:5173', 'http://127.0.0.1:5173']
        : true,
      credentials: true,
    }),
  )
  app.use(express.json({ limit: '2mb' }))
  app.use(cookieParser())

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true })
  })

  app.use('/api/auth', authRouter)
  app.use('/api/posts', postsRouter)

  return app
}
