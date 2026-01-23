"use client";

import { motion } from "framer-motion";
import { Mail, MessageCircle } from "lucide-react";
import ContactForm from "@/components/ui/ContactForm";

export default function Contact() {

  return (
    <section
      id="contact"
      className="relative py-32 min-h-[60vh] flex items-center gradient-text"
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

          {/* Left Side - Connect Text & Icons */}
          <div className="flex flex-col items-center lg:items-center space-y-12 order-2 lg:order-1">
            <div className="relative group w-full flex justify-center">
              {/* Glowing Ring Effect (Kept as background/ambiance) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600 blur-[80px] opacity-20 group-hover:opacity-40 transition duration-1000" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center space-y-12"
            >
              <h3 className="text-5xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] via-[#818cf8] to-[#f472b6] drop-shadow-[0_0_25px_rgba(167,139,250,0.4)]">
                Let&apos;s Connect
              </h3>

              {/* Black Box with Icons */}
              <div className="inline-flex items-center gap-8 p-6 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl hover:border-cyan-500/30 transition-colors">
                <a
                  href="mailto:eshwar0211@gmail.com"
                  className="group relative p-4 rounded-xl bg-white/5 hover:bg-cyan-500/20 text-slate-400 hover:text-cyan-400 transition-all duration-300 hover:scale-110"
                  aria-label="Email"
                >
                  <Mail size={32} />
                  <div className="absolute inset-0 rounded-xl bg-cyan-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>

                <a
                  href="https://wa.me/7010501479" // Placeholder number
                  target="_blank"
                  rel="noreferrer"
                  className="group relative p-4 rounded-xl bg-white/5 hover:bg-green-500/20 text-slate-400 hover:text-green-400 transition-all duration-300 hover:scale-110"
                  aria-label="WhatsApp"
                >
                  <MessageCircle size={32} />
                  <div className="absolute inset-0 rounded-xl bg-green-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Form */}
          <div className="relative group w-full order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="relative"
            >
              {/* Header for Form Context */}
              <div className="mb-8 text-center lg:text-left">
                <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
                  Contact Me
                </h2>
                <p className="text-slate-400 font-medium">
                  Have a project in mind or just want to say hi? <br className="hidden md:block" />
                  Fill out the form below.
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#1e1b4b]/60 to-[#312e81]/40 backdrop-blur-md border border-cyan-500/30 rounded-3xl p-8 lg:p-12 shadow-[0_0_30px_rgba(6,182,212,0.15)] relative">
                <ContactForm />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
