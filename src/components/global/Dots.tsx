"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const NUM_DOTS = 50; // Number of floating dots
const DOT_SIZE = 4;  // Fixed size for all dots

const Dots = () => {
  const [dots, setDots] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    // Generate dots on client-side only to avoid hydration errors
    const generatedDots = Array.from({ length: NUM_DOTS }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // vw
      y: Math.random() * 100, // vh
    }));
    setDots(generatedDots);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-indigo-950">
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute rounded-full opacity-75"
          style={{
            backgroundColor: "#818CF8", // Light Indigo
            width: DOT_SIZE,
            height: DOT_SIZE,
            left: `${dot.x}vw`,
            top: `${dot.y}vh`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50 + "vw"], 
            y: [0, Math.random() * 100 - 50 + "vh"], 
          }}
          transition={{
            duration: Math.random() * 8 + 4,
            repeat: Infinity,
            ease: "linear",
            repeatType: "mirror",
          }}
        />
      ))}
    </div>
  );
};

export default Dots;
