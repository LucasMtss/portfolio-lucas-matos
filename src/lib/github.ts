export type GithubRepo = {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
  fork: boolean
  topics?: string[]
}

const GITHUB_USER = 'LucasMtss'
const EXCLUDED = new Set(['LucasMtss', 'Lucas_Mtss13'])

export async function fetchRecentRepos(limit = 6): Promise<GithubRepo[]> {
  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&direction=desc&per_page=30`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
      },
    },
  )

  if (!res.ok) {
    throw new Error(`GitHub API: ${res.status}`)
  }

  const repos = (await res.json()) as GithubRepo[]

  return repos
    .filter((repo) => !repo.fork && !EXCLUDED.has(repo.name))
    .slice(0, limit)
}

export function repoPreviewImage(repo: GithubRepo) {
  return `https://opengraph.githubassets.com/1/${repo.full_name}`
}

export function formatRepoDate(iso: string) {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(iso))
}
