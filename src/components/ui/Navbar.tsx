'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, Github, Linkedin, Instagram } from 'lucide-react'
import Image from 'next/image'
import NavigationOverlay from '@/components/ui/NavigationOverlay'
import { cn } from '@/lib/utils'

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [isNavOpen, setIsNavOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-40 transition-all duration-300 py-4 px-6 md:px-10 backdrop-filter backdrop-blur-[25px]",
                    scrolled ? "bg-[rgba(0,10,30,0.25)] backdrop-blur-xl border-b border-cyan-500/10" : "bg-transparent"
                )}
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    {/* Brand / Profile Identity */}
                    <div className="flex items-center gap-4">
                        <div className="relative group cursor-pointer">
                            <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.5)] group-hover:shadow-[0_0_25px_rgba(6,182,212,0.8)] transition-all duration-300 relative">
                                <Image
                                    src="/profile.png"
                                    alt="Eshwar"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="absolute inset-0 rounded-full bg-cyan-400/20 animate-pulse" />
                        </div>

                        <div className="flex flex-col">
                            <span className="text-xl font-bold tracking-wide text-white group-hover:text-cyan-400 transition-colors">
                                Eshwar S
                            </span>
                            <span className="text-[12px] uppercase-text text-cyan-500/80 font-semibold">
                                Distributed Systems Architect
                            </span>
                        </div>
                    </div>

                    {/* Quick-Connect Socials */}
                    {/* Social Icons - Grouped with name on the left */}
                    <div className="hidden md:flex items-center gap-6 mr-auto border-white/10 pl-8 h-8">
                        {[
                            { Icon: Github, href: "https://github.com/S-Eshwar-fut-dev" },
                            { Icon: Linkedin, href: "https://www.linkedin.com/in/eshwar-s-28a944290/" },
                            { Icon: Instagram, href: "https://www.instagram.com/eshwarshanmuga/" }
                        ].map(({ Icon, href }, i) => (
                            <a
                                key={i}
                                href={href}
                                target="_blank"
                                rel="noreferrer"
                                className=" hover:text-cyan-400 transition-all hover:scale-110"
                            >
                                <Icon size={20} strokeWidth={2} />
                            </a>
                        ))}
                    </div>

                    {/* Hamburger Menu Trigger */}
                    <button
                        onClick={() => setIsNavOpen(true)}
                        className="p-2 rounded-full hover:bg-white/10 transition-colors group"
                        aria-label="Open Menu"
                    >
                        <Menu className="w-8 h-8 text-slate-300 group-hover:text-cyan-400 transition-colors" />
                    </button>
                </div>
            </motion.nav>

            <NavigationOverlay isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />
        </>
    )
}
