'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Github, ExternalLink, Play } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProjectProps {
    project: {
        id: string
        title: string
        subtitle: string
        description: string
        tech: string[]
        metrics?: string[]
        github?: string
        demo?: string
        video?: string
        image?: string
    }
    index: number
    featured?: boolean
    className?: string
}

export default function ProjectCard({ project, index, featured = false, className }: ProjectProps) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isHovered, setIsHovered] = useState(false)

    const handleMouseEnter = () => {
        setIsHovered(true)
        if (videoRef.current) {
            videoRef.current.play().catch(() => { }) // Ignore autoplay errors
        }
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
        if (videoRef.current) {
            videoRef.current.pause()
            videoRef.current.currentTime = 0
        }
    }

    return (
        <motion.div
            className={cn(
                "group relative rounded-3xl overflow-hidden bg-[#020617] border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.1)]",
                className
            )}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Background Media */}
            <div className="absolute inset-0 z-0 bg-slate-900">
                {project.image && !project.video ? (
                    <div
                        className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                        style={{ backgroundImage: `url(${project.image})` }}
                    />
                ) : (
                    <>
                        {/* Fallback/Poster */}
                        <div
                            className={cn(
                                "absolute inset-0 bg-cover bg-center transition-opacity duration-500",
                                isHovered && project.video ? "opacity-0" : "opacity-100"
                            )}
                            style={{ backgroundImage: `url(${project.image || '/assets/projects/placeholder.jpg'})` }}
                        />
                        {project.video && (
                            <video
                                ref={videoRef}
                                src={project.video}
                                muted
                                loop
                                playsInline
                                className="w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            />
                        )}
                    </>
                )}

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/80 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-95" />
            </div>

            {/* Content */}
            <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                <div className="transform transition-transform duration-500 group-hover:-translate-y-4">

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 translate-y-4 group-hover:translate-y-0">
                        {project.tech.slice(0, 4).map(t => (
                            <span key={t} className="text-xs font-mono px-2 py-1 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                                {t}
                            </span>
                        ))}
                    </div>

                    <h3 className="text-3xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-blue-400 font-medium mb-4">{project.subtitle}</p>

                    <p className="text-slate-400 line-clamp-3 mb-6 group-hover:text-slate-300 transition-colors">
                        {project.description}
                    </p>

                    {/* Metrics */}
                    {project.metrics && (
                        <div className="grid grid-cols-2 gap-4 mb-6 pt-4 border-t border-white/10">
                            {project.metrics.slice(0, featured ? 4 : 2).map((m, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                    <span className="text-xs text-slate-300 font-mono">{m}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noreferrer"
                                className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-md"
                            >
                                <Github size={20} />
                            </a>
                        )}
                        {project.demo && (
                            <a
                                href={project.demo}
                                target="_blank"
                                rel="noreferrer"
                                className="p-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white transition-colors backdrop-blur-md"
                            >
                                <ExternalLink size={20} />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
