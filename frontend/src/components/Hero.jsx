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
          const startTime = performance.now();

          const step = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(end * eased);
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
  const heroRef = useRef(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Subtle 3D tilt calculations
    const rotateX = -(y / rect.height) * 15;
    const rotateY = (x / rect.width) * 15;
    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

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
    <section
      className="hero"
      id="hero"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Ambient background mesh & blobs */}
      <div className="hero-blobs">
        <div className="hero-blob hero-blob--1"></div>
        <div className="hero-blob hero-blob--2"></div>
        <div className="hero-blob hero-blob--3"></div>
      </div>

      {/* Floating neural particles */}
      <div className="hero-particles">
        {Array.from({ length: 10 }).map((_, i) => (
          <span className="hero-particle" key={i}></span>
        ))}
      </div>

      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              <span className="hero-badge-dot"></span>
              Clinical-Grade Neural Intelligence
            </div>

            <h1 className="hero-title">
              <span className="gradient-text">AI-Driven Mental Health</span>
              <br />
              Intelligence
            </h1>

            <p className="hero-description">
              Understand your digital behaviour, lifestyle and wellness through intelligent AI analysis.
            </p>

            <div className="hero-actions">
              <a
                href="#prediction"
                className="btn-primary"
                onClick={handleRipple}
              >
                Start Assessment <span className="btn-arrow">→</span>
              </a>
              <a href="#demo" className="hero-btn-secondary">
                Watch AI Demo
              </a>
            </div>

            <div className="hero-stats">
              <div className="hero-stat">
                <div className="hero-stat-number">
                  <AnimatedCounter target={12} suffix="+" />
                </div>
                <div className="hero-stat-label">Neural Signals</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-number">
                  <AnimatedCounter target={95} suffix="%" />
                </div>
                <div className="hero-stat-label">Model Precision</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-number">
                  Instant
                </div>
                <div className="hero-stat-label">Inference Engine</div>
              </div>
            </div>
          </div>

          <div className="hero-illustration">
            <div
              className="hero-video-container"
              style={{
                transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
              }}
            >
              {/* Soft emerald radial glow behind brain */}
              <div className="hero-video-glow"></div>

              {/* Free Floating AI Brain Video */}
              <video
                className="hero-video"
                autoPlay
                loop
                muted
                playsInline
                disablePictureInPicture
              >
                <source src="/assets/ai-brain.mp4" type="video/mp4" />
              </video>

              {/* Floor ambient blur reflection */}
              <div className="hero-video-blur"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
