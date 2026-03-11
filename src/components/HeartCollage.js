import { motion } from "framer-motion";

const images = [
  "/images/10.jpg",
  "/images/4.jpg",
  "/images/5.jpg",
  "/images/6.jpg",
  "/images/2.jpg",
  "/images/8.jpg",
  "/images/9.jpg",
  "/images/11.jpg",
  "/images/12.jpg",
];

const heartPath =
  "M350 630 C140 420 0 280 140 140 C280 0 350 140 350 140 C350 140 420 0 560 140 C700 280 560 420 350 630";

const Flower = ({ left, top }) => (
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

export default function HeartCollage() {
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
      <svg
        width="700"
        height="630"
        viewBox="0 0 700 630"
        style={{ position: "absolute", top: 0, left: 0, opacity: 0.2 }}
      >
        <path d={heartPath} stroke="pink" fill="none" strokeWidth="2" />
      </svg>

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
          zIndex: 3,
        }}
      >
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
        <div
          style={{
            width: "30px",
            height: "50px",
            background: "#f5cba0",
            borderRadius: "5px 5px 0 0",
            boxShadow: "0 5px 10px rgba(0,0,0,0.2)",
          }}
        />
        <div
          style={{
            width: "40px",
            height: "8px",
            background: "#d4a76a",
            borderRadius: "4px",
          }}
        />
      </motion.div>

      {leftFlowers.map((pos, idx) => (
        <Flower key={`left-${idx}`} left={pos.left} top={pos.top} />
      ))}
      {rightFlowers.map((pos, idx) => (
        <Flower key={`right-${idx}`} left={pos.left} top={pos.top} />
      ))}

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
          <img
            src={src}
            alt=""
            style={{
              width: "80px",
              height: "80px",
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