"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTheme, Theme } from "./ThemeProvider";
import { FiSun, FiMoon, FiMonitor } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const options: { value: Theme; label: string; icon: React.ReactNode }[] = [
    { value: "light", label: "Light", icon: <FiSun className="text-amber-500 text-sm" /> },
    { value: "dark", label: "Dark", icon: <FiMoon className="text-sky-400 text-sm" /> },
    { value: "system", label: "System", icon: <FiMonitor className="text-slate-400 text-sm" /> },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-xl bg-slate-200/60 dark:bg-neutral-800/80 border border-slate-300/80 dark:border-white/10 text-slate-700 dark:text-neutral-200 hover:text-slate-900 dark:hover:text-white transition-all focus:outline-none flex items-center justify-center shadow-xs"
        aria-label="Toggle Theme"
        title={`Current theme: ${theme} (${resolvedTheme})`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {resolvedTheme === "dark" ? (
            <motion.div
              key="moon"
              initial={{ scale: 0.5, rotate: -90, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.5, rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FiMoon className="h-5 w-5 text-sky-400" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ scale: 0.5, rotate: 90, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.5, rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FiSun className="h-5 w-5 text-amber-500" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Theme Dropdown Selector */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-36 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-white/10 shadow-xl p-1.5 z-50 backdrop-blur-xl"
          >
            {options.map((option) => {
              const isSelected = theme === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => {
                    setTheme(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                    isSelected
                      ? "bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 font-semibold"
                      : "text-slate-700 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-neutral-800"
                  }`}
                >
                  {option.icon}
                  <span>{option.label}</span>
                  {isSelected && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-sky-500" />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
