"use client";

import { useRef, ReactNode, MouseEvent } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number; // Magnetic pull strength
}

export default function MagneticButton({
  children,
  className,
  onClick,
  strength = 30, // Default strength
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Move button towards cursor (magnetic effect)
    gsap.to(buttonRef.current, {
      x: x * strength * 0.01,
      y: y * strength * 0.01,
      duration: 0.3,
      ease: "power2.out",
    });

    // Move text slightly more for depth effect
    if (textRef.current) {
      gsap.to(textRef.current, {
        x: x * strength * 0.005,
        y: y * strength * 0.005,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    if (!buttonRef.current) return;

    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    });

    if (textRef.current) {
      gsap.to(textRef.current, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      });
    }
  };

  return (
    <button
      ref={buttonRef}
      className={cn(
        "relative inline-flex items-center justify-center px-8 py-3 rounded-full bg-blue-primary text-white font-medium transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900 overflow-hidden group",
        className,
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <span ref={textRef} className="relative z-10">
        {children}
      </span>
      {/* Hover ripple/glow */}
      <div className="absolute inset-0 -z-0 bg-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-300 blur-md scale-75 group-hover:scale-100" />
    </button>
  );
}
