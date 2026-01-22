"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavigationOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export default function NavigationOverlay({
  isOpen,
  onClose,
}: NavigationOverlayProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-100 md:w-[600px] bg-[rgba(0,10,30,0.6)] border-l border-cyan-500/20 backdrop-blur-[30px] p-12 flex flex-col justify-start rounded-l-3xl shadow-2xl backdrop-saturate-150"
          >
            {/* Header */}
            <div className="flex justify-end items-center mb-12">
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 transition-colors group"
              >
                <X className="w-8 h-8 text-slate-400 group-hover:text-white transition-colors" />
              </button>
            </div>

            {/* Links */}
            <nav className="flex flex-col gap-6 items-end">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="text-2xl md:text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-cyan-200 hover:to-cyan-400 transition-all duration-300 flex items-center group relative"
                  >
                    <span className="absolute -right-8 text-2xl text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      ●
                    </span>
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
