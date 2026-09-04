import 'dotenv/config'
import { initDb } from './db.js'

async function migrate() {
  await initDb()
  console.log('Banco de dados inicializado com sucesso.')
}

migrate().catch((err) => {
  console.error(err)
  process.exit(1)
})
