import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Home, Film } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoBack = () => {
    // If standard browser history is available, window.history.back() restores native exact scroll & place!
    if (window.history.length > 1) {
      window.history.back();
    } else {
      const returnPath = location.state?.from || sessionStorage.getItem('stackly_return_path') || '/';
      const reopenMovieId = location.state?.reopenMovieId || sessionStorage.getItem('stackly_reopen_movie_id');
      const scrollY = location.state?.scrollY ?? sessionStorage.getItem('stackly_scroll_y');

      navigate(returnPath, {
        state: {
          reopenMovieId: reopenMovieId,
          scrollY: scrollY ? Number(scrollY) : 0
        }
      });
    }
  };

  const handleGoHome = () => {
    // Clear any modal restore session so it takes the user cleanly to Home page
    sessionStorage.removeItem('stackly_reopen_movie_id');
    sessionStorage.removeItem('stackly_return_path');
    navigate('/', { replace: true });
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '2rem',
      backgroundColor: '#08090D',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background ambient glow */}
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(229, 9, 58, 0.12) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        {/* Brand mark */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <img
            src="/images/stackly-logo.webp"
            alt="STACKLY"
            style={{
              height: '42px',
              width: 'auto',
              display: 'block',
              objectFit: 'contain'
            }}
          />
        </div>

        {/* Big 404 Display */}
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(5.5rem, 15vw, 9.5rem)',
          fontWeight: 900,
          color: 'transparent',
          WebkitTextStroke: '2.5px rgba(229, 9, 58, 0.85)',
          lineHeight: 1,
          marginBottom: '1rem',
          textShadow: '0 0 50px rgba(229, 9, 58, 0.3)'
        }}>
          404
        </div>

        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.75rem, 4vw, 2.3rem)',
          fontWeight: 800,
          marginBottom: '1rem',
          color: '#FFFFFF'
        }}>
          Scene Not Found
        </h2>

        <p style={{
          color: 'var(--text-secondary)',
          maxWidth: '460px',
          margin: '0 auto 2.5rem auto',
          fontSize: '1rem',
          lineHeight: 1.6
        }}>
          The reel you are looking for does not exist or has been cut from the final release.
        </p>

        {/* Action Buttons: Go back & Go to Home */}
        <div style={{
          display: 'flex',
          gap: '1.25rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          {/* Go back button */}
          <button
            onClick={handleGoBack}
            className="btn-primary"
            style={{
              padding: '0.85rem 2rem',
              fontSize: '0.98rem'
            }}
          >
            <ArrowLeft size={18} />
            <span>Go back</span>
          </button>

          {/* Go to Home button */}
          <button
            onClick={handleGoHome}
            className="btn-secondary"
            style={{
              padding: '0.85rem 2rem',
              fontSize: '0.98rem'
            }}
          >
            <Home size={18} />
            <span>Go to Home</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
