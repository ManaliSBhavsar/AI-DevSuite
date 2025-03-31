"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const totalDots = 50;
const dotSize = 4;

const Dots = () => {
  const [dots, setDots] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    const generatedDots = Array.from({ length: totalDots }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
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
            backgroundColor: "#818CF8",
            width: dotSize,
            height: dotSize,
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
