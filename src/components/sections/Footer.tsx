"use client";

import { motion } from "framer-motion";
import {
  ArrowUp,
  Github,
  Linkedin,
  Instagram,
  Mail,
  Heart,
} from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#020617] pt-24 pb-12 border-t border-white/5 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50 blur-sm" />

      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1 space-y-4">
            <h2 className="text-2xl font-bold text-white tracking-widest">
              ESHWAR S
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Building scalable systems that blur the line between code and art.
            </p>
            <div className="flex gap-4 pt-2">
              {/* Mini Socials */}
              {[Github, Linkedin, Instagram].map((Icon, i) => (
                <div
                  key={i}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  <Icon size={18} />
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-white font-semibold mb-6">Explore</h3>
            <ul className="space-y-3 text-slate-400 text-sm">
              {["About", "Projects", "Experience", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="hover:text-cyan-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-1">
            <h3 className="text-white font-semibold mb-6">Connect</h3>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li>
                <a
                  href="mailto:eshwars.dev@gmail.com"
                  className="hover:text-cyan-400 transition-colors flex items-center gap-2"
                >
                  <Mail size={15} /> eshwar0211@gmail.com
                </a>
              </li>
              <li>Chennai, India 🇮🇳</li>
            </ul>
          </div>

          {/* Newsletter / Action */}
          <div className="md:col-span-1">
            <h3 className="text-white font-semibold mb-6">Stay Updated</h3>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter email"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors placeholder:text-slate-600"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-cyan-500/20 hover:bg-cyan-500/40 rounded text-cyan-400 transition-colors">
                <ArrowUp className="rotate-90" size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} Eshwar S. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 hover:border-cyan-500/30 transition-all group"
            >
              <ArrowUp
                size={16}
                className="text-slate-400 group-hover:text-cyan-400"
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
