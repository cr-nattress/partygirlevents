export function PullQuote({ quote, citation }: { quote: string; citation?: string }) {
  return (
    <blockquote className="my-10 border-l-4 border-accent pl-6 py-2">
      <p className="font-serif text-xl italic leading-relaxed text-foreground">{quote}</p>
      {citation && (
        <footer className="mt-3 text-sm text-muted">— {citation}</footer>
      )}
    </blockquote>
  );
}
