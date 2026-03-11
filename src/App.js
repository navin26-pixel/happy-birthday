import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Countdown from "./components/Countdown";
import PhotoBook from "./components/PhotoBook";
import HeartCollage from "./components/HeartCollage";
import "./styles/birthday.css";

function App() {
  const [stage, setStage] = useState("countdown");

  return (
    <div className="container">
      <AnimatePresence mode="wait">
        {stage === "countdown" && (
          <motion.div
            key="countdown"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ width: "100%", height: "100%" }}
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
            style={{ width: "100%", height: "100%" }}
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
            style={{ 
              width: "100%", 
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <h1 style={{ 
              fontSize: "3rem", 
              color: "#5A1E38",
              marginBottom: "1rem",
              fontFamily: "Georgia, serif"
            }}>
              happy birthday fern! 🎉
            </h1>
            <HeartCollage />
            <p style={{
              fontSize: "1.2rem",
              color: "#E75480",
              marginTop: "2rem",
              fontStyle: "italic"
            }}>
              hope this year gives you many good moments 🤍
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;