import type { Metadata } from "next";

import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import Navbar from "@/components/ui/Navbar";
import ScrollProgress from "@/components/ui/ScrollProgress";
import CursorGlow from "@/components/ui/CursorGlow";
import BackgroundGradient from "@/components/ui/BackgroundGradient";

// Dynamic imports for heavy client components to optimize TTI
import LenisScroll from "@/components/ui/LenisScroll";
import Scene from "@/components/three/Scene";
import LoadingScreen from "@/components/ui/LoadingScreen";

export const metadata: Metadata = {
  title: "Eshwar S | Full Stack Sorcerer",
  description:
    "Portfolio of Eshwar S, a Full Stack Developer and AI/ML Enthusiast specializing in scalable systems and interactive web experiences.",
  keywords: [
    "Full Stack Developer",
    "Software Engineer",
    "Devops Developer",
    "Microservices",
    "React",
    "Next.js",
    "Three.js",
    "AI/ML",
    "Portfolio",
    "Creative Developer",
  ],
  openGraph: {
    title: "Eshwar S | Software Developer",
    description:
      "Building scalable systems that blur the line between code and art.",
    type: "website",
    locale: "en_US",
    // images: ['/og-image.jpg'], // Placeholder
  },
  twitter: {
    card: "summary_large_image",
    title: "Eshwar S | Software Developer",
    description: "Building scalable systems.",
  },
};

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <CursorGlow />
      <ScrollProgress />
      <Navbar />

      <BackgroundGradient />
      <Scene />

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
