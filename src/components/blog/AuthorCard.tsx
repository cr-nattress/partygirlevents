import Image from "next/image";
import Link from "next/link";
import { blogAuthor } from "@/lib/blog";

export function AuthorCard() {
  return (
    <div className="flex items-start gap-4 rounded-lg border border-foreground/10 bg-surface p-6">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-accent-100">
        <Image
          src={blogAuthor.avatar}
          alt={blogAuthor.name}
          fill
          className="object-cover"
          sizes="64px"
        />
      </div>
      <div>
        <p className="font-serif text-lg font-semibold">{blogAuthor.name}</p>
        <p className="text-sm text-muted">{blogAuthor.title}</p>
        <p className="mt-2 text-sm text-muted">{blogAuthor.bio}</p>
        <Link href="/about" className="mt-2 inline-block text-sm font-medium text-accent hover:text-accent-600">
          Learn more →
        </Link>
      </div>
    </div>
  );
}
