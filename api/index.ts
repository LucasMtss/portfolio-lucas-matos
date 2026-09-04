import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createApp } from '../server/app.js'
import type { Express } from 'express'

let app: Express | undefined

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!app) {
    app = await createApp()
  }
  return app(req, res)
}
