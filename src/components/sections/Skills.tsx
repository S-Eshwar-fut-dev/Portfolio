'use client'

import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { skills } from '@/lib/constants'
import { cn } from '@/lib/utils'

// 3D component removed

export default function Skills() {
    const allSkills = [...skills.inner, ...skills.middle, ...skills.outer]

    return (
        <section id="skills" className="relative min-h-screen py-32 flex flex-col items-center justify-center overflow-hidden">

            <div className="container mx-auto px-6 text-center z-10 mb-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">Tech Arsenal</h2>
                    <p className="text-xl text-slate-400">Tools I wield to build the future</p>
                </motion.div>
            </div>

            {/* Skills Grid */}
            <div className="container mx-auto px-6 z-10">
                <div className="flex flex-wrap justify-center gap-4">
                    {allSkills.map((skill, i) => (
                        <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            viewport={{ once: true }}
                            className="px-4 py-2 rounded-full bg-slate-900/80 border border-slate-700 text-slate-300 font-mono text-sm shadow-lg flex items-center gap-2 backdrop-blur-md hover:scale-105 transition-transform cursor-default"
                            style={{ borderColor: `${skill.color}40` }}
                        >
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: skill.color }} />
                            {skill.name}
                        </motion.div>
                    ))}
                </div>
            </div>

        </section>
    )
}
