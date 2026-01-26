"use client";

import { motion } from "framer-motion";
import { Briefcase, Code } from "lucide-react";

const experiences = [
  {
    id: 1,
    title: "Web Development Intern",
    company: "Gaotek Inc",
    period: "June 2024 – September 2024",
    description:
      "Engineered and deployed 25+ e-commerce product modules integrated with hardware-level RFID tracking, achieving real-time synchronization and 40% reduction in stock discrepancy. Optimized distributed transaction validation logic, improving payment success rates by 65%.",
    icon: Briefcase,
    side: "left",
  },
  {
    id: 2,
    title: "Full Stack Lead (Student)",
    company: "Chennai Institute of Technology",
    period: "Nov 2024 – Feb 2025",
    description:
      "Led team of 10 to build enterprise RBAC dashboard, reducing admin processing time by 50% across 450+ requests/semester. Designed PostgreSQL architecture with 4 normalized databases and implemented RLS for department-specific data isolation.",
    icon: Code,
    side: "right",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-20 relative z-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] via-[#818cf8] to-[#f472b6] drop-shadow-[0_0_10px_rgba(167,139,250,0.5)]">
            Industry Experience
          </h2>
          <div className="h-1 w-20 bg-cyan-500 mx-auto rounded-full" />
        </motion.div>

        <div className="relative">
          {/* Central Time-Thread */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-cyan-500/0 via-cyan-500/50 to-cyan-500/0" />

          <div className="space-y-12 md:space-y-24">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: exp.side === "left" ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`flex flex-col md:flex-row items-center justify-between ${exp.side === "right" ? "md:flex-row-reverse" : ""
                  }`}
              >
                {/* Content Card */}
                <div className="w-full md:w-[48%] mb-8 md:mb-0">
                  <div className="p-8 md:p-10 rounded-3xl bg-[#020617] border border-cyan-500/30 hover:border-cyan-400/60 transition-colors shadow-[0_0_30px_rgba(6,182,212,0.1)] relative group overflow-hidden">
                    <div className="absolute inset-0 bg-cyan-500/5 group-hover:bg-cyan-500/10 transition-colors duration-500" />

                    <div className="flex items-center gap-6 mb-6">
                      <div className="p-4 rounded-xl bg-cyan-500/10 text-cyan-400">
                        <exp.icon size={32} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-1">
                          {exp.company}
                        </h3>
                        <span className="text-cyan-400/80 font-mono text-sm tracking-wider uppercase">
                          {exp.period}
                        </span>
                      </div>
                    </div>

                    <h4 className="text-xl font-bold text-slate-100 mb-4">
                      {exp.title}
                    </h4>
                    <p className="text-slate-400 leading-relaxed text-base">
                      {exp.description}
                    </p>
                  </div>
                </div>

                {/* Center Node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-cyan-500 rounded-full border-4 border-black shadow-[0_0_15px_rgba(6,182,212,1)] z-10" />

                {/* Empty Space for alignment */}
                <div className="hidden md:block w-[45%]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
