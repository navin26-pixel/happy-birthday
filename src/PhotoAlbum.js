import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./PhotoAlbum.css";

const photos = [
  {
    id: 1,
    image: "https://via.placeholder.com/400x500/FF9EB5/FFFFFF?text=Memory+1",
    caption: "First memory together 💕"
  },
  {
    id: 2,
    image: "https://via.placeholder.com/400x500/E75480/FFFFFF?text=Memory+2",
    caption: "Beautiful moments ✨"
  },
  {
    id: 3,
    image: "https://via.placeholder.com/400x500/D64572/FFFFFF?text=Memory+3",
    caption: "So many laughs 😊"
  },
  {
    id: 4,
    image: "https://via.placeholder.com/400x500/FF9EB5/FFFFFF?text=Memory+4",
    caption: "Happy times together 🎉"
  },
  {
    id: 5,
    image: "https://via.placeholder.com/400x500/E75480/FFFFFF?text=Memory+5",
    caption: "Making memories 📸"
  }
];

export default function PhotoAlbum() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextPhoto = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <div className="album-container">
      <h1 className="album-title">Your Birthday Book 📖</h1>
      
      <div className="album-wrapper">
        <button onClick={prevPhoto} className="nav-button prev">←</button>
        
        <div className="photo-frame">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 300 : -300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -300 : 300 }}
              transition={{ duration: 0.5 }}
              className="photo-card"
            >
              <img 
                src={photos[currentIndex].image} 
                alt={`Memory ${currentIndex + 1}`}
                className="photo-image"
              />
              <p className="photo-caption">{photos[currentIndex].caption}</p>
              <div className="photo-counter">
                {currentIndex + 1} / {photos.length}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <button onClick={nextPhoto} className="nav-button next">→</button>
      </div>

      <motion.div 
        className="floating-hearts"
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        💝
      </motion.div>
    </div>
  );
}