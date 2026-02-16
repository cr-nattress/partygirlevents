import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingCta } from "@/components/layout/floating-cta";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <FloatingCta />
    </>
  );
}
