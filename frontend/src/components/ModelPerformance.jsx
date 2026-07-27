import { useEffect, useRef, useState } from 'react';

function CircularMetric({ value, max = 100, label, sublabel, displayValue, duration = 2000 }) {
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);
  const counted = useRef(false);
  const radius = 50;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          const end = parseFloat(value);
          const startTime = performance.now();

          const step = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCurrent(eased * end);
            if (progress < 1) requestAnimationFrame(step);
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration]);

  const percentage = (current / max) * 100;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="perf-metric-card" ref={ref}>
      <div className="perf-circle">
        <svg viewBox="0 0 120 120">
          <circle
            className="perf-circle-bg"
            cx="60"
            cy="60"
            r={radius}
          />
          <circle
            className="perf-circle-fill"
            cx="60"
            cy="60"
            r={radius}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
          <defs>
            <linearGradient id="perfGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#059669" />
              <stop offset="100%" stopColor="#34D399" />
            </linearGradient>
          </defs>
        </svg>
        <div className="perf-circle-center">
          <div className="perf-circle-value">
            {displayValue ? displayValue : Math.round(current)}
          </div>
        </div>
      </div>
      <div className="perf-metric-label">{label}</div>
      <div className="perf-metric-sublabel">{sublabel}</div>
    </div>
  );
}

export default function ModelPerformance() {
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
    <section className="model-perf-section" id="model-performance" ref={ref}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
            Benchmarks
          </div>
          <h2 className="section-title">Model Performance</h2>
          <p className="section-subtitle">
            Rigorously validated on real behavioral datasets to ensure industry-leading clinical precision.
          </p>
        </div>

        <div
          className="model-perf-grid"
          style={{
            animation: visible ? 'fadeInUp 0.7s ease forwards' : 'none',
            opacity: visible ? undefined : 0,
          }}
        >
          <CircularMetric
            value={95}
            max={100}
            label="Accuracy"
            sublabel="Cross-Validated ML"
            displayValue="95%"
          />
          <CircularMetric
            value={100}
            max={100}
            label="Prediction Time"
            sublabel="Real-time Inference"
            displayValue="<1s"
          />
          <CircularMetric
            value={12}
            max={15}
            label="Input Features"
            sublabel="Behavioral Signals"
            displayValue="12+"
          />
          <CircularMetric
            value={99}
            max={100}
            label="Model Engine"
            sublabel="Scikit-Learn Ensemble"
            displayValue="ML"
          />
        </div>
      </div>
    </section>
  );
}
