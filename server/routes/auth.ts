import { Router } from 'express'
import {
  clearAuthCookie,
  setAuthCookie,
  signToken,
  verifyToken,
  COOKIE_NAME,
} from '../auth.js'

export const authRouter = Router()

authRouter.post('/login', (req, res) => {
  const { password } = req.body
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminPassword) {
    res.status(500).json({ error: 'ADMIN_PASSWORD não configurada' })
    return
  }

  if (password !== adminPassword) {
    res.status(401).json({ error: 'Senha incorreta' })
    return
  }

  const token = signToken()
  setAuthCookie(res, token)
  res.json({ ok: true })
})

authRouter.post('/logout', (_req, res) => {
  clearAuthCookie(res)
  res.json({ ok: true })
})

authRouter.get('/me', (req, res) => {
  const token = req.cookies?.[COOKIE_NAME]
  if (!token || !verifyToken(token)) {
    res.status(401).json({ error: 'Não autenticado' })
    return
  }
  res.json({ authenticated: true })
})
