"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatPanel } from "./ChatPanel";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

export function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    const next = !isOpen;
    setIsOpen(next);
    if (next) trackEvent("chat_opened");
  }

  return (
    <>
      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-4 z-50 w-[380px] max-w-[calc(100vw-2rem)] sm:right-6"
          >
            <ChatPanel onClose={() => setIsOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating bubble */}
      <motion.button
        onClick={toggle}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "fixed bottom-6 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-colors sm:right-6",
          isOpen ? "bg-foreground text-background" : "bg-accent text-white hover:bg-accent-600"
        )}
        aria-label={isOpen ? "Close chat" : "Chat with us"}
      >
        {isOpen ? (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </motion.button>
    </>
  );
}
