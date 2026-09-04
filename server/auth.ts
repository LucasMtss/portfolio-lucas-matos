import jwt from 'jsonwebtoken'
import type { Request, Response, NextFunction } from 'express'

const COOKIE_NAME = 'blog_session'

export function getJwtSecret() {
  const secret = process.env.JWT_SECRET
  if (!secret) throw new Error('JWT_SECRET não definida')
  return secret
}

export function signToken() {
  return jwt.sign({ role: 'admin' }, getJwtSecret(), { expiresIn: '7d' })
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, getJwtSecret()) as { role: string }
  } catch {
    return null
  }
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.[COOKIE_NAME]
  if (!token || !verifyToken(token)) {
    res.status(401).json({ error: 'Não autorizado' })
    return
  }
  next()
}

export function setAuthCookie(res: Response, token: string) {
  const isSecure =
    process.env.NODE_ENV === 'production' || Boolean(process.env.VERCEL)
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: isSecure,
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/',
  })
}

export function clearAuthCookie(res: Response) {
  res.clearCookie(COOKIE_NAME, { path: '/' })
}

export { COOKIE_NAME }
