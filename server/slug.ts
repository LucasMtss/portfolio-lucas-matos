export function slugify(text: string) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 120)
}

export async function uniqueSlug(
  base: string,
  exists: (slug: string, excludeId?: number) => Promise<boolean>,
  excludeId?: number,
) {
  let slug = slugify(base) || 'post'
  let suffix = 0
  while (await exists(suffix === 0 ? slug : `${slug}-${suffix}`, excludeId)) {
    suffix += 1
  }
  return suffix === 0 ? slug : `${slug}-${suffix}`
}
