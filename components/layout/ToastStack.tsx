"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useUI } from "@/context/UIContext";

export function ToastStack() {
  const { toasts } = useUI();

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-[80] space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="pointer-events-auto bg-navy px-4 py-3 text-sm text-ivory shadow-lg"
            role="status"
          >
            {toast.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
