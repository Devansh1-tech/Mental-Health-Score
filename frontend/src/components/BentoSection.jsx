import { useEffect, useRef, useState } from 'react';

export default function BentoSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bento-section" id="bento" ref={ref}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18" />
              <path d="M9 21V9" />
            </svg>
            Platform Pillars
          </div>
          <h2 className="section-title">Why MindAI</h2>
          <p className="section-subtitle">
            Designed to bridge the gap between behavioral analytics, clinical accuracy, and personal privacy.
          </p>
        </div>

        <div
          className="bento-grid"
          style={{
            animation: visible ? 'fadeInUp 0.8s ease forwards' : 'none',
            opacity: visible ? undefined : 0,
          }}
        >
          {/* Card 1: Large Featured Card - AI Powered */}
          <div className="bento-card bento-card--large">
            <div>
              <div className="bento-card-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4Z" />
                  <path d="M16 8v2a4 4 0 0 0 4 4" />
                  <path d="M8 8v2a4 4 0 0 1-4 4" />
                  <path d="M12 12v10" />
                  <path d="M8 18h8" />
                </svg>
              </div>
              <h3 className="bento-card-title">AI-Powered Neural Architecture</h3>
              <p className="bento-card-desc">
                Built on ensemble Random Forest algorithms trained on verified student behavioral datasets. Our model decodes how your digital unlocks, sleep duration, and study routines impact your mental wellbeing.
              </p>
            </div>
            <div className="bento-badge">
              <span>🧠 95% Model Accuracy</span>
            </div>
          </div>

          {/* Card 2: Privacy First */}
          <div className="bento-card">
            <div className="bento-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <h3 className="bento-card-title">Privacy First</h3>
            <p className="bento-card-desc">
              Zero server logging or data persistence. Inputs process ephemerally during your live session.
            </p>
          </div>

          {/* Card 3: Medical Grade Intelligence */}
          <div className="bento-card">
            <div className="bento-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <h3 className="bento-card-title">Medical-Grade Intelligence</h3>
            <p className="bento-card-desc">
              Cross-validated score boundaries benchmarked against clinical wellness indices.
            </p>
          </div>

          {/* Card 4: Instant Results */}
          <div className="bento-card">
            <div className="bento-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
            <h3 className="bento-card-title">Sub-second Results</h3>
            <p className="bento-card-desc">
              Optimized FastAPI REST inference returning predictions in under 50ms.
            </p>
          </div>

          {/* Card 5: Explainable AI */}
          <div className="bento-card">
            <div className="bento-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
            </div>
            <h3 className="bento-card-title">Explainable AI</h3>
            <p className="bento-card-desc">
              Transparent score breakdowns showing which daily habits affect your rating most.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
