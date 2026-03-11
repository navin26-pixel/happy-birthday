"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface PhotoBookProps {
  onFinish: () => void;
}

export default function PhotoBook({ onFinish }: PhotoBookProps) {
  const photos = ["/1.jpg", "/7.jpg", "/3.jpg"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",
        padding: "3rem 2rem",
        minHeight: "100vh",
        width: "100%",
        background: "#faa5bd", // Soft pink background
      }}
    >
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        style={{
          color: "#6B2146",
          fontSize: "2.5rem",
          marginBottom: "1rem",
          fontFamily: "Georgia, serif",
          letterSpacing: "-0.5px",
          textShadow: "2px 2px 4px rgba(255, 255, 255, 0.5)",
        }}
      >
        Happy Birthday! 🎂
      </motion.h1>

      <div
        style={{
          display: "flex",
          gap: "2rem",
          flexWrap: "wrap",
          justifyContent: "center",
          maxWidth: "900px",
          background: "transparent", // Transparent to show parent background
        }}
      >
        {photos.map((src, index) => (
          <motion.div
            key={src}
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, type: "spring", stiffness: 100 }}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
            style={{
              width: "220px",
              height: "270px",
              borderRadius: "24px",
              overflow: "hidden",
              boxShadow: "0px 15px 30px rgba(107, 33, 70, 0.15)",
              cursor: "pointer",
              border: "2px solid white",
              background: "white", // White background for images (optional)
            }}
          >
            <Image
              src={src}
              alt={`memory ${index + 1}`}
              width={220}
              height={270}
              style={{ 
                objectFit: "cover", 
                width: "100%", 
                height: "100%",
                transition: "transform 0.3s ease",
              }}
            />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          marginTop: "2rem",
          background: "transparent", // Transparent to show parent background
        }}
      >
        <motion.p
          animate={{ 
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            color: "#6B2146",
            fontSize: "1.1rem",
            fontStyle: "italic",
            margin: 0,
            background: "transparent",
          }}
        >
          one more thing... 👇
        </motion.p>
        
        <motion.button
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0px 15px 30px rgba(255, 107, 154, 0.3)"
          }}
          whileTap={{ scale: 0.95 }}
          onClick={onFinish}
          style={{
            background: "#fb578b",
            border: "none",
            color: "white",
            fontSize: "1.25rem",
            fontWeight: "500",
            padding: "1rem 2.5rem",
            borderRadius: "50px",
            cursor: "pointer",
            boxShadow: "0px 8px 20px rgba(255, 107, 154, 0.25)",
            transition: "all 0.2s ease",
            letterSpacing: "0.5px",
          }}
        >
          click here 💝
        </motion.button>
        
        <motion.p
          animate={{ 
            y: [0, 3, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            color: "#d62b81",
            fontSize: "0.9rem",
            opacity: 0.7,
            marginTop: "0.5rem",
            background: "transparent",
          }}
        >
          (if you don't click, you'll miss the surprise!)
        </motion.p>
      </motion.div>
    </motion.div>
  );
}