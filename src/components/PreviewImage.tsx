import { useState } from 'react'

type PreviewImageProps = {
  sources: string[]
  alt: string
  className?: string
  fallbackLabel: string
}

export function PreviewImage({
  sources,
  alt,
  className,
  fallbackLabel,
}: PreviewImageProps) {
  const [index, setIndex] = useState(0)
  const src = sources[index]
  const exhausted = !src

  if (exhausted) {
    return (
      <div
        className="flex h-full w-full items-center justify-center bg-gradient-to-br from-ink via-zinc-800 to-accent-deep px-6"
        role="img"
        aria-label={alt}
      >
        <p className="font-heading text-center text-lg font-semibold leading-tight text-white/90">
          {fallbackLabel}
        </p>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setIndex((i) => i + 1)}
      className={className}
    />
  )
}
