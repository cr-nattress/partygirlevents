import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  narrow?: boolean;
  wide?: boolean;
}

export function Container({
  children,
  className,
  narrow,
  wide,
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 md:px-8 lg:px-16",
        narrow && "max-w-3xl",
        wide && "max-w-[1440px]",
        !narrow && !wide && "max-w-7xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
