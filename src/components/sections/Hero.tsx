"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { ArrowDown } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Hero() {
  const scrollToProjects = () => {
    const projects = document.getElementById("projects");
    if (projects) projects.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      <div className="container mx-auto px-6 max-w-7xl relative z-10 flex flex-col items-center text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <span className="px-4 py-2 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-sm font-medium backdrop-blur-md animate-pulse">
            ● Open to Opportunities
          </span>
        </motion.div>

        {/* Profile & Name Container */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-6xl md:text-8xl font-black md:leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] via-[#818cf8] to-[#f472b6] drop-shadow-[0_0_10px_rgba(167,139,250,0.5)]"
          >
            ESHWAR S
          </motion.h1>
        </div>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-xl md:text-3xl mb-8 font-light h-10 font-mono"
        >
          <div className="text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] via-[#818cf8] to-[#f472b6] drop-shadow-[0_0_5px_rgba(167,139,250,0.5)]">
            <TypeAnimation
              sequence={[
                "Full Stack Developer",
                2000,
                "Knight @LeetCode",
                2000,
                "AI/ML Enthusiast",
                2000,
                "Devops Developer",
                2000,
                "Microservices",
                2000,
                "High Parallel Computing",
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className=""
            />
          </div>
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="max-w-2xl text-[#1a0b2e] text-lg md:text-xl mb-12 leading-relaxed font-medium"
        >
          Building scalable systems that blur the line between code and art.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col md:flex-row gap-6 items-center"
        >
          <MagneticButton
            onClick={scrollToProjects}
            className="bg-[#1a0b2e] hover:bg-[#312e81] text-white border border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300"
          >
            View My Work
          </MagneticButton>

          <MagneticButton
            className="bg-[#1a0b2e] border border-cyan-500/30 hover:bg-[#312e81] text-white shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all duration-300"
            onClick={() =>
              window.open("/assets/resume/Eshwar_S_Resume.pdf", "_blank")
            }
          >
            Connect with me
          </MagneticButton>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ duration: 2, delay: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500 flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest">
            Scroll to explore
          </span>
          <ArrowDown size={16} />
        </motion.div>
      </div>
    </section>
  );
}
