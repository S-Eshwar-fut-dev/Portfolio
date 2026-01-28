'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '@/lib/constants'
import ProjectCard from '@/components/ui/ProjectCard'
import Image from 'next/image'
import { X, ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react'

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

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
                    <h2 className="text-6xl md:text-8xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] via-[#818cf8] to-[#f472b6] drop-shadow-[0_0_15px_rgba(167,139,250,0.4)] tracking-tighter">Featured Work</h2>
                    <p className="text-xl text-slate-400 max-w-2xl">
                        Building products that scale and solutions that matter.
                        From AI fraud detection to distributed systems.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <div
                            key={project.id}
                            onClick={() => {
                                setSelectedProject(project)
                                setCurrentImageIndex(0)
                            }}
                            className="cursor-pointer h-full"
                        >
                            <ProjectCard
                                project={project}
                                index={index}
                                className="h-full"
                            />
                        </div>
                    ))}
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
                            <div className="relative w-full md:w-3/5 h-[300px] md:h-auto bg-[#020617] group flex items-center justify-center p-4">
                                <div className="relative w-full h-full">
                                    <Image
                                        src={selectedProject.images ? selectedProject.images[currentImageIndex] : (selectedProject.image || '')}
                                        alt={selectedProject.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 60vw"
                                        className="object-contain transition-opacity duration-500"
                                    />
                                </div>

                                {/* Carousel Controls */}
                                {selectedProject.images && selectedProject.images.length > 1 && (
                                    <>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                setCurrentImageIndex((prev) =>
                                                    prev === 0 ? selectedProject.images!.length - 1 : prev - 1
                                                )
                                            }}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-cyan-500/50 rounded-full text-white transition-all backdrop-blur-sm z-20"
                                        >
                                            <ChevronLeft size={24} />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                setCurrentImageIndex((prev) =>
                                                    prev === selectedProject.images!.length - 1 ? 0 : prev + 1
                                                )
                                            }}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-cyan-500/50 rounded-full text-white transition-all backdrop-blur-sm z-20"
                                        >
                                            <ChevronRight size={24} />
                                        </button>

                                        {/* Dots Indicator */}
                                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                                            {selectedProject.images.map((_, idx) => (
                                                <div
                                                    key={idx}
                                                    className={`w-2 h-2 rounded-full transition-colors ${idx === currentImageIndex ? 'bg-cyan-500' : 'bg-white/30'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}
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
