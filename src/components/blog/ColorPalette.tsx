"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface Swatch {
  name: string;
  hex: string;
}

export function ColorPalette({ title, swatches }: { title: string; swatches: Swatch[] }) {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  function copyHex(hex: string, idx: number) {
    navigator.clipboard.writeText(hex).then(() => {
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 1500);
    });
  }

  return (
    <div className="my-8">
      <p className="mb-3 text-sm font-medium text-foreground">{title}</p>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {swatches.map((s, i) => (
          <button
            key={i}
            onClick={() => copyHex(s.hex, i)}
            className="group flex shrink-0 flex-col items-center gap-1.5"
            title={`Copy ${s.hex}`}
          >
            <div
              className="h-16 w-16 rounded-lg shadow-sm ring-1 ring-foreground/10 transition-transform group-hover:scale-105 md:h-20 md:w-20"
              style={{ backgroundColor: s.hex }}
            />
            <span className="text-[10px] font-medium text-muted">{s.name}</span>
            <span className={cn("text-[10px]", copiedIdx === i ? "text-success font-medium" : "text-muted/60")}>
              {copiedIdx === i ? "Copied!" : s.hex}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
