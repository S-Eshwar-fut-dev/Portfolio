'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Github, ExternalLink, Play } from 'lucide-react'
import { cn } from '@/lib/utils'

import { Project } from '@/types'

interface ProjectProps {
    project: Project
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
                "group relative rounded-3xl overflow-hidden bg-black border border-white/10 shadow-lg flex flex-col hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-shadow duration-500",
                className
            )}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -10 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Image Section (Top) */}
            <div className="relative w-full aspect-video bg-black/50">
                <Image
                    src={project.image || '/assets/projects/placeholder.jpg'}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
            </div>

            {/* Content Section (Bottom) */}
            <div className="relative z-10 p-6 md:p-8 bg-[#0a1628] flex flex-col justify-between flex-grow">
                <div>
                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                        {project.tech.slice(0, 4).map(t => (
                            <span key={t} className="text-[10px] md:text-xs font-mono px-2 py-1 rounded bg-white/5 text-slate-300 border border-white/10">
                                {t}
                            </span>
                        ))}
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-1 leading-tight">{project.title}</h3>
                    <p className="text-cyan-400 font-medium text-sm mb-3">{project.subtitle}</p>

                    <p className="text-slate-400 text-sm line-clamp-2 mb-4">
                        {project.shortDescription || project.description}
                    </p>
                </div>

                {/* Actions & Metrics */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                    {project.metrics && (
                        <div className="flex flex-col gap-1">
                            {project.metrics.slice(0, 2).map((m, i) => (
                                <span key={i} className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                                    <span className="w-1 h-1 rounded-full bg-green-500" />
                                    {m}
                                </span>
                            ))}
                        </div>
                    )}

                    <div className="flex gap-2">
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10"
                            >
                                <Github size={18} />
                            </a>
                        )}
                        {project.demo && (
                            <a
                                href={project.demo}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="p-2 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white transition-colors"
                            >
                                <ExternalLink size={18} />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
