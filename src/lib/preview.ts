/** Screenshot público do site (WordPress mShots). */
export function siteScreenshot(url: string) {
  return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=1280`
}

export function githubOgImage(ownerRepo: string) {
  return `https://opengraph.githubassets.com/1/${ownerRepo}`
}

export function githubOgFromUrl(githubUrl?: string) {
  if (!githubUrl) return null
  const match = githubUrl.match(/github\.com\/([^/]+\/[^/]+)/)
  return match ? githubOgImage(match[1]) : null
}

export function previewSources(options: {
  image?: string | null
  liveUrl?: string | null
  githubUrl?: string | null
}) {
  const sources: string[] = []
  const add = (url?: string | null) => {
    if (url && !sources.includes(url)) sources.push(url)
  }

  if (options.liveUrl) add(siteScreenshot(options.liveUrl))
  add(options.image)
  add(githubOgFromUrl(options.githubUrl ?? undefined))

  return sources
}
