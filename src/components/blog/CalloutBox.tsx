import { cn } from "@/lib/utils";

const variants = {
  tip: { bg: "bg-secondary-50", border: "border-secondary-300", icon: "💡", label: "Tip" },
  warning: { bg: "bg-accent-50", border: "border-accent-300", icon: "⚠️", label: "Note" },
  note: { bg: "bg-surface", border: "border-foreground/20", icon: "📝", label: "Note" },
};

export function CalloutBox({ variant = "tip", children }: { variant?: keyof typeof variants; children: React.ReactNode }) {
  const v = variants[variant];
  return (
    <div className={cn("my-8 rounded-lg border p-5", v.bg, v.border)}>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">{v.icon} {v.label}</p>
      <div className="text-sm text-foreground [&>p]:mt-2 [&>p:first-child]:mt-0">{children}</div>
    </div>
  );
}
