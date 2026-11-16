import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Sparkles, Filter, X } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import MovieCard from '../components/MovieCard';
import EmptyState from '../components/EmptyState';
import { movies } from '../data/movies';
import '../styles/explore.css';

export default function ExploreMovies({
  isFavourite,
  onToggleFavourite,
  onSelectMovie
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Search, Filter, and Sort states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All Years');
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedSort, setSelectedSort] = useState('rating-desc');

  // Sync initial genre from URL query parameter (e.g. ?genre=Sci-Fi)
  useEffect(() => {
    const genreParam = searchParams.get('genre');
    if (genreParam) {
      setSelectedGenre(genreParam);
    }
  }, [searchParams]);

  // Handle active filter flag
  const hasActiveFilters = useMemo(() => {
    return (
      searchQuery.trim() !== '' ||
      selectedGenre !== 'All' ||
      selectedYear !== 'All Years' ||
      selectedRating > 0 ||
      selectedSort !== 'rating-desc'
    );
  }, [searchQuery, selectedGenre, selectedYear, selectedRating, selectedSort]);

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedGenre('All');
    setSelectedYear('All Years');
    setSelectedRating(0);
    setSelectedSort('rating-desc');
    setSearchParams({});
  };

  // Filter and sort movies dynamically
  const filteredMovies = useMemo(() => {
    return movies
      .filter((movie) => {
        // Search query filter (title, director, actors)
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchTitle = movie.title.toLowerCase().includes(q);
          const matchDirector = movie.director.toLowerCase().includes(q);
          const matchCast = movie.cast.some((actor) => actor.toLowerCase().includes(q));
          if (!matchTitle && !matchDirector && !matchCast) {
            return false;
          }
        }

        // Genre filter
        if (selectedGenre !== 'All' && movie.genre !== selectedGenre) {
          return false;
        }

        // Year filter
        if (selectedYear !== 'All Years' && movie.releaseYear.toString() !== selectedYear) {
          return false;
        }

        // Minimum rating filter
        if (selectedRating > 0 && movie.rating < selectedRating) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        switch (selectedSort) {
          case 'rating-desc':
            return b.rating - a.rating;
          case 'year-desc':
            return b.releaseYear - a.releaseYear;
          case 'year-asc':
            return a.releaseYear - b.releaseYear;
          case 'title-asc':
            return a.title.localeCompare(b.title);
          case 'title-desc':
            return b.title.localeCompare(a.title);
          default:
            return 0;
        }
      });
  }, [searchQuery, selectedGenre, selectedYear, selectedRating, selectedSort]);

  return (
    <motion.div
      className="explore-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="container">
        {/* Page Header */}
        <div className="explore-header">
          <div className="explore-title-row">
            <div>
              <div className="section-tag">
                <Compass size={14} />
                <span>Unlimited Discovery</span>
              </div>
              <h1 className="explore-heading">Explore Movies</h1>
              <p className="section-subtitle">
                Discover your next favourite film from our curated cinematic vault
              </p>
            </div>

            <div className="explore-count-badge">
              <Sparkles size={16} />
              <span>Showing {filteredMovies.length} of {movies.length} Movies</span>
            </div>
          </div>
        </div>

        {/* Dynamic Search & Filter Controls Panel */}
        <div className="explore-controls-panel">
          {/* Real-time Search */}
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onClear={() => setSearchQuery('')}
          />

          {/* Filter & Sort Dropdowns */}
          <FilterPanel
            selectedGenre={selectedGenre}
            onGenreChange={(val) => {
              setSelectedGenre(val);
              if (val === 'All') {
                searchParams.delete('genre');
                setSearchParams(searchParams);
              } else {
                setSearchParams({ genre: val });
              }
            }}
            selectedYear={selectedYear}
            onYearChange={setSelectedYear}
            selectedRating={selectedRating}
            onRatingChange={setSelectedRating}
            selectedSort={selectedSort}
            onSortChange={setSelectedSort}
            onResetFilters={handleResetFilters}
            hasActiveFilters={hasActiveFilters}
          />

          {/* Active Filter Chips */}
          {hasActiveFilters && (
            <div className="active-chips-row">
              <span className="chip-label">Active filters:</span>

              {searchQuery.trim() && (
                <div className="filter-chip">
                  <span>Query: "{searchQuery}"</span>
                  <button onClick={() => setSearchQuery('')} aria-label="Remove search filter">
                    <X size={14} />
                  </button>
                </div>
              )}

              {selectedGenre !== 'All' && (
                <div className="filter-chip">
                  <span>Genre: {selectedGenre}</span>
                  <button onClick={() => setSelectedGenre('All')} aria-label="Remove genre filter">
                    <X size={14} />
                  </button>
                </div>
              )}

              {selectedYear !== 'All Years' && (
                <div className="filter-chip">
                  <span>Year: {selectedYear}</span>
                  <button onClick={() => setSelectedYear('All Years')} aria-label="Remove year filter">
                    <X size={14} />
                  </button>
                </div>
              )}

              {selectedRating > 0 && (
                <div className="filter-chip">
                  <span>Min Rating: {selectedRating}★</span>
                  <button onClick={() => setSelectedRating(0)} aria-label="Remove rating filter">
                    <X size={14} />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Movies Grid or Empty State */}
        {filteredMovies.length > 0 ? (
          <motion.div className="explore-movies-grid" layout>
            <AnimatePresence>
              {filteredMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  isFavourite={isFavourite?.(movie.id)}
                  onToggleFavourite={onToggleFavourite}
                  onSelectMovie={onSelectMovie}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <EmptyState
            title="No movies found"
            message={`We couldn't find any movies matching "${searchQuery || 'selected criteria'}". Try adjusting your filters or resetting.`}
            actionText="Clear All Filters"
            onAction={handleResetFilters}
          />
        )}
      </div>
    </motion.div>
  );
}
