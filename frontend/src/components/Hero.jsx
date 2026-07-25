import { useEffect, useRef, useState } from 'react';

function AnimatedCounter({ target, suffix = '', duration = 2000 }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const counted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          const end = typeof target === 'number' ? target : parseInt(target, 10);
          if (isNaN(end)) {
            setValue(target);
            return;
          }
          const start = 0;
          const startTime = performance.now();

          const step = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(start + (end - start) * eased);
            setValue(current);
            if (progress < 1) requestAnimationFrame(step);
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref}>
      {typeof target === 'number' || !isNaN(parseInt(target, 10))
        ? `${value}${suffix}`
        : target}
    </span>
  );
}

export default function Hero() {
  const handleRipple = (e) => {
    const btn = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    ripple.className = 'ripple';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };

  return (
    <section className="hero" id="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              <span className="hero-badge-dot"></span>
              AI-Powered Prediction Engine
            </div>

            <h1 className="hero-title">
              <span className="gradient-text">AI-Driven Mental</span>
              <br />
              Health Analytics
            </h1>

            <p className="hero-description">
              Harness the power of Machine Learning to predict your mental wellness score.
              Understand how your digital habits, lifestyle, and daily routines shape
              your well-being — in seconds.
            </p>

            <div className="hero-actions">
              <a
                href="#prediction"
                className="btn-primary"
                onClick={handleRipple}
              >
                ✨ Start Prediction <span className="btn-arrow">→</span>
              </a>
              <a href="#how-it-works" className="hero-btn-secondary">
                How It Works
              </a>
            </div>

            <div className="hero-stats">
              <div className="hero-stat">
                <div className="hero-stat-number">
                  <AnimatedCounter target={12} suffix="+" />
                </div>
                <div className="hero-stat-label">Input Features</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-number">
                  <AnimatedCounter target={95} suffix="%" />
                </div>
                <div className="hero-stat-label">Accuracy Rate</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-number">
                  <AnimatedCounter target={0} suffix="" />
                  <span style={{ fontSize: '1.85rem' }}>ms</span>
                </div>
                <div className="hero-stat-label">Instant Results</div>
              </div>
            </div>
          </div>

          <div className="hero-illustration">
            <div className="hero-visual">
              {/* Animated rings */}
              <div className="hero-visual-ring"></div>
              <div className="hero-visual-ring"></div>
              <div className="hero-visual-ring"></div>

              {/* Core orb */}
              <div className="hero-visual-core">
                <div className="hero-visual-brain">🧠</div>
                <div className="hero-visual-label">MIND AI</div>
              </div>

              {/* Orbiting dots */}
              <div className="hero-visual-dot"></div>
              <div className="hero-visual-dot"></div>
              <div className="hero-visual-dot"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
