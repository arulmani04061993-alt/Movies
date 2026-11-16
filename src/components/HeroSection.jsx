import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, Star, Compass, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../styles/home.css';

export default function HeroSection({
  movie,
  movies = [],
  onSelectMovie,
  autoPlayInterval = 3800
}) {
  // Use hero movies list or fallback to single movie prop
  const heroList = (movies && movies.length > 0) ? movies : (movie ? [movie] : []);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto move images smoothly with guaranteed timer
  useEffect(() => {
    if (heroList.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroList.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [heroList.length, autoPlayInterval]);

  if (heroList.length === 0) return null;

  const currentMovie = heroList[currentIndex] || heroList[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % heroList.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + heroList.length) % heroList.length);
  };

  return (
    <section className="hero-section">
      {/* Background Animated Backdrop Images with crossfade */}
      <AnimatePresence mode="wait">
        <motion.img
          key={currentMovie.id}
          src={currentMovie.backdrop}
          alt={currentMovie.title}
          className="hero-backdrop-img"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1.02 }}
          exit={{ opacity: 0, scale: 1.0 }}
          transition={{ duration: 1.1, ease: 'easeInOut' }}
        />
      </AnimatePresence>

      <div className="hero-gradient-overlay" />

      {/* Hero Manual Arrows (hover visible) */}
      {heroList.length > 1 && (
        <>
          <button
            className="hero-nav-arrow hero-nav-prev"
            onClick={handlePrev}
            aria-label="Previous Featured Movie"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="hero-nav-arrow hero-nav-next"
            onClick={handleNext}
            aria-label="Next Featured Movie"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Main Content with smooth animation per movie */}
      <div className="container" style={{ position: 'relative', width: '100%' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMovie.id}
            className="hero-content"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
          >
            {/* Header Badges */}
            <div className="hero-badge-row">
              <span className="hero-original-tag">STACKLY SPOTLIGHT</span>
              <span className="badge-genre">{currentMovie.genre}</span>
              <div className="hero-rating">
                <Star size={16} fill="#FFB547" color="#FFB547" />
                <span>{currentMovie.rating.toFixed(1)} IMDb</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="hero-title">{currentMovie.title}</h1>

            {/* Meta Info */}
            <div className="hero-meta-row">
              <span>{currentMovie.releaseYear}</span>
              <span>•</span>
              <span>{currentMovie.runtime}</span>
              <span>•</span>
              <span>Dir. {currentMovie.director}</span>
            </div>

            {/* Description */}
            <p className="hero-description">{currentMovie.description}</p>

            {/* Actions */}
            <div className="hero-cta-group">
              <button
                className="btn-primary"
                onClick={() => onSelectMovie(currentMovie)}
                id="hero-more-details-btn"
              >
                <Info size={18} />
                <span>More Details</span>
              </button>

              <Link to="/explore" className="btn-secondary">
                <Compass size={18} />
                <span>Explore All Movies</span>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Indicators / Progress Dots */}
      {heroList.length > 1 && (
        <div className="hero-slide-indicators">
          {heroList.map((m, idx) => (
            <button
              key={m.id}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Slide to ${m.title}`}
              className={`hero-slide-pill ${idx === currentIndex ? 'active' : ''}`}
              style={{
                width: idx === currentIndex ? '28px' : '8px'
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}
