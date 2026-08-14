export type ProjectSource = 'github' | 'vercel' | 'both'

export type Project = {
  id: string
  title: string
  description: string
  longDescription?: string
  image: string
  tags: string[]
  source: ProjectSource
  year: string
  links: {
    github?: string
    live?: string
  }
}

/** Projetos em destaque (curadoria manual — demos Vercel + repos fortes). */
export const projects: Project[] = [
  {
    id: 'lembretes-whatsapp',
    title: 'Lembretes por WhatsApp',
    description:
      'Aplicação que cria lembretes e envia mensagens sobre eventos marcados via WhatsApp.',
    longDescription:
      'Projeto open-source em Python com 23 stars no GitHub. Automatiza o envio de lembretes por WhatsApp para eventos agendados.',
    image: 'https://opengraph.githubassets.com/1/LucasMtss/Lembretes_por_whatsapp',
    tags: ['Python', 'WhatsApp', 'Automação'],
    source: 'github',
    year: '2026',
    links: {
      github: 'https://github.com/LucasMtss/Lembretes_por_whatsapp',
    },
  },
  {
    id: 'sparta-cross',
    title: 'Sparta Cross',
    description: 'Sistema criado para a academia Sparta Cross, para gerenciar os treinos de crossfit.',
    longDescription:
      'Projeto front-end em React para site da academia Sparta Cross.',
    image: 'https://opengraph.githubassets.com/1/LucasMtss/sparta-cross',
    tags: ['React'],
    source: 'vercel',
    year: '2025',
    links: {
      live: 'https://sparta-cross.vercel.app/',
    },
  },
  {
    id: 'zupy-delivery',
    title: 'Zupy Delivery',
    description: 'Cardápio digital com pedidos pelo whatsapp.',
    longDescription:
      'Projeto front-end em TypeScript para cardápio digital com pedidos pelo whatsapp.',
    image: 'https://opengraph.githubassets.com/1/LucasMtss/zupy-delivery',
    tags: ['TypeScript', 'React', 'WhatsApp'],
    source: 'vercel',
    year: '2025',
    links: {
      live: 'https://www.zupydelivery.com.br/',
    },
  },
  {
    id: 'zupy--artesano',
    title: 'Site para a sanduicheria Artesano',
    description: 'Site para a sanduicheria Artesano.',
    longDescription:
      'Projeto front-end em React para site da sanduicheria Artesano.',
    image: 'https://opengraph.githubassets.com/1/LucasMtss/zupy-delivery',
    tags: ['React', 'WhatsApp'],
    source: 'vercel',
    year: '2025',
    links: {
      live: 'https://artesano.zupydelivery.com.br/',
    },
  },
  {
    id: 'planejador-de-viagens',
    title: 'Planejador de Viagens',
    description: 'Planejador de viagens com IA.',
    longDescription:
      'Projeto front-end em React para planejador de viagens com IA, onde o usuário pode planejar suas viagens com base em suas preferências e informações sobre o local.',
    image: 'https://opengraph.githubassets.com/1/LucasMtss/planejador-de-viagens',
    tags: ['React', 'IA'],
    source: 'vercel',
    year: '2025',
    links: {
      live: 'https://planejador-de-viagens-mu.vercel.app/',
    },
  },
  {
    id: 'fantasy-bet',
    title: 'Fantasy Bet',
    description: 'Jogo baseado em Bets e Cartola FC, com apostas fictícias, ligas entre amigos e jogos de campeonatos reais.',
    longDescription:
      'Projeto front-end em React para jogo baseado em Bets e Cartola FC, com apostas fictícias, ligas entre amigos e jogos de campeonatos reais.',
    image: 'https://opengraph.githubassets.com/1/LucasMtss/planejador-de-viagens',
    tags: ['React', 'IA'],
    source: 'vercel',
    year: '2025',
    links: {
      live: 'https://fantasy-bet-theta.vercel.app/',
    },
  },
  {
    id: 'dizipay',
    title: 'DiziPay',
    description: 'Sistema de dízimo online para igrejas.',
    longDescription:
      'Projeto front-end em React para sistema de dízimo online para igrejas.',
    image: 'https://opengraph.githubassets.com/1/LucasMtss/dizipay',
    tags: ['React', 'Node', 'PostgreSQL', 'Tailwind CSS'],
    source: 'vercel',
    year: '2026',
    links: {
      live: 'https://www.dizipay.com.br/',
    },
  },
  {
    id: 'duvidas-ecc',
    title: 'Chat IA do ECC',
    description: 'Chat IA para responder dúvidas do ECC.',
    longDescription:
      'Projeto front-end em React para chat IA para responder dúvidas do ECC.',
    image: 'https://opengraph.githubassets.com/1/LucasMtss/dizipay',
    tags: ['React', 'PostgreSQL', 'Tailwind CSS', 'IA'],
    source: 'vercel',
    year: '2026',
    links: {
      live: 'https://duvidas-ecc.vercel.app/',
    },
  },
  {
    id: 'pachelli-solucoes',
    title: 'Pachelli Soluções',
    description: 'Site para a empresa de registro de marcas e patentes Pachelli Soluções.',
    longDescription:
      'Projeto front-end em React para site da empresa de registro de marcas e patentes Pachelli Soluções.',
    image: 'https://opengraph.githubassets.com/1/LucasMtss/pachelli-solucoes',
    tags: ['React', 'Tailwind CSS'],
    source: 'vercel',
    year: '2026',
    links: {
      live: 'https://www.pachellisolucoes.com.br/',
    },
  },
  {
    id: 'fornecedor-tailandesas',
    title: 'Site de vedas de camisas tailandesas',
    description: 'Site para a venda de fornecedores de camisas tailandesas.',
    longDescription:
      'Projeto front-end em React para site da venda de fornecedores de camisas tailandesas.',
    image: 'https://opengraph.githubassets.com/1/LucasMtss/fornecedor-tailandesas',
    tags: ['React', 'Tailwind CSS'],
    source: 'vercel',
    year: '2026',
    links: {
      live: 'https://www.fornecedorviptailandesas.com.br/',
    },
  },
  {
    id: 'recurser-pay',
    title: 'Sistema de pagamentos por recorrência',
    description: 'Sistema de pagamentos por recorrência para empresas e pessoas físicas.',
    longDescription:
      'Projeto front-end em React para sistema de pagamentos por recorrência para empresas e pessoas físicas.',
    image: 'https://opengraph.githubassets.com/1/LucasMtss/recurser-pay',
    tags: ['React', 'Tailwind CSS', 'Node', 'PostgreSQL'],
    source: 'vercel',
    year: '2026',
    links: {
      live: 'https://recurser-pay.vercel.app/',
    },
  },
  {
    id: 'criador-playlists',
    title: 'Criador de playlists no Spotify',
    description: 'Criador de playlists no Spotify, onde o usuário pode criar playlists com base em suas preferências e informações sobre o local.',
    longDescription:
      'Projeto front-end em React para criador de playlists no Spotify, onde o usuário pode criar playlists com base em suas preferências e informações sobre o local.',
    image: 'https://opengraph.githubassets.com/1/LucasMtss/recurser-pay',
    tags: ['React', 'Tailwind CSS', 'Spotify API'],
    source: 'vercel',
    year: '2026',
    links: {
      live: 'https://spotify-ai-playlist-generator-delta.vercel.app/',
    },
  },
]
