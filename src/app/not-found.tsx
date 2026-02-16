import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="font-serif text-5xl font-semibold text-foreground">404</h1>
      <p className="mt-4 text-lg text-muted">
        This page doesn&apos;t exist. Let&apos;s get you back on track.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center rounded-md bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-dark"
      >
        Go Home
      </Link>
    </div>
  );
}
