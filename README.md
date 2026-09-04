# Portfólio — Lucas Matos

Portfólio mobile-first com animações, vitrine de projetos (GitHub/Vercel) e **blog integrado ao Neon PostgreSQL**.

## Começar

```bash
npm install
cp .env.example .env   # configure DATABASE_URL, ADMIN_PASSWORD e JWT_SECRET
npm run db:migrate
npm run dev
```

- **Site:** http://localhost:5173  
- **API:** http://localhost:3001  
- **Blog:** http://localhost:5173/blog  
- **Admin:** http://localhost:5173/admin/login  

## Blog

### Público
- `/blog` — listagem de posts publicados
- `/blog/:slug` — post individual (Markdown, imagens, data)

### Admin (área logada)
- `/admin/login` — login com `ADMIN_PASSWORD`
- `/admin` — painel com todos os posts
- `/admin/posts/new` — criar post
- `/admin/posts/:id/edit` — editar post

Cada post suporta:
- **Título** e slug automático
- **Conteúdo** em Markdown (negrito, listas, links, `![img](url)`)
- **Resumo** para a listagem
- **Imagem de capa** (URL)
- **Galeria** (URLs, uma por linha)
- **Publicar** ou salvar como rascunho

## Variáveis de ambiente (`.env`)

| Variável | Descrição |
|----------|-----------|
| `DATABASE_URL` | Connection string do Neon PostgreSQL |
| `ADMIN_PASSWORD` | Senha do painel `/admin` |
| `JWT_SECRET` | Chave secreta para sessão JWT |
| `PORT` | Porta da API (padrão: 3001) |

> **Importante:** nunca commite o `.env`. Rotacione a senha do banco se ela foi exposta.

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Frontend + API em paralelo |
| `npm run build` | Build do frontend |
| `npm run start` | API + serve `dist` (produção) |
| `npm run db:migrate` | Cria tabela `blog_posts` no Neon |

## Deploy

1. Configure as variáveis no host (Vercel, Railway, etc.)
2. `npm run build && npm run start`
3. Ou use um serviço que rode o Express em produção apontando para o Neon

## Stack

- Vite + React + TypeScript + Tailwind + Framer Motion
- Express + Neon (`@neondatabase/serverless`)
- React Router, Markdown (`marked` + DOMPurify)
