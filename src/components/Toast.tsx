"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from "react-icons/fi";

export type ToastType = "success" | "error" | "info";

export interface ToastMessage {
  id?: string;
  type: ToastType;
  title?: string;
  message: string;
}

interface ToastProps {
  toast: ToastMessage | null;
  onClose: () => void;
  duration?: number;
}

export default function Toast({ toast, onClose, duration = 6000 }: ToastProps) {
  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [toast, onClose, duration]);

  if (!toast) return null;

  const isSuccess = toast.type === "success";
  const isError = toast.type === "error";

  return (
    <div className="fixed bottom-6 right-4 sm:right-6 z-50 max-w-md w-full px-4 pointer-events-none">
      <AnimatePresence>
        <motion.div
          key={toast.id || toast.message}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`pointer-events-auto rounded-2xl p-4 shadow-2xl border backdrop-blur-xl flex items-start gap-3.5 ${
            isSuccess
              ? "bg-emerald-950/90 border-emerald-500/30 text-emerald-100 shadow-emerald-950/50"
              : isError
              ? "bg-rose-950/90 border-rose-500/30 text-rose-100 shadow-rose-950/50"
              : "bg-neutral-900/90 border-sky-500/30 text-neutral-100 shadow-sky-950/50"
          }`}
          role="alert"
        >
          <div className="pt-0.5 shrink-0">
            {isSuccess && <FiCheckCircle className="text-xl text-emerald-400" />}
            {isError && <FiAlertCircle className="text-xl text-rose-400" />}
            {!isSuccess && !isError && <FiInfo className="text-xl text-sky-400" />}
          </div>

          <div className="flex-1 space-y-1 pr-2">
            <h4
              className={`text-xs font-bold uppercase tracking-wider ${
                isSuccess
                  ? "text-emerald-400"
                  : isError
                  ? "text-rose-400"
                  : "text-sky-400"
              }`}
            >
              {toast.title || (isSuccess ? "Success" : isError ? "Error" : "Notification")}
            </h4>
            <p className="text-xs leading-relaxed font-medium break-words">
              {toast.message}
            </p>
          </div>

          <button
            onClick={onClose}
            className="shrink-0 p-1 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
            aria-label="Close notification"
          >
            <FiX className="text-base" />
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
