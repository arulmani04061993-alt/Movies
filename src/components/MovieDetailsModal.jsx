import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Heart, Clock, Calendar, Globe, User, Award, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/modal.css';

export default function MovieDetailsModal({
  movie,
  isOpen,
  onClose,
  isFavourite,
  onToggleFavourite
}) {
  const navigate = useNavigate();

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !movie) return null;

  const favourited = isFavourite?.(movie.id);

  const handleFavouriteClick = () => {
    const willAdd = !favourited;
    onToggleFavourite(movie);
    
    // Automatic-ah modal close aagi My Favourite Movies page-ku navigate pannum
    if (willAdd) {
      onClose();
      navigate('/favourites');
    }
  };

  const handlePlayVideo = () => {
    // Record exact window scroll position and movie ID
    sessionStorage.setItem('stackly_reopen_movie_id', movie.id);
    sessionStorage.setItem('stackly_return_path', window.location.pathname + window.location.search);
    sessionStorage.setItem('stackly_scroll_y', String(window.scrollY || 0));

    navigate(`/watch/${movie.id}`, {
      state: {
        from: window.location.pathname + window.location.search,
        reopenMovieId: movie.id,
        scrollY: window.scrollY || 0
      }
    });
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="modal-backdrop" onClick={onClose}>
        <motion.div
          className="modal-dialog"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.93, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 20 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Close Icon Button */}
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>

          {/* Modal Header Banner */}
          <div className="modal-header-hero">
            <img
              src={movie.backdrop}
              alt={movie.title}
              className="modal-backdrop-img"
            />
            <div className="modal-hero-gradient" />

            {/* Video Play Icon on Backdrop */}
            <button
              className="modal-play-trailer-btn"
              onClick={handlePlayVideo}
              title="Play Trailer / Watch Movie"
              aria-label="Play Trailer"
            >
              <Play size={28} fill="#FFFFFF" color="#FFFFFF" style={{ marginLeft: 3 }} />
            </button>
          </div>

          {/* Modal Body */}
          <div className="modal-body">
            <div className="modal-content-grid">
              {/* Poster Column */}
              <div className="modal-poster-wrap">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="modal-poster-img"
                />
              </div>

              {/* Information Column */}
              <div className="modal-info-panel">
                <div className="modal-title-row">
                  <h2 className="modal-movie-title">{movie.title}</h2>
                  
                  <div className="modal-meta-chips">
                    <span className="modal-rating-badge">
                      <Star size={14} fill="#FFB547" color="#FFB547" />
                      <span>{movie.rating.toFixed(1)} / 10</span>
                    </span>
                    <span className="badge-genre">{movie.genre}</span>
                    <span className="badge-genre">
                      <Calendar size={13} style={{ display: 'inline', marginRight: 4 }} />
                      {movie.releaseYear}
                    </span>
                    <span className="badge-genre">
                      <Clock size={13} style={{ display: 'inline', marginRight: 4 }} />
                      {movie.runtime}
                    </span>
                    <span className="badge-genre">
                      <Globe size={13} style={{ display: 'inline', marginRight: 4 }} />
                      {movie.language}
                    </span>
                  </div>
                </div>

                {movie.tagline && (
                  <p className="modal-tagline">"{movie.tagline}"</p>
                )}

                <p className="modal-desc">{movie.description}</p>

                {/* Director & Cast Metadata */}
                <div className="modal-credits-list">
                  <div className="credit-row">
                    <span className="credit-label">Director:</span>
                    <span className="credit-val">{movie.director}</span>
                  </div>
                  <div className="credit-row">
                    <span className="credit-label">Starring:</span>
                    <span className="credit-val">{movie.cast.join(', ')}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="modal-actions-bar">
                  <button
                    className="btn-play-video"
                    onClick={handlePlayVideo}
                    title="Play Movie Video"
                  >
                    <Play size={17} fill="#FFFFFF" color="#FFFFFF" style={{ marginLeft: 2 }} />
                    <span>Watch Trailer</span>
                  </button>

                  <button
                    className={`btn-fav-toggle ${favourited ? 'is-favourited' : ''}`}
                    onClick={handleFavouriteClick}
                  >
                    <Heart
                      size={18}
                      fill={favourited ? '#FFFFFF' : 'none'}
                      color={favourited ? '#FFFFFF' : 'currentColor'}
                    />
                    <span>{favourited ? 'In Your Favourites' : 'Add to Favourites'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
