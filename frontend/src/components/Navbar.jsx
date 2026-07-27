import { useState, useEffect, useRef } from 'react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastScroll = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrolled(currentScroll > 40);

      if (currentScroll > lastScroll.current && currentScroll > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      lastScroll.current = currentScroll;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  const navClass = [
    'navbar',
    hidden ? 'navbar--hidden' : '',
    scrolled ? 'navbar--scrolled' : '',
  ].filter(Boolean).join(' ');

  return (
    <nav className={navClass} id="nav">
      <div className="navbar-content">
        <a href="#" className="navbar-logo" onClick={handleLinkClick}>
          <div className="navbar-logo-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4Z" />
              <path d="M16 8v2a4 4 0 0 0 4 4" />
              <path d="M8 8v2a4 4 0 0 1-4 4" />
              <path d="M12 12v10" />
              <path d="M8 18h8" />
            </svg>
          </div>
          <span className="navbar-logo-text">MindAI</span>
        </a>

        <ul className={`navbar-links ${mobileOpen ? 'open' : ''}`}>
          <li><a href="#hero" onClick={handleLinkClick}>Home</a></li>
          <li><a href="#how-it-works" onClick={handleLinkClick}>How It Works</a></li>
          <li><a href="#prediction" onClick={handleLinkClick}>Predict</a></li>
          <li><a href="#about" onClick={handleLinkClick}>About</a></li>
          <li><a href="#faq" onClick={handleLinkClick}>FAQ</a></li>
          <li><a href="#footer" onClick={handleLinkClick}>Contact</a></li>
          <li>
            <a href="#prediction" className="navbar-cta" onClick={handleLinkClick}>
              Start Prediction
            </a>
          </li>
        </ul>

        <button
          className={`navbar-mobile-toggle ${mobileOpen ? 'active' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}
