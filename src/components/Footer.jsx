import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';

export default function Footer() {
  const navigate = useNavigate();

  const handleFooterNewsletter = (e) => {
    e.preventDefault();
    const input = e.currentTarget.elements.footer_email;
    const val = input ? input.value : '';
    sessionStorage.setItem('stackly_return_path', window.location.pathname);
    sessionStorage.setItem('stackly_scroll_y', String(window.scrollY || 0));
    navigate(`/newsletter?email=${encodeURIComponent(val)}`, {
      state: {
        from: window.location.pathname,
        scrollY: window.scrollY || 0
      }
    });
  };

  const handleCompanyNavigation = (path) => {
    sessionStorage.setItem('stackly_return_path', window.location.pathname);
    sessionStorage.setItem('stackly_scroll_y', String(window.scrollY || 0));
    navigate(path, {
      state: {
        from: window.location.pathname,
        scrollY: window.scrollY || 0
      }
    });
  };

  return (
    <footer style={{
      backgroundColor: '#040508',
      borderTop: '1px solid rgba(255, 255, 255, 0.06)',
      padding: '5rem 0 3rem 0'
    }}>
      <div className="container">
        {/* Main 4-Column Grid exactly matching user UI */}
        <div className="footer-grid">
          {/* Column 1: Brand Logo, Description & Social Icons */}
          <div>
            <Link to="/" style={{
              display: 'inline-flex',
              alignItems: 'center',
              marginBottom: '1.5rem'
            }}>
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
            <p style={{
              color: '#8E94A4',
              fontSize: '0.92rem',
              lineHeight: 1.65,
              maxWidth: '310px',
              marginBottom: '1.75rem'
            }}>
              STACKLY is the world's premier cinematic entertainment portal. Explore critically acclaimed blockbusters, indie marvels, and timeless classics crafted with unmatched visual luxury.
            </p>
            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <Link
                to="/social/instagram"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#8E94A4',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  transition: 'all 0.2s'
                }}
                aria-label="Instagram"
                title="Instagram"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </Link>
              <Link
                to="/social/linkedin"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#8E94A4',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  transition: 'all 0.2s'
                }}
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </Link>
              <Link
                to="/social/youtube"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#8E94A4',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  transition: 'all 0.2s'
                }}
                aria-label="YouTube"
                title="YouTube"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                  <polygon points="10 15 15 12 10 9 10 15" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Column 2: EXPLORE */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1rem',
              fontWeight: 800,
              color: '#FFFFFF',
              marginBottom: '1.5rem',
              textTransform: 'uppercase',
              letterSpacing: '0.08em'
            }}>EXPLORE</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.95rem', fontSize: '0.92rem' }}>
              <li>
                <Link to="/" style={{ color: '#8E94A4', transition: 'color 0.2s' }}>Home</Link>
              </li>
              <li>
                <Link to="/explore" style={{ color: '#8E94A4', transition: 'color 0.2s' }}>Explore Movies</Link>
              </li>
              <li>
                <Link to="/favourites" style={{ color: '#8E94A4', transition: 'color 0.2s' }}>Favourites</Link>
              </li>
              <li>
                <a href="#membership-plans" style={{ color: '#8E94A4', transition: 'color 0.2s' }}>Premium Passes</a>
              </li>
            </ul>
          </div>

          {/* Column 3: COMPANY */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1rem',
              fontWeight: 800,
              color: '#FFFFFF',
              marginBottom: '1.5rem',
              textTransform: 'uppercase',
              letterSpacing: '0.08em'
            }}>COMPANY</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.95rem', fontSize: '0.92rem' }}>
              <li>
                <button
                  type="button"
                  onClick={() => handleCompanyNavigation('/company/about')}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    font: 'inherit',
                    color: '#8E94A4',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#8E94A4'}
                >
                  About Stackly
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCompanyNavigation('/company/contact')}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    font: 'inherit',
                    color: '#8E94A4',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#8E94A4'}
                >
                  Contact
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCompanyNavigation('/company/privacy-policy')}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    font: 'inherit',
                    color: '#8E94A4',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#8E94A4'}
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCompanyNavigation('/company/terms-and-conditions')}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    font: 'inherit',
                    color: '#8E94A4',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#8E94A4'}
                >
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Stay Updated Newsletter matching image */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1rem',
              fontWeight: 800,
              color: '#FFFFFF',
              marginBottom: '1.5rem',
              textTransform: 'uppercase',
              letterSpacing: '0.08em'
            }}>
              Stay Updated
            </h4>
            <p style={{
              color: '#8E94A4',
              fontSize: '0.92rem',
              lineHeight: 1.6,
              marginBottom: '1.5rem'
            }}>
              Subscribe to our newsletter for the latest design updates, creative advice, and studio tips.
            </p>

            <form
              onSubmit={handleFooterNewsletter}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                width: '100%',
                maxWidth: '440px'
              }}
            >
              <input
                type="email"
                name="footer_email"
                placeholder="Email Address"
                required
                style={{
                  flex: '1 1 0%',
                  minWidth: '0',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  padding: '0.85rem 1.25rem',
                  borderRadius: 'var(--radius-full)',
                  color: '#FFFFFF',
                  fontSize: '0.92rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              <button
                type="submit"
                style={{
                  flexShrink: 0,
                  whiteSpace: 'nowrap',
                  background: 'linear-gradient(135deg, #FF5252 0%, #FF334B 100%)',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '0.85rem 1.6rem',
                  borderRadius: 'var(--radius-full)',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 22px rgba(255, 82, 82, 0.45)',
                  transition: 'all 0.25s ease'
                }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          paddingTop: '2.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.88rem',
          color: '#656A7A'
        }}>
          <div>© 2026 STACKLY. All Rights Reserved.</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <span>Crafted for Cinephiles with</span>
            <Heart size={14} color="#E5093A" fill="#E5093A" />
          </div>
        </div>
      </div>
    </footer>
  );
}
