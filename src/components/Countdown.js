import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Countdown({ onComplete }) {
  const [count, setCount] = useState(3);
  const [stage, setStage] = useState("countdown");

  const floatingWords = useRef(
    Array.from({ length: 14 }).map(() => ({
      left: Math.random() * 100,
      size: 1.2 + Math.random() * 0.8,
      rotate: Math.random() * 20 - 10,
    }))
  ).current;

  const timeoutsRef = useRef([]);
  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  const scheduleTimeout = (callback, delay) => {
    const id = setTimeout(() => {
      callback();
      timeoutsRef.current = timeoutsRef.current.filter((t) => t !== id);
    }, delay);
    timeoutsRef.current.push(id);
  };

  useEffect(() => {
    if (stage !== "countdown") return;

    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          scheduleTimeout(() => setStage("heart"), 1000);
          return 1;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      clearAllTimeouts();
    };
  }, [stage]);

  useEffect(() => {
    if (stage === "heart") {
      scheduleTimeout(() => setStage("message"), 1100);
    } else if (stage === "message") {
      scheduleTimeout(() => setStage("cake"), 1400);
    } else if (stage === "cake") {
      scheduleTimeout(() => {
        onComplete();
      }, 1600);
    }

    return () => clearAllTimeouts();
  }, [stage, onComplete]);

  return (
    <div className="container">
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
            left: `${word.left}%`,
            top: 0,
            color: ["#E75480", "#D64572", "#FF9EB5"][i % 3],
            fontWeight: "600",
            fontSize: `${word.size}rem`,
            fontFamily: "Georgia, serif",
            whiteSpace: "nowrap",
            opacity: 0.7,
            rotate: `${word.rotate}deg`,
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          Happy Birthday {Math.random() > 1 ? "🤍" : ""}
        </motion.div>
      ))}

      <div className="content">
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
      <div className="vignette"></div>
    </div>
  );
}