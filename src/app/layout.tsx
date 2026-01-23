import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Toaster } from 'sonner';
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Eshwar S | Full Stack Sorcerer",
    template: "%s | Eshwar S"
  },
  description: "Architecting digital realities where 15,000 stars compute at 60fps. Full Stack Engineer, LeetCode Knight, and AI/ML Enthusiast specializing in scalable distributed systems.",
  keywords: ["Full Stack Developer", "Three.js", "React", "Next.js", "AI/ML", "Portfolio", "Eshwar S", "Web Developer India"],
  authors: [{ name: "Eshwar S" }],
  creator: "Eshwar S",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://eshwarz.com", // Placeholder URL, user should update
    title: "Eshwar S | Full Stack Sorcerer",
    description: "Architecting digital realities. Explore the interactive 3D portfolio of Eshwar S.",
    siteName: "Eshwar S Portfolio",
    images: [
      {
        url: "/og-image.jpg", // Needs to be added to public
        width: 1200,
        height: 630,
        alt: "Eshwar S - Full Stack Sorcerer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eshwar S | Full Stack Sorcerer",
    description: "Architecting digital realities. Explore the interactive 3D portfolio of Eshwar S.",
    images: ["/og-image.jpg"],
    creator: "@S_Eshwar_fut" // Placeholder
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Eshwar S",
  "url": "https://eshwarz.com",
  "image": "https://eshwarz.com/og-image.jpg",
  "sameAs": [
    "https://github.com/S-Eshwar-fut-dev",
    "https://linkedin.com/in/eshwar-s" // Placeholder
  ],
  "jobTitle": "Full Stack Engineer",
  "worksFor": {
    "@type": "Organization",
    "name": "Chennai Institute of Technology"
  },
  "description": "Full Stack Sorcerer and AI/ML Enthusiast building scalable systems."
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased selection:bg-blue-500/30 selection:text-blue-200">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Toaster position="bottom-right" theme="dark" />
      </body>
    </html>
  );
}
