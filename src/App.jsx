import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MovieDetailsModal from './components/MovieDetailsModal';
import LoadingScreen from './components/LoadingScreen';
import Home from './pages/Home';
import ExploreMovies from './pages/ExploreMovies';
import Favourites from './pages/Favourites';
import NotFound from './pages/NotFound';
import { useFavourites } from './hooks/useFavourites';
import { movies } from './data/movies';

export default function App() {
  const { favouriteIds, isFavourite, toggleFavourite, count } = useFavourites();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const location = useLocation();

  // Check if current path matches any known route (Home, Explore, Favourites)
  const isKnownRoute = ['/', '/explore', '/favourites'].includes(location.pathname);

  // Scroll to top on route change only when not restoring previous position
  useEffect(() => {
    const hasReopen = sessionStorage.getItem('stackly_reopen_movie_id') || location.state?.reopenMovieId;
    if (!hasReopen) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  // Synchronize modal and scroll position so "Go back" immediately restores the exact current place
  useEffect(() => {
    // Check if we came back from 404 with a movie to reopen
    const reopenId = location.state?.reopenMovieId || sessionStorage.getItem('stackly_reopen_movie_id');
    const savedScrollY = location.state?.scrollY ?? sessionStorage.getItem('stackly_scroll_y');

    if (reopenId && isKnownRoute) {
      const targetMovie = movies.find((m) => m.id === reopenId);
      if (targetMovie) {
        setSelectedMovie(targetMovie);
        setIsModalOpen(true);
      }
      if (savedScrollY !== null && savedScrollY !== undefined) {
        setTimeout(() => {
          window.scrollTo({ top: Number(savedScrollY), behavior: 'instant' });
        }, 50);
      }
      sessionStorage.removeItem('stackly_reopen_movie_id');
      sessionStorage.removeItem('stackly_scroll_y');
    }
  }, [location, isKnownRoute]);

  // Initial cinematic entrance loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (initialLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="app-container">
      {/* Toast Notifications */}
      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
      />

      {/* Navbar: Only shown on regular valid pages */}
      {isKnownRoute && <Navbar favouritesCount={count} />}

      {/* Main Content Router */}
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                isFavourite={isFavourite}
                onToggleFavourite={toggleFavourite}
                onSelectMovie={handleSelectMovie}
              />
            }
          />
          <Route
            path="/explore"
            element={
              <ExploreMovies
                isFavourite={isFavourite}
                onToggleFavourite={toggleFavourite}
                onSelectMovie={handleSelectMovie}
              />
            }
          />
          <Route
            path="/favourites"
            element={
              <Favourites
                favouriteIds={favouriteIds}
                isFavourite={isFavourite}
                onToggleFavourite={toggleFavourite}
                onSelectMovie={handleSelectMovie}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Movie Details Modal */}
      <MovieDetailsModal
        movie={selectedMovie}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        isFavourite={isFavourite}
        onToggleFavourite={toggleFavourite}
      />

      {/* Global Footer: Only shown on regular valid pages */}
      {isKnownRoute && <Footer />}
    </div>
  );
}
