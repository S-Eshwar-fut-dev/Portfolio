'use client'

import { ReactNode, useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { lenisOptions } from '@/lib/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface LenisScrollProps {
    children: ReactNode
}

export default function LenisScroll({ children }: LenisScrollProps) {
    useEffect(() => {
        const lenis = new Lenis(lenisOptions)

        lenis.on('scroll', ScrollTrigger.update)

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000)
        })

        // Optimized lag smoothing for smoother recovery from heavy frames
        gsap.ticker.lagSmoothing(1000, 16)

        return () => {
            lenis.destroy()
            gsap.ticker.remove((time) => lenis.raf(time * 1000))
        }
    }, [])

    return (
        <div className="w-full min-h-screen">
            {children}
        </div>
    )
}
