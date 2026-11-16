import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  Compass,
  Sparkles,
  Trash2,
  ExternalLink,
  Star,
  Trophy,
  Flame,
  ChevronRight,
  Activity
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import EmptyState from '../components/EmptyState';
import { movies } from '../data/movies';
import { sportsMovies } from '../data/sports';
import '../styles/favourites.css';
import '../styles/movie-card.css';

export default function Favourites({
  favouriteIds = [],
  isFavourite,
  onToggleFavourite,
  onSelectMovie
}) {
  const navigate = useNavigate();
  const favouriteMovies = movies.filter((m) => favouriteIds.includes(m.id));

  const handleSportsOpen = (sportItem) => {
    sessionStorage.setItem('stackly_return_path', window.location.pathname);
    sessionStorage.setItem('stackly_scroll_y', String(window.scrollY || 0));
    navigate(`/watch/sports-${sportItem.id}`, {
      state: {
        from: window.location.pathname,
        scrollY: window.scrollY || 0
      }
    });
  };

  return (
    <motion.div
      className="favourites-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="container">
        {/* Header */}
        <div className="fav-header">
          <div>
            <div className="section-tag">
              <Heart size={14} />
              <span>Curated Collection</span>
            </div>
            <h1 className="fav-title">My Favourite Movies</h1>
            <p className="section-subtitle">
              Your personal library of cinematic treasures, saved locally
            </p>
          </div>

          <div className="fav-count-pill">
            <Sparkles size={16} />
            <span>
              {favouriteMovies.length} {favouriteMovies.length === 1 ? 'Movie' : 'Movies'} Saved
            </span>
          </div>
        </div>

        {/* Favourites Grid or Empty State */}
        {favouriteMovies.length > 0 ? (
          <motion.div className="fav-grid" layout>
            <AnimatePresence>
              {favouriteMovies.map((movie) => (
                <motion.div
                  key={movie.id}
                  className="movie-card"
                  style={{ cursor: 'default' }}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* Poster Thumbnail */}
                  <div
                    className="card-poster-wrapper"
                    onClick={() => onSelectMovie(movie)}
                    style={{ cursor: 'pointer' }}
                  >
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
                    </div>
                  </div>

                  {/* Card Content */}
                  <div
                    className="card-content"
                    onClick={() => onSelectMovie(movie)}
                    style={{ cursor: 'pointer' }}
                  >
                    <h3 className="card-title" title={movie.title}>
                      {movie.title}
                    </h3>
                    <div className="card-meta-row">
                      <span>{movie.releaseYear}</span>
                      <span className="card-genre-tag">{movie.genre}</span>
                    </div>
                  </div>

                  {/* Open & Delete Action Buttons */}
                  <div className="fav-card-actions-bar">
                    <button
                      className="fav-action-btn fav-btn-open"
                      onClick={() => navigate(`/watch/${movie.id}`)}
                      title="Open 404 Scene"
                    >
                      <ExternalLink size={15} />
                      <span>Open</span>
                    </button>

                    <button
                      className="fav-action-btn fav-btn-delete"
                      onClick={() => onToggleFavourite(movie)}
                      title="Delete from Favourites"
                    >
                      <Trash2 size={15} />
                      <span>Delete</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <EmptyState
            title="Your favourite collection is waiting"
            message="Start exploring our cinematic library and save movies you love. Your personal watchlist will be preserved across sessions."
            actionText="Start Exploring Movies"
            actionLink="/explore"
          />
        )}

        {/* SPORTS SPOTLIGHT / SPORTS SECTION (STATIC DATA) */}
        <section className="sports-section">
          <div className="sports-header">
            <div>
              <div className="sports-pill-tag">
                <Activity size={14} />
                <span>Sports Cinema & Championships</span>
              </div>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 3.5vw, 2.4rem)',
                fontWeight: 800,
                color: '#FFFFFF',
                marginBottom: '0.45rem'
              }}>
                Trending Sports & Arena Masterpieces
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem' }}>
                Handpicked adrenaline-fueled dramas, legendary championship biographies, and racing documentaries
              </p>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#FFB547',
              fontSize: '0.9rem',
              fontWeight: 700
            }}>
              <Trophy size={18} />
              <span>{sportsMovies.length} Featured Sports Dramas</span>
            </div>
          </div>

          <div className="sports-grid">
            {sportsMovies.map((sport) => (
              <div key={sport.id} className="sports-card">
                <div className="sports-poster-wrap">
                  <img
                    src={sport.poster}
                    alt={sport.title}
                    loading="lazy"
                    className="sports-poster-img"
                  />
                  <div className="sports-poster-overlay" />
                  <div className="sports-badge-sport">
                    <Activity size={12} color="#FF4757" />
                    <span>{sport.sport}</span>
                  </div>
                  <div className="sports-badge-rating">
                    <Star size={13} fill="#FFB547" color="#FFB547" />
                    <span>{sport.rating.toFixed(1)}</span>
                  </div>
                </div>

                <div className="sports-card-body">
                  <h3 className="sports-card-title">{sport.title}</h3>
                  <div className="sports-trophy-tag">
                    <Trophy size={13} />
                    <span>{sport.trophy}</span>
                  </div>
                  <p className="sports-desc">{sport.description}</p>

                  <div className="sports-meta-footer">
                    <span>{sport.releaseYear} • {sport.runtime}</span>
                    <button
                      className="sports-explore-btn"
                      onClick={() => handleSportsOpen(sport)}
                      title="Watch sports feature"
                    >
                      <span>Watch</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
}
