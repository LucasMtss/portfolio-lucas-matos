import 'dotenv/config'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import { createApp } from './app.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PORT = Number(process.env.PORT) || 3001

async function main() {
  const app = await createApp()
  const dist = path.join(__dirname, '..', 'dist')

  app.use(express.static(dist))
  app.get('*', (_req, res) => {
    res.sendFile(path.join(dist, 'index.html'))
  })

  app.listen(PORT, () => {
    console.log(`API rodando em http://localhost:${PORT}`)
  })
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
