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
  title: "Eshwar S | Full Stack Sorcerer",
  description: "Full Stack Sorcerer • Knight @LeetCode • AI/ML Enthusiast. Building scalable systems that blur the line between code and art.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased selection:bg-blue-500/30 selection:text-blue-200">
        {children}
        <Toaster position="bottom-right" theme="dark" />
      </body>
    </html>
  );
}
