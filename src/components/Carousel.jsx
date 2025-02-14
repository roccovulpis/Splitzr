import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import 'pure-react-carousel/dist/react-carousel.es.css';
import image1 from '../assets/paying.jpg';
import image2 from '../assets/people-at-table.jpg'; 
import image3 from '../assets/paying2.jpg';
import '../styles/Carousel.css'; 

const images = [image1, image2, image3];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Auto-slide every 4 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  // Function to go to the next slide
  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Function to go to the previous slide
  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="carousel-wrapper">
      {/* Left Arrow (No Flicker) */}
      <button className="carousel-arrow left" onClick={prevSlide}>
        <FaChevronLeft />
      </button>

      {/* Image Slider with Framer Motion */}
      <div className="carousel-img-container">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            className="carousel-img"
            initial={{ x: direction * 100, opacity: 0 }} // Slide from left/right
            animate={{ x: 0, opacity: 1 }} // Fully visible
            exit={{ x: -direction * 100, opacity: 0 }} // Slide out
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </AnimatePresence>
      </div>

      {/* Right Arrow (No Flicker) */}
      <button className="carousel-arrow right" onClick={nextSlide}>
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Carousel;
