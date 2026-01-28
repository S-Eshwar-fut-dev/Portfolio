"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Navbar from "@/components/ui/Navbar";
import ScrollProgress from "@/components/ui/ScrollProgress";
import CursorGlow from "@/components/ui/CursorGlow";
import BackgroundGradient from "@/components/ui/BackgroundGradient";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";

// Dynamic imports for heavy content and non-critical sections
const Projects = dynamic(() => import("@/components/sections/Projects"));
const Experience = dynamic(() => import("@/components/sections/Experience"));
const Skills = dynamic(() => import("@/components/sections/Skills"));
const Contact = dynamic(() => import("@/components/sections/Contact"));
const Footer = dynamic(() => import("@/components/sections/Footer"));

// Dynamic imports for heavy client interactive components
const LenisScroll = dynamic(() => import("@/components/ui/LenisScroll"));
const Scene = dynamic(() => import("@/components/three/Scene"), { ssr: false });
const LoadingScreen = dynamic(() => import("@/components/ui/LoadingScreen"), { ssr: false });

export default function HomeClient() {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        // Defer 3D scene loading to prioritize LCP (Hero text)
        const timer = setTimeout(() => setIsReady(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <LoadingScreen />
            <CursorGlow />
            <ScrollProgress />
            <Navbar />

            <BackgroundGradient />

            <ErrorBoundary>
                {isReady && <Scene />}
            </ErrorBoundary>

            <LenisScroll>
                <main className="relative z-10 flex flex-col items-center w-full overflow-x-hidden">
                    <Hero />
                    <About />
                    <Projects />
                    <Experience />
                    <Skills />
                    <Contact />
                    <Footer />
                </main>
            </LenisScroll>
        </>
    );
}
