"use client";

export function PreviewBanner() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[100] bg-accent px-4 py-2 text-center text-sm font-medium text-white">
      Preview Mode —{" "}
      <a href="/api/exit-preview" className="underline">
        Exit Preview
      </a>
    </div>
  );
}
