import { cn } from "@/lib/utils";

interface ComparisonRow {
  feature: string;
  optionA: string | boolean;
  optionB: string | boolean;
}

export function ComparisonTable({
  labelA,
  labelB,
  rows
}: {
  labelA: string;
  labelB: string;
  rows: ComparisonRow[]
}) {
  function renderCell(value: string | boolean) {
    if (typeof value === "boolean") {
      return value ? (
        <svg className="mx-auto h-5 w-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
      ) : (
        <svg className="mx-auto h-5 w-5 text-muted/40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
      );
    }
    return <span className="text-sm">{value}</span>;
  }

  return (
    <div className="my-8 overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-foreground/10">
            <th className="pb-3 pr-4 text-sm font-medium text-muted">Feature</th>
            <th className="pb-3 px-4 text-center text-sm font-medium text-accent">{labelA}</th>
            <th className="pb-3 pl-4 text-center text-sm font-medium text-secondary">{labelB}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={cn("border-b border-foreground/5", i % 2 === 0 && "bg-foreground/[0.02]")}>
              <td className="py-3 pr-4 text-sm">{row.feature}</td>
              <td className="py-3 px-4 text-center">{renderCell(row.optionA)}</td>
              <td className="py-3 pl-4 text-center">{renderCell(row.optionB)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
