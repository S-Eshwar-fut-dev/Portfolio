'use client'

import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
// 'use client' is already at the top, but I'm replacing the whole file content mostly. 
// Actually I'm replacing lines 5-50.
import { skillsCategories } from '@/lib/constants'
import { cn } from '@/lib/utils'

export default function Skills() {
    return (
        <section id="skills" className="relative py-32 min-h-screen flex flex-col items-center justify-center overflow-hidden">

            {/* Header */}
            <div className="container mx-auto px-6 text-center z-10 mb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                        Technical Arsenal
                    </h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        A comprehensive toolkit for architecting scalable, high-performance digital ecosystems.
                    </p>
                </motion.div>
            </div>

            {/* Grid */}
            <div className="container mx-auto px-6 z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {skillsCategories.map((category, index) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true, margin: "-50px" }}
                            className="group relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative h-full p-6 md:p-8 rounded-2xl bg-[#020617]/80 border border-white/5 backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] flex flex-col">
                                <h3 className="text-2xl font-bold text-white mb-6 pb-4 border-b border-white/5 group-hover:border-cyan-500/30 transition-colors">
                                    {category.title}
                                </h3>

                                <div className="flex flex-wrap gap-3">
                                    {category.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-3 py-1.5 text-sm font-medium rounded-lg bg-white/5 text-slate-300 border border-white/5 group-hover:border-white/10 group-hover:bg-white/10 transition-all hover:text-cyan-300 hover:border-cyan-500/30 cursor-default"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

        </section>
    )
}
