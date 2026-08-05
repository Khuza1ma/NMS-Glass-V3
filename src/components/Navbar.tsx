"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FALLBACK_SETTINGS } from "@/lib/supabase";
import { SiteSettings } from "@/lib/types";
import { FiMenu, FiX, FiPhone, FiMessageCircle } from "react-icons/fi";

interface NavbarProps {
  settings?: SiteSettings;
}

export default function Navbar({ settings = FALLBACK_SETTINGS }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const cleanPhone = settings.phone.replace(/\s+/g, "");

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-neutral-900/80 backdrop-blur-md border-b border-white/10 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-3 group">
              <span className="h-10 w-10 rounded-lg bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform duration-300">
                {settings.logo_text.charAt(0)}
              </span>
              <div className="flex flex-col">
                <span className="text-white font-extrabold text-xl tracking-wider leading-none">
                  {settings.logo_text}
                </span>
                <span className="text-neutral-400 text-[10px] sm:text-xs tracking-wider sm:tracking-widest mt-0.5 truncate max-w-[170px] sm:max-w-none">
                  {settings.logo_subtext}
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-neutral-300 hover:text-white transition-colors text-sm font-medium"
            >
              Home
            </Link>
            <Link
              href="/#categories"
              className="text-neutral-300 hover:text-white transition-colors text-sm font-medium"
            >
              Products
            </Link>
            <Link
              href="/#contact"
              className="text-neutral-300 hover:text-white transition-colors text-sm font-medium"
            >
              Contact
            </Link>
            <a
              href={`tel:${cleanPhone}`}
              className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-white/5"
            >
              <FiPhone className="text-sky-400" />
              <span>Call Us</span>
            </a>
            <a
              href={`https://wa.me/${cleanPhone.replace("+", "")}?text=Hi%20NMS,%20I%27d%20like%20to%20inquire%20about%20your%20products.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:opacity-90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-opacity shadow-md shadow-emerald-500/10"
            >
              <FiMessageCircle className="text-lg" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800 focus:outline-none transition-colors"
            >
              {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-neutral-900 border-b border-white/10 px-4 pt-2 pb-6 space-y-4">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="block text-neutral-300 hover:text-white transition-colors text-base font-medium"
          >
            Home
          </Link>
          <Link
            href="/#categories"
            onClick={() => setIsOpen(false)}
            className="block text-neutral-300 hover:text-white transition-colors text-base font-medium"
          >
            Products
          </Link>
          <Link
            href="/#contact"
            onClick={() => setIsOpen(false)}
            className="block text-neutral-300 hover:text-white transition-colors text-base font-medium"
          >
            Contact
          </Link>
          <div className="pt-2 flex flex-col gap-3">
            <a
              href={`tel:${cleanPhone}`}
              className="flex items-center justify-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors border border-white/5"
            >
              <FiPhone className="text-sky-400" />
              <span>Call Us</span>
            </a>
            <a
              href={`https://wa.me/${cleanPhone.replace("+", "")}?text=Hi%20NMS,%20I%27d%20like%20to%20inquire%20about%20your%20products.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-opacity"
            >
              <FiMessageCircle className="text-lg" />
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
