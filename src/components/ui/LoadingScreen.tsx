"use client";

import { useProgress } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen({
  onFinished,
}: {
  onFinished?: () => void;
}) {
  const { progress, active } = useProgress();
  const [finished, setFinished] = useState(false);
  const [simulatedProgress, setSimulatedProgress] = useState(0);

  useEffect(() => {
    // Simulate progress for procedural assets
    const interval = setInterval(() => {
      setSimulatedProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 3; // Increment by % every ~20ms -> 1s total approx
      });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  const displayProgress = Math.max(progress, simulatedProgress);

  useEffect(() => {
    // When progress hits 100, signal finished
    if (displayProgress === 100) {
      // Small delay to ensure smooth exit
      const timer = window.setTimeout(() => {
        setFinished(true);
        onFinished?.();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [displayProgress, onFinished]);

  return (
    <AnimatePresence>
      {!finished && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-abyss text-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, pointerEvents: "none" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Logo Animation */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 relative"
          >
            <div className="text-6xl font-bold font-sans tracking-tighter bg-gradient-to-br from-blue-400 to-purple-600 bg-clip-text text-transparent">
              ES
            </div>
            <motion.div
              className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </motion.div>

          {/* Progress Bar */}
          <div className="w-64 h-1 bg-slate-800 rounded-full overflow-hidden relative">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${displayProgress}%` }}
              transition={{ type: "spring", stiffness: 50, damping: 20 }}
            />
          </div>

          <motion.p
            className="mt-4 text-slate-400 font-mono text-sm"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            INITIALIZING REALITY... {Math.round(displayProgress)}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
