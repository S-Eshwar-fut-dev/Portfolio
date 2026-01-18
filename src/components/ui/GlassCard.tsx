'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlassCardProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode
    className?: string
    noHover?: boolean
}

export default function GlassCard({
    children,
    className,
    noHover = false,
    ...props
}: GlassCardProps) {
    return (
        <motion.div
            className={cn(
                "glass-card relative overflow-hidden",
                !noHover && "hover:shadow-[0_16px_48px_rgba(59,130,246,0.3)]",
                className
            )}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
            {...props}
        >
            {/* Glossy overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {children}
        </motion.div>
    )
}
