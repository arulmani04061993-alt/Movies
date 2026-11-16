import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Compass,
  Flame,
  Award,
  Clock,
  Sparkles,
  Send,
  Clapperboard,
  ChevronRight,
  Tv,
  Film,
  Users,
  Check,
  Zap,
  Crown,
  MonitorPlay
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import MovieCarousel from '../components/MovieCarousel';
import MovieCard from '../components/MovieCard';
import { movies, GENRES } from '../data/movies';
import { toast } from 'react-toastify';
import '../styles/home.css';

export default function Home({
  isFavourite,
  onToggleFavourite,
  onSelectMovie
}) {
  const navigate = useNavigate();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'yearly'

  // Slices of movies for various sections
  const heroMovies = movies.filter((m) => m.isFeaturedHero || ['interstellar', 'oppenheimer', 'dune-part-two', 'the-dark-knight', 'the-shawshank-redemption'].includes(m.id));
  const trendingMovies = movies.filter((m) => m.isTrending);
  const popularMovies = movies.filter((m) => m.isPopular).slice(0, 8);
  const topRatedMovies = [...movies].sort((a, b) => b.rating - a.rating).slice(0, 8);
  const recentReleases = [...movies].sort((a, b) => b.releaseYear - a.releaseYear).slice(0, 8);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    // Save return path & exact scroll position so 404 "Go back" restores right here
    sessionStorage.setItem('stackly_return_path', window.location.pathname);
    sessionStorage.setItem('stackly_scroll_y', String(window.scrollY || 0));

    navigate(`/premiere/subscribe?email=${encodeURIComponent(newsletterEmail)}`, {
      state: {
        from: window.location.pathname,
        scrollY: window.scrollY || 0
      }
    });
  };

  const handleGenreClick = (genre) => {
    navigate(`/explore?genre=${encodeURIComponent(genre)}`);
  };

  const handlePlanSelect = (planName) => {
    // Record return path and scroll position so 404 "Go back" restores exact pricing section
    sessionStorage.setItem('stackly_return_path', window.location.pathname);
    sessionStorage.setItem('stackly_scroll_y', String(window.scrollY || 0));

    navigate(`/checkout/${planName.toLowerCase().replace(/\s+/g, '-')}`, {
      state: {
        from: window.location.pathname,
        scrollY: window.scrollY || 0
      }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* 1. HERO SECTION WITH AUTOMATIC CONTINUOUS SLIDESHOW */}
      <HeroSection movies={heroMovies} onSelectMovie={onSelectMovie} autoPlayInterval={3500} />

      {/* 2. LIVE STATIC STATS & COMMUNITY COUNTERS */}
      <section style={{ backgroundColor: '#0A0C13', padding: '3.5rem 0 1rem 0' }}>
        <div className="container">
          <div className="stats-banner-grid">
            <div className="stat-item">
              <div className="stat-icon-wrap">
                <Film size={24} />
              </div>
              <div>
                <div className="stat-number">10,000+</div>
                <div className="stat-label">Ultra 4K UHD Mastered Titles</div>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-icon-wrap" style={{ background: 'rgba(255, 181, 71, 0.12)', borderColor: 'rgba(255, 181, 71, 0.35)', color: '#FFB547' }}>
                <Award size={24} />
              </div>
              <div>
                <div className="stat-number">850+</div>
                <div className="stat-label">Oscar & Palme d'Or Winners</div>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-icon-wrap" style={{ background: 'rgba(74, 222, 128, 0.12)', borderColor: 'rgba(74, 222, 128, 0.35)', color: '#4ADE80' }}>
                <Users size={24} />
              </div>
              <div>
                <div className="stat-number">4.8M</div>
                <div className="stat-label">Active Global Cinephiles</div>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-icon-wrap" style={{ background: 'rgba(56, 189, 248, 0.12)', borderColor: 'rgba(56, 189, 248, 0.35)', color: '#38BDF8' }}>
                <Tv size={24} />
              </div>
              <div>
                <div className="stat-number">Zero Ads</div>
                <div className="stat-label">Pure Uninterrupted Luxury</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TRENDING MOVIES (CAROUSEL WITH NUMBERS) */}
      <section className="home-section">
        <div className="container">
          <MovieCarousel
            title="Trending Now"
            subtitle="The most-watched and highly discussed films across the globe today"
            movies={trendingMovies}
            isFavourite={isFavourite}
            onToggleFavourite={onToggleFavourite}
            onSelectMovie={onSelectMovie}
            showTrendingRank={true}
            carouselId="trending"
          />
        </div>
      </section>

      {/* 4. DISCOVER BY GENRE TILES */}
      <section className="home-section alt-bg">
        <div className="container">
          <div className="section-title-wrap">
            <div>
              <div className="section-tag">
                <Sparkles size={14} />
                <span>Categories</span>
              </div>
              <h2 className="section-title">Discover By Genre</h2>
              <p className="section-subtitle">
                Dive straight into your favourite cinematic categories and moods
              </p>
            </div>
            <Link to="/explore" className="btn-secondary">
              <span>View All Categories</span>
              <ChevronRight size={16} />
            </Link>
          </div>

          <div className="genre-grid">
            {GENRES.filter((g) => g !== 'All').slice(0, 6).map((genre) => {
              const genreCount = movies.filter((m) => m.genre === genre).length;
              return (
                <div
                  key={genre}
                  className="genre-pill-card"
                  onClick={() => handleGenreClick(genre)}
                >
                  <div className="genre-icon-wrap">
                    <Clapperboard size={22} />
                  </div>
                  <div className="genre-pill-name">{genre}</div>
                  <div className="genre-pill-count">{genreCount} Masterpieces</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. POPULAR MOVIES GRID */}
      <section className="home-section">
        <div className="container">
          <div className="section-title-wrap">
            <div>
              <div className="section-tag">
                <Flame size={14} />
                <span>Fan Favourites</span>
              </div>
              <h2 className="section-title">Popular Movies</h2>
              <p className="section-subtitle">
                Films that captivated worldwide audiences and dominated the box office
              </p>
            </div>
            <Link to="/explore" className="btn-secondary">
              <span>Explore All</span>
              <ChevronRight size={16} />
            </Link>
          </div>

          <div className="home-movies-grid">
            {popularMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                isFavourite={isFavourite?.(movie.id)}
                onToggleFavourite={onToggleFavourite}
                onSelectMovie={onSelectMovie}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. TOP RATED MOVIES (CAROUSEL) */}
      <section className="home-section alt-bg">
        <div className="container">
          <MovieCarousel
            title="Top Rated Masterpieces"
            subtitle="The highest critically rated films in cinematic history"
            movies={topRatedMovies}
            isFavourite={isFavourite}
            onToggleFavourite={onToggleFavourite}
            onSelectMovie={onSelectMovie}
            showTrendingRank={false}
            carouselId="top-rated"
          />
        </div>
      </section>

      {/* 7. PREMIUM CINEMATIC PRICING & MEMBERSHIP TIERS */}
      <section className="home-section" id="membership-plans" style={{ backgroundColor: '#090B10' }}>
        <div className="container pricing-section-container">
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto' }}>
            <div className="section-tag" style={{ justifyContent: 'center' }}>
              <Crown size={15} />
              <span>STACKLY PASS</span>
            </div>
            <h2 className="section-title" style={{ fontSize: 'clamp(2.1rem, 4vw, 2.9rem)', marginBottom: '0.75rem' }}>
              Premium Cinematic Memberships
            </h2>
            <p className="section-subtitle">
              Choose an experience curated for real film purists. Enjoy lossless Dolby Vision HDR, spatial audio, and unlimited cinematic vault access.
            </p>

            {/* Monthly / Yearly Billing Toggle */}
            <div style={{ marginTop: '2rem' }}>
              <div className="pricing-toggle-wrap">
                <button
                  className={`pricing-toggle-btn ${billingCycle === 'monthly' ? 'active' : ''}`}
                  onClick={() => setBillingCycle('monthly')}
                >
                  Monthly Billing
                </button>
                <button
                  className={`pricing-toggle-btn ${billingCycle === 'yearly' ? 'active' : ''}`}
                  onClick={() => setBillingCycle('yearly')}
                >
                  Annual Pass (Save 20%)
                </button>
              </div>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="pricing-cards-grid">
            {/* 1. Standard Cinema */}
            <div className="pricing-card">
              <div className="pricing-hero-thumb">
                <img
                  src="/images/pricing/standard-tier.webp"
                  alt="Standard Cinema Plan"
                  loading="lazy"
                />
                <div className="pricing-thumb-overlay" />
              </div>
              <div className="pricing-card-body">
                <h3 className="pricing-plan-title">Standard Cinema</h3>
                <p className="pricing-plan-subtitle">Perfect for everyday film lovers seeking high quality streaming.</p>

                <div className="pricing-price-wrap">
                  <span className="pricing-amount">
                    {billingCycle === 'monthly' ? '$8.99' : '$84'}
                  </span>
                  <span className="pricing-period">
                    /{billingCycle === 'monthly' ? 'month' : 'year'}
                  </span>
                </div>

                <ul className="pricing-features-list">
                  <li className="pricing-feature-item">
                    <Check size={18} className="pricing-check-icon" />
                    <span>Full HD 1080p Resolution</span>
                  </li>
                  <li className="pricing-feature-item">
                    <Check size={18} className="pricing-check-icon" />
                    <span>Stream on 2 screens simultaneously</span>
                  </li>
                  <li className="pricing-feature-item">
                    <Check size={18} className="pricing-check-icon" />
                    <span>Unlimited movie library browsing</span>
                  </li>
                  <li className="pricing-feature-item">
                    <Check size={18} className="pricing-check-icon" />
                    <span>Ad-free cinema experience</span>
                  </li>
                  <li className="pricing-feature-item">
                    <Check size={18} className="pricing-check-icon" />
                    <span>Standard Stereo & 5.1 Surround</span>
                  </li>
                </ul>

                <button
                  className="pricing-cta-btn pricing-btn-outline"
                  onClick={() => handlePlanSelect('Standard')}
                >
                  <span>Select Standard</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* 2. Premium VIP (Featured & Most Popular) */}
            <div className="pricing-card featured">
              <div className="pricing-popular-badge">MOST POPULAR</div>
              <div className="pricing-hero-thumb">
                <img
                  src="/images/pricing/premium-vip.webp"
                  alt="Premium VIP Plan"
                  loading="lazy"
                />
                <div className="pricing-thumb-overlay" />
              </div>
              <div className="pricing-card-body">
                <h3 className="pricing-plan-title">Premium VIP</h3>
                <p className="pricing-plan-subtitle">Our flagship cinematic experience with 4K HDR and spatial sound.</p>

                <div className="pricing-price-wrap">
                  <span className="pricing-amount" style={{ color: '#FF1744' }}>
                    {billingCycle === 'monthly' ? '$14.99' : '$140'}
                  </span>
                  <span className="pricing-period">
                    /{billingCycle === 'monthly' ? 'month' : 'year'}
                  </span>
                </div>

                <ul className="pricing-features-list">
                  <li className="pricing-feature-item">
                    <Check size={18} className="pricing-check-icon" />
                    <strong style={{ color: '#fff' }}>Ultra 4K UHD + HDR10+ & Dolby Vision</strong>
                  </li>
                  <li className="pricing-feature-item">
                    <Check size={18} className="pricing-check-icon" />
                    <span>Stream on 4 screens simultaneously</span>
                  </li>
                  <li className="pricing-feature-item">
                    <Check size={18} className="pricing-check-icon" />
                    <span>Dolby Atmos Spatial Audio 7.1</span>
                  </li>
                  <li className="pricing-feature-item">
                    <Check size={18} className="pricing-check-icon" />
                    <span>Offline downloads for mobile & tablet</span>
                  </li>
                  <li className="pricing-feature-item">
                    <Check size={18} className="pricing-check-icon" />
                    <span>Early Premiere Access & Director Cuts</span>
                  </li>
                </ul>

                <button
                  className="pricing-cta-btn pricing-btn-primary"
                  onClick={() => handlePlanSelect('Premium VIP')}
                >
                  <Zap size={17} fill="#FFFFFF" />
                  <span>Get Premium VIP</span>
                </button>
              </div>
            </div>

            {/* 3. Ultimate IMAX Cinephile */}
            <div className="pricing-card">
              <div className="pricing-hero-thumb">
                <img
                  src="/images/pricing/ultimate-imax.webp"
                  alt="Ultimate IMAX Plan"
                  loading="lazy"
                />
                <div className="pricing-thumb-overlay" />
              </div>
              <div className="pricing-card-body">
                <h3 className="pricing-plan-title">Ultimate IMAX</h3>
                <p className="pricing-plan-subtitle">Designed for home theater connoisseurs who demand master-quality bitrate.</p>

                <div className="pricing-price-wrap">
                  <span className="pricing-amount">
                    {billingCycle === 'monthly' ? '$24.99' : '$230'}
                  </span>
                  <span className="pricing-period">
                    /{billingCycle === 'monthly' ? 'month' : 'year'}
                  </span>
                </div>

                <ul className="pricing-features-list">
                  <li className="pricing-feature-item">
                    <Check size={18} className="pricing-check-icon" />
                    <strong style={{ color: '#fff' }}>IMAX Enhanced Aspect Ratio & Bitrate</strong>
                  </li>
                  <li className="pricing-feature-item">
                    <Check size={18} className="pricing-check-icon" />
                    <span>Unlimited screens & family vault sharing</span>
                  </li>
                  <li className="pricing-feature-item">
                    <Check size={18} className="pricing-check-icon" />
                    <span>DTS:X & Uncompressed Studio Master Audio</span>
                  </li>
                  <li className="pricing-feature-item">
                    <Check size={18} className="pricing-check-icon" />
                    <span>Exclusive invitation to Cannes/Venice premieres</span>
                  </li>
                  <li className="pricing-feature-item">
                    <Check size={18} className="pricing-check-icon" />
                    <span>VIP 24/7 dedicated cinema curator support</span>
                  </li>
                </ul>

                <button
                  className="pricing-cta-btn pricing-btn-outline"
                  onClick={() => handlePlanSelect('Ultimate IMAX')}
                >
                  <span>Select Ultimate IMAX</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. RECENTLY RELEASED MOVIES */}
      <section className="home-section alt-bg">
        <div className="container">
          <div className="section-title-wrap">
            <div>
              <div className="section-tag">
                <Clock size={14} />
                <span>Modern Era</span>
              </div>
              <h2 className="section-title">Recently Released Movies</h2>
              <p className="section-subtitle">
                New wave contemporary films that redefine modern filmmaking
              </p>
            </div>
            <button
              onClick={() => {
                sessionStorage.setItem('stackly_return_path', window.location.pathname);
                sessionStorage.setItem('stackly_scroll_y', String(window.scrollY || 0));
                navigate('/movies/recent-releases', {
                  state: {
                    from: window.location.pathname,
                    scrollY: window.scrollY || 0
                  }
                });
              }}
              className="btn-secondary"
            >
              <span>View More</span>
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="home-movies-grid">
            {recentReleases.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                isFavourite={isFavourite?.(movie.id)}
                onToggleFavourite={onToggleFavourite}
                onSelectMovie={onSelectMovie}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 9. PROMINENT CTA BANNER: EXPLORE FULL LIBRARY */}
      <section className="home-section" style={{ paddingTop: '1rem', paddingBottom: '3rem' }}>
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, #171A24 0%, #0E1018 100%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 'var(--radius-lg)',
            padding: '3.5rem 2rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem'
          }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
              fontWeight: 800
            }}>
              Ready To Discover More Great Cinema?
            </h2>
            <p style={{
              color: 'var(--text-secondary)',
              maxWidth: '550px',
              fontSize: '1.05rem',
              lineHeight: 1.6
            }}>
              Browse the complete STACKLY cinematic repository with instant title filtering, custom genre selection, release year sort, and IMDb rating thresholds.
            </p>
            <Link to="/explore" className="btn-primary cta-explore-btn">
              <span>Explore Complete Movie Catalog</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 10. NEWSLETTER / VIP CLUB BANNER */}
      <section className="home-section" style={{ paddingTop: '0' }}>
        <div className="container">
          <div className="vip-banner">
            <div className="vip-content">
              <h3>Join STACKLY Premiere Club</h3>
              <p>
                Get curated weekly director spotlights, secret cinema recommendations, and festival winners sent directly to your inbox.
              </p>
            </div>
            <form className="vip-form" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                placeholder="Enter your email address..."
                className="vip-input"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn-primary">
                <Send size={16} />
                <span>Join Premiere</span>
              </button>
            </form>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
