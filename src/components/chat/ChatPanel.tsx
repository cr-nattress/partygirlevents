"use client";

import { useChat } from "ai/react";
import { useRef, useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

const STARTER_QUESTIONS = [
  "What services do you offer?",
  "How much does a mountain wedding cost?",
  "What venues do you recommend in Vail?",
  "Do I need a wedding planner?",
];

const LEAD_CAPTURE_THRESHOLD = 3; // Show after N assistant messages

function ChatLeadCapture({ onCaptured }: { onCaptured: () => void }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!isValid) return;
      setStatus("loading");
      try {
        await fetch("/api/tool-lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, source: "chat" }),
        });
        trackEvent("chat_email_captured", { email });
        onCaptured();
      } catch {
        setStatus("error");
      }
    },
    [email, isValid, onCaptured],
  );

  return (
    <div className="flex justify-start">
      <div className="max-w-[85%] space-y-2 rounded-2xl bg-foreground/5 px-4 py-3">
        <p className="text-sm leading-relaxed text-foreground">
          I&apos;d love to help you further! Drop your email and Stephanie
          can follow up with personalized recommendations.
        </p>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="min-w-0 flex-1 rounded-full border border-foreground/10 bg-background px-3 py-1.5 text-xs outline-none focus:border-accent"
          />
          <button
            type="submit"
            disabled={!isValid || status === "loading"}
            className="shrink-0 rounded-full bg-accent px-3 py-1.5 text-xs font-medium text-white disabled:opacity-40"
          >
            {status === "loading" ? "..." : "Send"}
          </button>
        </form>
        {status === "error" && (
          <p className="text-xs text-red-500">Failed to save. Try again?</p>
        )}
        <p className="text-[10px] text-muted/50">
          No spam — just a personal follow-up from Stephanie.
        </p>
      </div>
    </div>
  );
}

export function ChatPanel({ onClose }: { onClose: () => void }) {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: "/api/chat",
    onFinish: (message) => {
      trackEvent("chat_message_received", { role: "assistant", length: message.content.length });
    },
  });
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [emailCaptured, setEmailCaptured] = useState(false);

  const assistantCount = messages.filter((m) => m.role === "assistant").length;
  const showLeadCapture =
    !emailCaptured && assistantCount >= LEAD_CAPTURE_THRESHOLD;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, showLeadCapture]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function sendStarter(question: string) {
    trackEvent("chat_starter_clicked", { question });
    handleInputChange({ target: { value: question } } as React.ChangeEvent<HTMLInputElement>);
    // Submit after state update
    setTimeout(() => {
      const form = document.getElementById("chat-form") as HTMLFormElement;
      form?.requestSubmit();
    }, 50);
  }

  return (
    <div className="flex h-[500px] flex-col overflow-hidden rounded-2xl border border-foreground/10 bg-surface shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-foreground/10 bg-background px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
            PG
          </div>
          <div>
            <p className="text-sm font-medium">Party Girl Events</p>
            <p className="text-xs text-muted">Stephanie&apos;s AI assistant</p>
          </div>
        </div>
        <button onClick={onClose} className="rounded-full p-1 text-muted hover:bg-foreground/5" aria-label="Close chat">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <p className="font-serif text-lg font-semibold">Hi there!</p>
            <p className="mt-1 text-sm text-muted">
              I&apos;m Stephanie&apos;s AI assistant. Ask me anything about planning your Colorado mountain wedding.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              {STARTER_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendStarter(q)}
                  className="rounded-full border border-foreground/10 px-4 py-2 text-left text-sm text-muted transition-colors hover:border-accent hover:text-accent"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={cn(
                  "flex",
                  m.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                    m.role === "user"
                      ? "bg-accent text-white"
                      : "bg-foreground/5 text-foreground"
                  )}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {/* Inline lead capture — appears after enough conversation */}
            {showLeadCapture && !isLoading && (
              <ChatLeadCapture onCaptured={() => setEmailCaptured(true)} />
            )}
            {emailCaptured && assistantCount >= LEAD_CAPTURE_THRESHOLD && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl bg-green-50 px-4 py-2.5 text-sm text-green-800">
                  Thanks! Stephanie will be in touch soon.
                </div>
              </div>
            )}

            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-1 rounded-2xl bg-foreground/5 px-4 py-3">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-muted [animation-delay:-0.3s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-muted [animation-delay:-0.15s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-muted" />
                </div>
              </div>
            )}
          </div>
        )}
        {error && (
          <p className="mt-2 text-center text-xs text-error">
            Something went wrong. Please try again or <a href="/contact" className="underline">contact Stephanie directly</a>.
          </p>
        )}
      </div>

      {/* Input */}
      <form
        id="chat-form"
        onSubmit={handleSubmit}
        className="border-t border-foreground/10 px-4 py-3"
      >
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            value={input}
            onChange={handleInputChange}
            placeholder="Ask about weddings, venues, costs..."
            className="flex-1 rounded-full border border-foreground/10 bg-background px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-muted/50 focus:border-accent"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-white transition-colors hover:bg-accent-600 disabled:opacity-40"
            aria-label="Send message"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
