'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'
import { cn } from '@/lib/utils'

export default function CursorGlow() {
    const [isVisible, setIsVisible] = useState(false)

    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Smooth spring animation for the cursor follower
    const springConfig = { damping: 25, stiffness: 150, mass: 0.5 }
    const x = useSpring(mouseX, springConfig)
    const y = useSpring(mouseY, springConfig)

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Only show on desktop and when mouse moves
            if (!isVisible) setIsVisible(true)
            mouseX.set(e.clientX)
            mouseY.set(e.clientY)
        }

        // Hide on mobile touch
        const handleTouch = () => setIsVisible(false)

        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('touchstart', handleTouch)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('touchstart', handleTouch)
        }
    }, [mouseX, mouseY, isVisible])

    return (
        <motion.div
            className={cn(
                "fixed pointer-events-none z-0 hidden md:block mix-blend-screen",
                isVisible ? "opacity-100" : "opacity-0"
            )}
            style={{
                x,
                y,
                translateX: "-50%",
                translateY: "-50%",
                width: 600,
                height: 600,
                background: "radial-gradient(circle closest-side, rgba(59, 130, 246, 0.15), transparent 80%)"
            }}
        />
    )
}
