import { cn } from "@/lib/utils";
import { Container } from "./container";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  bg?: "cream" | "white" | "dark" | "image";
  id?: string;
  fullBleed?: boolean;
  backgroundImage?: string;
  narrow?: boolean;
}

const bgVariants = {
  cream: "bg-background",
  white: "bg-surface",
  dark: "bg-dark text-white",
  image: "relative overflow-hidden",
} as const;

export function Section({
  children,
  className,
  bg = "cream",
  id,
  fullBleed,
  backgroundImage,
  narrow,
}: SectionProps) {
  const content = fullBleed ? (
    children
  ) : (
    <Container narrow={narrow}>{children}</Container>
  );

  if (bg === "image") {
    return (
      <section
        id={id}
        className={cn(
          "relative overflow-hidden py-16 md:py-24 lg:py-32",
          className,
        )}
      >
        {backgroundImage && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          >
            <div className="absolute inset-0 bg-black/60" />
          </div>
        )}
        <div className="relative z-10 text-white">{content}</div>
      </section>
    );
  }

  return (
    <section
      id={id}
      className={cn(
        "py-16 md:py-24 lg:py-32",
        bgVariants[bg],
        className,
      )}
    >
      {content}
    </section>
  );
}
