import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Film, Heart, Compass, Search, Menu, X, Play } from 'lucide-react';
import '../styles/navbar.css';

export default function Navbar({ favouritesCount = 0 }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleSearchClick = () => {
    navigate('/explore');
  };

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        {/* STACKLY Logo */}
        <Link to="/" className="brand-logo" onClick={() => setMobileMenuOpen(false)} style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="/images/stackly-logo.webp"
            alt="STACKLY"
            style={{
              height: '38px',
              width: 'auto',
              display: 'block',
              objectFit: 'contain'
            }}
          />
        </Link>

        {/* Desktop Nav Links */}
        <nav>
          <ul className="nav-links">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                end
              >
                {({ isActive }) => (
                  <>
                    <span>Home</span>
                    {isActive && <span className="active-pill-dot" />}
                  </>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/explore"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                {({ isActive }) => (
                  <>
                    <span>Explore Movies</span>
                    {isActive && <span className="active-pill-dot" />}
                  </>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/favourites"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                {({ isActive }) => (
                  <>
                    <span>Favourites</span>
                    {favouritesCount > 0 && (
                      <span className="fav-badge-count">{favouritesCount}</span>
                    )}
                    {isActive && <span className="active-pill-dot" />}
                  </>
                )}
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Right Nav Actions */}
        <div className="nav-actions">
          <button
            className="nav-search-btn"
            onClick={handleSearchClick}
            aria-label="Search movies"
            title="Explore & Search"
          >
            <Search size={18} />
          </button>

          <button
            className="hamburger-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <NavLink
            to="/"
            className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
            end
          >
            <span>Home</span>
            <Film size={17} />
          </NavLink>
          <NavLink
            to="/explore"
            className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span>Explore Movies</span>
            <Compass size={17} />
          </NavLink>
          <NavLink
            to="/favourites"
            className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span>Favourites</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {favouritesCount > 0 && (
                <span className="fav-badge-count">{favouritesCount}</span>
              )}
              <Heart size={17} />
            </div>
          </NavLink>
        </div>
      )}
    </header>
  );
}
