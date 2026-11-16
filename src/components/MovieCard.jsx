import React from 'react';
import { Heart, Star, Info, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import '../styles/movie-card.css';

export default function MovieCard({
  movie,
  isFavourite = false,
  onToggleFavourite,
  onSelectMovie,
  showTrendingRank = false,
  rank = null
}) {
  const handleFavClick = (e) => {
    e.stopPropagation();
    onToggleFavourite?.(movie);
  };

  const handleCardClick = () => {
    onSelectMovie?.(movie);
  };

  return (
    <motion.div
      className="movie-card"
      onClick={handleCardClick}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      layout
    >
      <div className="card-poster-wrapper">
        <img
          src={movie.poster}
          alt={movie.title}
          loading="lazy"
          className="card-poster-img"
        />

        <div className="card-overlay-gradient" />

        {/* Top Badges */}
        <div className="card-top-actions">
          <div className="card-rating-pill">
            <Star size={13} fill="#FFB547" color="#FFB547" />
            <span>{movie.rating.toFixed(1)}</span>
          </div>

          <motion.button
            className={`card-fav-btn ${isFavourite ? 'is-active' : ''}`}
            onClick={handleFavClick}
            whileTap={{ scale: 0.8 }}
            aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
            title={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
          >
            <Heart
              size={17}
              fill={isFavourite ? '#E5093A' : 'none'}
              color={isFavourite ? '#E5093A' : '#FFFFFF'}
              strokeWidth={2}
            />
          </motion.button>
        </div>

        {/* Big Number for Trending Row */}
        {showTrendingRank && rank && (
          <div className="trending-rank-badge">{rank}</div>
        )}

        {/* Quick Details Hover Reveal */}
        <div className="card-hover-details">
          <p className="card-quick-desc">{movie.description}</p>
          <button className="btn-quick-view" onClick={handleCardClick}>
            <Info size={15} />
            <span>View Details</span>
          </button>
        </div>
      </div>

      {/* Card Info */}
      <div className="card-content">
        <h3 className="card-title" title={movie.title}>
          {movie.title}
        </h3>
        <div className="card-meta-row">
          <span>{movie.releaseYear}</span>
          <span className="card-genre-tag">{movie.genre}</span>
        </div>
      </div>
    </motion.div>
  );
}
