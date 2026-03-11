"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Countdown from "./components/Countdown";
import PhotoBook from "./components/PhotoBook";
import HeartCollage from "./components/HeartCollage";
import "./birthday.css";

type Stage = "countdown" | "book" | "collage";

export default function Home() {
  const [stage, setStage] = useState<Stage>("countdown");

  return (
    <div className="container">
      <AnimatePresence mode="wait">
        {stage === "countdown" && (
          <motion.div
            key="countdown"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Countdown onComplete={() => setStage("book")} />
          </motion.div>
        )}

        {stage === "book" && (
          <motion.div
            key="book"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <PhotoBook onFinish={() => setStage("collage")} />
          </motion.div>
        )}

        {stage === "collage" && (
          <motion.div
            key="collage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="content"
          >
            <h1 className="title">happy birthday </h1>
            <HeartCollage />
            <p className="footnote">hope this year gives you many good moments</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}