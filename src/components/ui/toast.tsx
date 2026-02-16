"use client";

import * as React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { cn } from "@/lib/utils";

const toastVariants = {
  success: "border-success/20 bg-success/5 text-success",
  error: "border-error/20 bg-error/5 text-error",
  info: "border-mountain/20 bg-mountain/5 text-mountain",
  warning: "border-accent/20 bg-accent/5 text-accent-700",
};

interface Toast {
  id: string;
  message: string;
  variant?: keyof typeof toastVariants;
  duration?: number;
}

const ToastContext = React.createContext<{
  addToast: (toast: Omit<Toast, "id">) => void;
}>({ addToast: () => {} });

export function useToast() {
  return React.useContext(ToastContext);
}

export function toast(message: string, variant?: keyof typeof toastVariants) {
  // This is a simplified approach - for production, use a global event emitter
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("toast", { detail: { message, variant } })
    );
  }
}

export function Toaster() {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  React.useEffect(() => {
    function handleToast(e: Event) {
      const { message, variant } = (e as CustomEvent).detail;
      const id = Math.random().toString(36).slice(2);
      setToasts((prev) => [...prev, { id, message, variant }]);
    }
    window.addEventListener("toast", handleToast);
    return () => window.removeEventListener("toast", handleToast);
  }, []);

  function removeToast(id: string) {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <ToastPrimitive.Provider swipeDirection="right">
      {toasts.map((t) => (
        <ToastPrimitive.Root
          key={t.id}
          duration={t.duration ?? 5000}
          onOpenChange={(open) => {
            if (!open) removeToast(t.id);
          }}
          className={cn(
            "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-4 shadow-md transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-80 data-[state=open]:slide-in-from-top-full motion-reduce:data-[state=open]:animate-none motion-reduce:data-[state=closed]:animate-none",
            toastVariants[t.variant ?? "info"]
          )}
        >
          <div className="text-sm font-medium">{t.message}</div>
          <ToastPrimitive.Close className="rounded-sm opacity-70 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </ToastPrimitive.Close>
        </ToastPrimitive.Root>
      ))}
      <ToastPrimitive.Viewport className="fixed top-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:max-w-[420px]" />
    </ToastPrimitive.Provider>
  );
}
