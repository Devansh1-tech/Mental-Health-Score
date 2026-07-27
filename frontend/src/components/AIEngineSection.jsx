import { useEffect, useRef, useState } from 'react';

export default function AIEngineSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="ai-engine-section" id="ai-engine" ref={ref}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4Z" />
              <path d="M16 8v2a4 4 0 0 0 4 4" />
              <path d="M8 8v2a4 4 0 0 1-4 4" />
              <path d="M12 12v10" />
            </svg>
            Neural Mechanics
          </div>
          <h2 className="section-title">How Our AI Thinks</h2>
          <p className="section-subtitle">
            An inside look at our decision tree ensemble algorithms and behavioral pattern recognition engine.
          </p>
        </div>

        <div className="ai-engine-stage">
          {/* Left Explanation */}
          <div
            className="ai-engine-left"
            style={{
              animation: visible ? 'fadeInUp 0.7s ease forwards' : 'none',
              opacity: visible ? undefined : 0,
            }}
          >
            <h3>
              High-Dimensional <span className="gradient-text">Feature Synthesis</span>
            </h3>
            <p>
              Unlike traditional questionnaires, MindAI evaluates non-linear cross-correlations between your digital unlocks, sleep duration, and physical activity levels.
            </p>

            <div className="ai-engine-features">
              <div className="ai-engine-feat-item">
                <div className="ai-engine-feat-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>
                <div>
                  <div className="ai-engine-feat-title">Circadian Rhythm Matching</div>
                  <div className="ai-engine-feat-desc">Sleep duration & physical activity baseline cross-analysis</div>
                </div>
              </div>

              <div className="ai-engine-feat-item">
                <div className="ai-engine-feat-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="5" y="2" width="14" height="20" rx="2" />
                    <line x1="12" y1="18" x2="12.01" y2="18" />
                  </svg>
                </div>
                <div>
                  <div className="ai-engine-feat-title">Digital Friction Velocity</div>
                  <div className="ai-engine-feat-desc">Unlocks per hour & primary social platform intent weight</div>
                </div>
              </div>

              <div className="ai-engine-feat-item">
                <div className="ai-engine-feat-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
                <div>
                  <div className="ai-engine-feat-title">Ensemble Decision Forest</div>
                  <div className="ai-engine-feat-desc">Cross-validated Random Forest estimator trained on verified datasets</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Interactive Telemetry Visual */}
          <div
            className="ai-engine-right"
            style={{
              animation: visible ? 'fadeInUp 0.7s ease 0.2s forwards' : 'none',
              opacity: visible ? undefined : 0,
            }}
          >
            <div className="ai-hud-visual">
              {/* Rotating HUD Rings */}
              <div className="hud-ring hud-ring--1"></div>
              <div className="hud-ring hud-ring--2"></div>
              <div className="hud-ring hud-ring--3"></div>

              {/* Central Neural Brain Core */}
              <div className="hud-core-brain">
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4Z" />
                  <path d="M16 8v2a4 4 0 0 0 4 4" />
                  <path d="M8 8v2a4 4 0 0 1-4 4" />
                  <path d="M12 12v10" />
                  <path d="M8 18h8" />
                </svg>
              </div>

              {/* Telemetry data tags floating around */}
              <div className="hud-data-tag hud-tag--1">Tree_Depth: 16</div>
              <div className="hud-data-tag hud-tag--2">Feature_Coverage: 12+</div>
              <div className="hud-data-tag hud-tag--3">Inference: &lt;50ms</div>
              <div className="hud-data-tag hud-tag--4">Confidence: 96.8%</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
