import Image from "next/image";

export function BlogImage({ src, alt, caption, priority = false }: { src: string; alt: string; caption?: string; priority?: boolean }) {
  return (
    <figure className="my-8">
      <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 720px"
          priority={priority}
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-xs text-muted">{caption}</figcaption>
      )}
    </figure>
  );
}
