import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingCta } from "@/components/layout/floating-cta";
import { CookieConsent } from "@/components/layout/cookie-consent";
import { ExitIntentModal } from "@/components/layout/exit-intent-modal";
import { ChatBubble } from "@/components/chat";

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
      <ChatBubble />
      <CookieConsent />
      <ExitIntentModal />
    </>
  );
}
