"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const images = [
  "/10.jpg",
  "/4.jpg",
  "/5.jpg",
  "/6.jpg",
  "/2.jpg",
  "/8.jpg",
  "/9.jpg",
  "/11.jpg",
  "/12.jpg",
];

// Heart path scaled to fit a 700x630 container (original 100x90 * 7)
const heartPath =
  "M350 630 C140 420 0 280 140 140 C280 0 350 140 350 140 C350 140 420 0 560 140 C700 280 560 420 350 630";

// Simple flower component with floating and swaying animation
const Flower = ({ left, top }: { left: number; top: number }) => (
  <motion.div
    style={{
      position: "absolute",
      left,
      top,
      fontSize: "2rem",
      transform: "translate(-50%, -50%)",
      pointerEvents: "none",
      zIndex: 1,
    }}
    animate={{
      y: [0, -10, 0],
      rotate: [0, 10, -10, 0],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
      delay: Math.random() * 2,
    }}
  >
    🌸
  </motion.div>
);

// Cake component with a gentle bobbing animation
const Cake = () => (
  <motion.div
    style={{
      position: "absolute",
      left: "350px",
      top: "350px",
      fontSize: "4rem",
      transform: "translate(-50%, -50%)",
      pointerEvents: "none",
      zIndex: 2, // slightly above the flowers, below the moving images if needed
      filter: "drop-shadow(0 10px 10px rgba(0,0,0,0.3))",
    }}
    animate={{
      y: [0, -15, 0],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
  </motion.div>
);

export default function HeartCollage() {
  // Flowers spaced evenly along the sides, now at 20px from edges
  const leftFlowers = [100, 200, 300, 400, 500].map((y) => ({ left: 20, top: y }));
  const rightFlowers = [100, 200, 300, 400, 500].map((y) => ({ left: 680, top: y }));

  return (
    <div
      style={{
        position: "relative",
        width: "700px",
        height: "630px",
        margin: "0 auto",
      }}
    >
      {/* Faint heart outline for reference */}
      <svg
        width="700"
        height="630"
        viewBox="0 0 700 630"
        style={{ position: "absolute", top: 0, left: 0, opacity: 0.2 }}
      >
        <path d={heartPath} stroke="pink" fill="none" strokeWidth="2" />
      </svg>

      {/* Animated candle above the heart */}
      <motion.div
        style={{
          position: "absolute",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pointerEvents: "none",
        }}
      >
        {/* Flame */}
        <motion.div
          style={{
            width: "20px",
            height: "30px",
            background: "radial-gradient(circle at 50% 0%, #ffaa00, #ff5500)",
            borderRadius: "50% 50% 20% 20%",
            transformOrigin: "bottom",
          }}
          animate={{
            scaleY: [1, 1.2, 0.9, 1.1, 1],
            opacity: [0.9, 1, 0.8, 1, 0.9],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* Candle body */}
        <div
          style={{
            width: "30px",
            height: "50px",
            background: "#f5cba0",
            borderRadius: "5px 5px 0 0",
            boxShadow: "0 5px 10px rgba(0,0,0,0.2)",
          }}
        />
        {/* Base */}
        <div
          style={{
            width: "40px",
            height: "8px",
            background: "#d4a76a",
            borderRadius: "4px",
          }}
        />
      </motion.div>

      {/* Flower frame – now placed farther from the heart (20px from edges) */}
      {leftFlowers.map((pos, idx) => (
        <Flower key={`left-${idx}`} left={pos.left} top={pos.top} />
      ))}
      {rightFlowers.map((pos, idx) => (
        <Flower key={`right-${idx}`} left={pos.left} top={pos.top} />
      ))}

      {/* Cake in the middle of the heart */}
      <Cake />

      {/* Moving images */}
      {images.map((src, index) => (
        <motion.div
          key={index}
          style={{
            position: "absolute",
            width: "80px",
            height: "80px",
            offsetPath: `path("${heartPath}")`,
            offsetRotate: "auto",
          }}
          animate={{ offsetDistance: "100%" }}
          transition={{
            duration: 12,
            delay: index * 1.2,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Image
            src={src}
            alt=""
            width={80}
            height={80}
            style={{
              borderRadius: "8px",
              objectFit: "cover",
              boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}