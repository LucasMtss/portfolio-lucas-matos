# Portfólio — Desenvolvedor Web

Portfólio **mobile-first** com animações (Framer Motion), vitrine de projetos do **GitHub** e da **Vercel**, e design system Motion-Driven (Archivo + Space Grotesk).

## Começar

```bash
npm install
npm run dev
```

## Personalizar

1. **Dados pessoais** — edite `src/data/site.ts` (nome, e-mail, links sociais, sobre, skills).
2. **Projetos** — edite `src/data/projects.ts`:

```ts
{
  id: 'meu-app',
  title: 'Meu App',
  description: 'Resumo curto.',
  longDescription: 'Texto do modal.',
  image: '/projects/meu-app.png', // ou URL
  tags: ['React', 'TypeScript'],
  source: 'both', // 'github' | 'vercel' | 'both'
  year: '2026',
  links: {
    github: 'https://github.com/voce/repo',
    live: 'https://seu-app.vercel.app',
  },
}
```

Coloque imagens locais em `public/projects/`.

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4
- Framer Motion
- Lucide icons

## Deploy (Vercel)

```bash
npm run build
```

Conecte o repositório na Vercel — o build padrão do Vite funciona (`dist`).
