'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '@/lib/constants'
import ProjectCard from '@/components/ui/ProjectCard'
import Image from 'next/image'
import { X, ExternalLink, Github } from 'lucide-react'

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)

    return (
        <section id="projects" className="relative py-32 min-h-screen">
            <div className="container mx-auto px-6 max-w-7xl">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <h2 className="text-5xl md:text-6xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] via-[#818cf8] to-[#f472b6] drop-shadow-[0_0_10px_rgba(167,139,250,0.5)]">Featured Work</h2>
                    <p className="text-xl text-slate-400 max-w-2xl">
                        Building products that scale and solutions that matter.
                        From AI fraud detection to distributed systems.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(350px,auto)]">
                    {projects.map((project, index) => {
                        // Bento Grid Logic
                        // 0: Large Left (2x2)
                        // 1: Medium Right Top (1x1)
                        // 2: Medium Right Bottom (1x1)
                        // 3: Medium Left Bottom (1x1)
                        // 4: Large Right Bottom (2x1)

                        let gridClass = ""
                        if (index === 0) gridClass = "md:col-span-2 md:row-span-2 min-h-[600px]"
                        else if (index === 4) gridClass = "md:col-span-2 min-h-[350px]"
                        else gridClass = "md:col-span-1 min-h-[350px]"

                        return (
                            <div
                                key={project.id}
                                onClick={() => setSelectedProject(project)}
                                className={`cursor-pointer ${gridClass}`}
                            >
                                <ProjectCard
                                    project={project}
                                    index={index}
                                    className="h-full"
                                />
                            </div>
                        )
                    })}
                </div>

            </div>

            {/* Cinematic Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10"
                    >
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-black/60 backdrop-blur-[20px]"
                            onClick={() => setSelectedProject(null)}
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="relative w-full max-w-5xl bg-[#0a1628]/90 border border-cyan-500/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-cyan-500 rounded-full transition-colors text-white"
                            >
                                <X size={24} />
                            </button>

                            {/* Image Section (Left/Top) */}
                            <div className="relative w-full md:w-3/5 h-[300px] md:h-auto bg-black">
                                <Image
                                    src={selectedProject.image}
                                    alt={selectedProject.title}
                                    fill
                                    className="object-cover opacity-90"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] to-transparent md:bg-gradient-to-r" />
                            </div>

                            {/* Info Section (Right/Bottom) */}
                            <div className="w-full md:w-2/5 p-8 md:p-12 flex flex-col justify-center overflow-y-auto">
                                <h3 className="text-3xl md:text-4xl font-black text-white mb-2">{selectedProject.title}</h3>
                                <p className="text-cyan-400 font-mono text-sm mb-6">{selectedProject.subtitle}</p>

                                <p className="text-slate-300 leading-relaxed mb-8">
                                    {selectedProject.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-8">
                                    {selectedProject.tech.map((tech) => (
                                        <span key={tech} className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-xs text-cyan-300">
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex gap-4 mt-auto">
                                    {selectedProject.demo && (
                                        <a
                                            href={selectedProject.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 py-3 px-6 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl flex items-center justify-center gap-2 transition-colors"
                                        >
                                            <ExternalLink size={18} />
                                            Live Demo
                                        </a>
                                    )}
                                    <a
                                        href={selectedProject.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 py-3 px-6 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors border border-white/10"
                                    >
                                        <Github size={18} />
                                        Code
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}
