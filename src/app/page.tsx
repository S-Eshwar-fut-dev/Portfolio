import type { Metadata } from "next";
import HomeClient from "@/components/HomeClient";

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
  return <HomeClient />;
}
