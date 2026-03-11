"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CountdownProps {
  onComplete: () => void;
  name?: string;
}

export default function Countdown({ onComplete,  }: CountdownProps) {
  const [count, setCount] = useState(3);
  const [stage, setStage] = useState<"countdown" | "heart" | "message" | "cake">("countdown");

  // Precompute floating word positions for stability & performance
  const floatingWords = useRef(
    Array.from({ length: 14 }).map(() => ({
      left: Math.random() * 100,
      size: 1.2 + Math.random() * 0.8,
      rotate: Math.random() * 20 - 10,
    }))
  ).current;

  // Timeout management
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  const scheduleTimeout = (callback: () => void, delay: number) => {
    const id = setTimeout(() => {
      callback();
      timeoutsRef.current = timeoutsRef.current.filter((t) => t !== id);
    }, delay);
    timeoutsRef.current.push(id);
  };

  // Countdown: 1 second per number
  useEffect(() => {
    if (stage !== "countdown") return;

    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          // Let "1" stay for a full second, then go to heart
          scheduleTimeout(() => setStage("heart"), 1000);
          return 1;
        }
        return prev - 1;
      });
    }, 1000); // was 1200 – now precise 1s

    return () => {
      clearInterval(interval);
      clearAllTimeouts();
    };
  }, [stage]);

  // Stage transitions with your tuned durations
  useEffect(() => {
    if (stage === "heart") {
      scheduleTimeout(() => setStage("message"), 1100); // was 1500
    } else if (stage === "message") {
      scheduleTimeout(() => setStage("cake"), 1400);    // was 2000
    } else if (stage === "cake") {
      scheduleTimeout(() => {
        onComplete();
      }, 1600); // was 2500
    }

    return () => clearAllTimeouts();
  }, [stage, onComplete]);

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "linear-gradient(180deg, #FFE4EC, #F8D7E1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Floating "Happy Birthday" – now only 14, stable positions */}
      {floatingWords.map((word, i) => (
        <motion.div
          key={i}
          initial={{ y: -200, opacity: 0 }}
          animate={{ y: "120vh", opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 8 + Math.random() * 4,
            delay: i * 0.15,
            repeat: Infinity,
            ease: "linear",
            times: [0, 0.1, 0.8, 1],
          }}
          style={{
            position: "absolute",
            left: `${word.left}%`,        // fixed value, no recalculation
            top: 0,
            color: ["#E75480", "#D64572", "#FF9EB5"][i % 3],
            fontWeight: "600",
            fontSize: `${word.size}rem`,  // fixed size
            fontFamily: "Georgia, serif",
            whiteSpace: "nowrap",
            opacity: 0.7,
            rotate: `${word.rotate}deg`,  // fixed rotation
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          Happy Birthday {Math.random() > 1 ? "🤍" : ""}
        </motion.div>
      ))}

      {/* Main content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <AnimatePresence mode="wait">
          {stage === "countdown" && (
            <motion.div
              key="countdown"
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 1 }}
              exit={{ scale: 0.3, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 10 }}
              style={{
                fontSize: "12rem",
                fontWeight: "bold",
                color: "#5A1E38",
                textShadow: "0px 10px 20px rgba(90, 30, 56, 0.2)",
              }}
            >
              {count}
            </motion.div>
          )}

          {stage === "heart" && (
            <motion.div
              key="heart"
              initial={{ scale: 0 }}
              animate={{ scale: 1.5 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 8 }}
              style={{
                fontSize: "10rem",
                filter: "drop-shadow(0 20px 30px rgba(231, 84, 128, 0.4))",
              }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: 2,
                  ease: "easeInOut",
                }}
              >
                🤍
              </motion.div>
            </motion.div>
          )}

          {stage === "message" && (
            <motion.div
              key="message"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ type: "spring", stiffness: 80, damping: 12 }}
              style={{ textAlign: "center" }}
            >
              <motion.h1
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  fontSize: "5rem",
                  color: "#E75480",
                  fontFamily: "Georgia, serif",
                  margin: 0,
                  lineHeight: 1.2,
                  textShadow: "2px 2px 0 rgba(255,255,255,0.5)",
                }}
              >
                Happy Birthday Fern!
              </motion.h1>
              <motion.h2
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                style={{
                  fontSize: "4rem",
                  color: "#5A1E38",
                  fontFamily: "Georgia, serif",
                  margin: "0.5rem 0 0 0",
                }}
              >
              </motion.h2>
            </motion.div>
          )}

          {stage === "cake" && (
            <motion.div
              key="cake"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 90, damping: 8 }}
              style={{
                fontSize: "8rem",
                filter: "drop-shadow(0 20px 30px rgba(90, 30, 56, 0.3))",
              }}
            >
              <motion.div
                animate={{ y: [0, -15, 0], rotate: [0, 3, -3, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                🎂
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                style={{
                  fontSize: "1.2rem",
                  color: "#5A1E38",
                  textAlign: "center",
                  marginTop: "1rem",
                  fontStyle: "italic",
                }}
              >
                made with love 🤍
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Vignette overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "radial-gradient(circle at center, transparent 30%, rgba(248, 215, 225, 0.3) 100%)",
          pointerEvents: "none",
          zIndex: 5,
        }}
      />
    </div>
  );
}