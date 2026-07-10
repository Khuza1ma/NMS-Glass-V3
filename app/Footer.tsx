import React from "react";
import Link from "next/link";
import { FiMail, FiPhone, FiMapPin, FiClock } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 border-t border-white/5 text-neutral-400 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Panel */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-4 group">
              <span className="h-10 w-10 rounded-lg bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-md shadow-sky-500/20">
                N
              </span>
              <div className="flex flex-col">
                <span className="text-white font-extrabold text-xl tracking-wider leading-none">NMS</span>
                <span className="text-neutral-400 text-xs tracking-widest mt-0.5">PREMIUM QUALITY</span>
              </div>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-sm mb-6">
              NMS specializes in high-quality architectural Aluminum work, durable Fiber doors & custom kitchens, and advanced Mosquito Net screens. Engineered for structural excellence and luxury style.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/#categories" className="hover:text-white transition-colors">Products</Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-white transition-colors">Inquiry Form</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">Contact Info</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <FiMapPin className="text-sky-400 mt-1 flex-shrink-0" />
                <span>NMS Corporate Hub, Main Road, Gujarat, India</span>
              </li>
              <li className="flex items-center gap-2">
                <FiPhone className="text-sky-400 flex-shrink-0" />
                <a href="tel:+919999999999" className="hover:text-white transition-colors">+91 99999 99999</a>
              </li>
              <li className="flex items-center gap-2">
                <FiMail className="text-sky-400 flex-shrink-0" />
                <a href="mailto:info@nms.com" className="hover:text-white transition-colors">info@nms.com</a>
              </li>
              <li className="flex items-center gap-2">
                <FiClock className="text-sky-400 flex-shrink-0" />
                <span>Mon - Sat: 9:00 AM - 7:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom banner */}
        <div className="pt-8 border-t border-white/5 text-center text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} NMS (Premium Quality Glass, Aluminum & Fiber). All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
