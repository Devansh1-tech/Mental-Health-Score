import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="nav">
      <div className="navbar-content">
        <a href="#" className="navbar-logo" onClick={handleLinkClick}>
          <div className="navbar-logo-icon">🧠</div>
          <span className="navbar-logo-text">MindAI</span>
        </a>

        <ul className={`navbar-links ${mobileOpen ? 'open' : ''}`}>
          <li>
            <a href="#hero" onClick={handleLinkClick}>Home</a>
          </li>
          <li>
            <a href="#how-it-works" onClick={handleLinkClick}>How It Works</a>
          </li>
          <li>
            <a href="#prediction" onClick={handleLinkClick}>Predict</a>
          </li>
          <li>
            <a href="#about" onClick={handleLinkClick}>About</a>
          </li>
          <li>
            <a href="#faq" onClick={handleLinkClick}>FAQ</a>
          </li>
          <li>
            <a
              href="#prediction"
              className="navbar-cta"
              onClick={handleLinkClick}
            >
              Get Started →
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
