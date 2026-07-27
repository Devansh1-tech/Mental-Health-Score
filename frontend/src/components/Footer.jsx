export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer-card glass-card">
          {/* Main Footer Content Grid */}
          <div className="footer-grid">
            {/* Brand Column */}
            <div className="footer-brand">
              <div className="footer-logo">
                <div className="footer-logo-badge">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4Z" />
                    <path d="M16 8v2a4 4 0 0 0 4 4" />
                    <path d="M8 8v2a4 4 0 0 1-4 4" />
                    <path d="M12 12v10" />
                  </svg>
                </div>
                <span className="footer-logo-text">MindAI</span>
              </div>
              <p className="footer-desc">
                Next-generation mental health analytics powered by ensemble machine learning. Privacy-first behavioral scoring for individuals and researchers.
              </p>
              <div className="footer-status">
                <span className="status-dot"></span>
                <span>All Systems Operational • Inference 42ms</span>
              </div>
            </div>

            {/* Column 1: Navigation */}
            <div className="footer-col">
              <h4 className="footer-col-title">Navigation</h4>
              <ul className="footer-links">
                <li><a href="#hero">Home</a></li>
                <li><a href="#pipeline">How It Works</a></li>
                <li><a href="#prediction">Prediction Engine</a></li>
                <li><a href="#model-performance">Benchmarks</a></li>
                <li><a href="#faq">FAQ</a></li>
              </ul>
            </div>

            {/* Column 2: Resources */}
            <div className="footer-col">
              <h4 className="footer-col-title">Resources</h4>
              <ul className="footer-links">
                <li><a href="#bento">Documentation</a></li>
                <li><a href="#model-performance">Model Metrics</a></li>
                <li><a href="#live-demo">Dataset Insights</a></li>
                <li><a href="#professional-perspective">Clinical Research Paper</a></li>
              </ul>
            </div>

            {/* Column 3: Connect */}
            <div className="footer-col">
              <h4 className="footer-col-title">Connect</h4>
              <ul className="footer-links footer-connect-links">
                <li>
                  <a href="https://github.com/Devansh1-tech" target="_blank" rel="noopener noreferrer">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/public-profile/settings?trk=d_flagship3_profile_self_view_public_profile" target="_blank" rel="noopener noreferrer">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                    </svg>
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="mailto:contact@mindai.health">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="4" width="20" height="16" rx="2"/>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                    Email Us
                  </a>
                </li>
                <li>
                  <a href="https://devansh1-tech.github.io" target="_blank" rel="noopener noreferrer">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="2" y1="12" x2="22" y2="12"/>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                    </svg>
                    Portfolio
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Technology Badges Row */}
          <div className="footer-tech-row">
            <span className="tech-label">Built with</span>
            <div className="tech-badges">
              <span className="tech-badge">
                <span className="tech-icon">⚛️</span> React
              </span>
              <span className="tech-badge">
                <span className="tech-icon">⚡</span> FastAPI
              </span>
              <span className="tech-badge">
                <span className="tech-icon">🐍</span> Scikit-Learn
              </span>
              <span className="tech-badge">
                <span className="tech-icon">✨</span> Gemini AI
              </span>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="footer-bottom-row">
            <div className="footer-copyright">
              © {year} MindAI Inc. All rights reserved. Designed for Next-Gen Healthcare.
            </div>
            <div className="footer-legal">
              <a href="#privacy">Privacy Policy</a>
              <span className="legal-dot">•</span>
              <a href="#disclaimer">Disclaimer</a>
              <span className="legal-dot">•</span>
              <a href="#terms">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
