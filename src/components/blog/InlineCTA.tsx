import Link from "next/link";

export function InlineCTA({
  heading = "Ready to start planning?",
  description = "Let's create something beautiful together. Book your free discovery call.",
  buttonText = "Get in Touch",
  href = "/contact",
}: {
  heading?: string;
  description?: string;
  buttonText?: string;
  href?: string;
}) {
  return (
    <div className="my-12 rounded-lg bg-accent-50 border border-accent-200 px-6 py-8 text-center">
      <p className="font-serif text-xl font-semibold text-foreground">{heading}</p>
      <p className="mt-2 text-sm text-muted">{description}</p>
      <Link
        href={href}
        className="mt-4 inline-flex items-center justify-center rounded-md bg-accent px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-600"
      >
        {buttonText}
      </Link>
    </div>
  );
}
