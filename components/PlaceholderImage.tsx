import Image from 'next/image'

type PlaceholderImageProps = {
  label: string
  alt: string
  priority?: boolean
}

export function PlaceholderImage({ label, alt, priority = false }: PlaceholderImageProps) {
  const src = `/api/placeholder?label=${encodeURIComponent(label)}`

  return (
    <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm">
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={675}
        className="h-auto w-full"
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
      />
      <figcaption className="border-t border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
        Placeholder image slot: {label}
      </figcaption>
    </figure>
  )
}
