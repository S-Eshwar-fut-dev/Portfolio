'use client'

import { motion, useScroll, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'

export default function ScrollProgress({ className }: { className?: string }) {
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    return (
        <div className={cn("fixed top-0 left-0 right-0 h-1 bg-slate-800 z-50 origin-left", className)}>
            <motion.div
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500"
                style={{ scaleX }}
            />
        </div>
    )
}
