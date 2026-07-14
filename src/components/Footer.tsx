"use client";

import React from "react";
import Link from "next/link";
import { FALLBACK_SETTINGS } from "@/lib/supabase";
import { SiteSettings } from "@/lib/types";
import { FiMail, FiPhone, FiMapPin, FiClock } from "react-icons/fi";
import { FaLinkedin, FaInstagram, FaPhoneAlt } from "react-icons/fa";

interface FooterProps {
  settings?: SiteSettings;
}

export default function Footer({ settings = FALLBACK_SETTINGS }: FooterProps) {
  const cleanPhone = settings.phone.replace(/\s+/g, "");

  return (
    <footer className="bg-neutral-950 border-t border-white/5 text-neutral-400 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Panel */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-3 group">
              <span className="h-10 w-10 rounded-lg bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-md shadow-sky-500/20">
                {settings.logo_text.charAt(0)}
              </span>
              <div className="flex flex-col">
                <span className="text-white font-extrabold text-xl tracking-wider leading-none">
                  {settings.logo_text}
                </span>
                <span className="text-neutral-400 text-xs tracking-widest mt-0.5">
                  {settings.logo_subtext}
                </span>
              </div>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-sm">
              {settings.site_subtitle}
            </p>
            {/* Social media connections */}
            <div className="pt-2">
              <h4 className="text-white font-bold text-xs tracking-wider uppercase mb-3">
                Connect with Us
              </h4>
              <div className="flex items-center space-x-4">
                {settings.justdial_url && (
                  <a
                    href={settings.justdial_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-neutral-900 border border-white/5 p-2.5 rounded-lg text-neutral-400 hover:text-sky-400 hover:border-sky-400/20 transition-all text-xs font-semibold flex items-center gap-1.5"
                    title="Just Dial"
                  >
                    <FaPhoneAlt className="text-xs" />
                    <span>Just Dial</span>
                  </a>
                )}
                {settings.linkedin_url && (
                  <a
                    href={settings.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-neutral-900 border border-white/5 p-2.5 rounded-lg text-neutral-400 hover:text-sky-400 hover:border-sky-400/20 transition-all"
                    title="LinkedIn"
                  >
                    <FaLinkedin className="text-lg" />
                  </a>
                )}
                {settings.instagram_url && (
                  <a
                    href={settings.instagram_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-neutral-900 border border-white/5 p-2.5 rounded-lg text-neutral-400 hover:text-pink-500 hover:border-pink-500/20 transition-all"
                    title="Instagram"
                  >
                    <FaInstagram className="text-lg" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#categories" className="hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-white transition-colors">
                  Inquiry Form
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">
              Contact Info
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <FiMapPin className="text-sky-400 mt-1 flex-shrink-0" />
                <a
                  href={settings.google_maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {settings.address}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <FiPhone className="text-sky-400 flex-shrink-0" />
                <a href={`tel:${cleanPhone}`} className="hover:text-white transition-colors">
                  {settings.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <FiMail className="text-sky-400 flex-shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-white transition-colors">
                  {settings.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <FiClock className="text-sky-400 flex-shrink-0" />
                <span>Mon - Sat: 9:00 AM - 7:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom banner */}
        <div className="pt-8 border-t border-white/5 text-center text-xs text-neutral-500">
          <p>
            Copyright © {new Date().getFullYear()} | {settings.logo_text} Glass & Aluminium. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
