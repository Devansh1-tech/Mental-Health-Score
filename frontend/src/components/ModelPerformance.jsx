import { useEffect, useRef, useState } from 'react';

// Card 1: Accuracy Sparkline Visualization
function SparklineVis() {
  return (
    <div className="perf-vis-box">
      <svg viewBox="0 0 200 80" className="sparkline-svg">
        <defs>
          <linearGradient id="sparklineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id="sparklineStroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="50%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#34D399" />
          </linearGradient>
        </defs>
        {/* Area fill */}
        <polygon
          points="10,70 10,50 35,58 65,32 95,45 125,20 155,28 190,12 190,70"
          fill="url(#sparklineGrad)"
        />
        {/* Animated line */}
        <path
          d="M 10,50 L 35,58 L 65,32 L 95,45 L 125,20 L 155,28 L 190,12"
          fill="none"
          stroke="url(#sparklineStroke)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="sparkline-path"
        />
        {/* Glowing pulse dot at peak */}
        <circle cx="190" cy="12" r="5" fill="#34D399" className="sparkline-dot" />
        <circle cx="190" cy="12" r="9" fill="none" stroke="#10B981" strokeWidth="1.5" className="sparkline-pulse" />
      </svg>
    </div>
  );
}

// Card 2: Lightning Speed Visualization
function LightningVis() {
  return (
    <div className="perf-vis-box lightning-vis">
      <div className="pulse-ring ring-1"></div>
      <div className="pulse-ring ring-2"></div>
      <div className="pulse-ring ring-3"></div>
      <div className="lightning-icon-wrap">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="url(#boltGrad)" />
          <defs>
            <linearGradient id="boltGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

// Card 3: Neural Network Node Visualization
function NeuralVis() {
  return (
    <div className="perf-vis-box">
      <svg viewBox="0 0 160 80" className="neural-svg">
        <defs>
          <linearGradient id="nodeGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
        </defs>
        {/* Connections */}
        <line x1="25" y1="25" x2="80" y2="15" stroke="rgba(16,185,129,0.25)" strokeWidth="1.5" />
        <line x1="25" y1="25" x2="80" y2="40" stroke="rgba(16,185,129,0.25)" strokeWidth="1.5" />
        <line x1="25" y1="55" x2="80" y2="40" stroke="rgba(16,185,129,0.25)" strokeWidth="1.5" />
        <line x1="25" y1="55" x2="80" y2="65" stroke="rgba(16,185,129,0.25)" strokeWidth="1.5" />
        <line x1="80" y1="15" x2="135" y2="40" stroke="rgba(16,185,129,0.3)" strokeWidth="1.5" />
        <line x1="80" y1="40" x2="135" y2="40" stroke="rgba(16,185,129,0.3)" strokeWidth="1.5" />
        <line x1="80" y1="65" x2="135" y2="40" stroke="rgba(16,185,129,0.3)" strokeWidth="1.5" />

        {/* Animated flow particles */}
        <circle cx="25" cy="25" r="2.5" fill="#34D399" className="neural-particle particle-1" />
        <circle cx="25" cy="55" r="2.5" fill="#34D399" className="neural-particle particle-2" />
        <circle cx="80" cy="40" r="2.5" fill="#6EE7B7" className="neural-particle particle-3" />

        {/* Nodes */}
        <circle cx="25" cy="25" r="6" fill="url(#nodeGrad)" />
        <circle cx="25" cy="55" r="6" fill="url(#nodeGrad)" />
        <circle cx="80" cy="15" r="5" fill="url(#nodeGrad)" />
        <circle cx="80" cy="40" r="7" fill="#10B981" />
        <circle cx="80" cy="65" r="5" fill="url(#nodeGrad)" />
        <circle cx="135" cy="40" r="8" fill="#34D399" className="output-node" />
      </svg>
    </div>
  );
}

// Card 4: Premium AI Chip Visualization
function AIChipVis() {
  return (
    <div className="perf-vis-box">
      <svg viewBox="0 0 100 80" className="chip-svg">
        {/* Chip Pins */}
        <rect x="25" y="10" width="4" height="8" rx="1" fill="#10B981" opacity="0.6" className="chip-pin pin-t1" />
        <rect x="48" y="10" width="4" height="8" rx="1" fill="#10B981" opacity="0.6" className="chip-pin pin-t2" />
        <rect x="71" y="10" width="4" height="8" rx="1" fill="#10B981" opacity="0.6" className="chip-pin pin-t3" />

        <rect x="25" y="62" width="4" height="8" rx="1" fill="#10B981" opacity="0.6" className="chip-pin pin-b1" />
        <rect x="48" y="62" width="4" height="8" rx="1" fill="#10B981" opacity="0.6" className="chip-pin pin-b2" />
        <rect x="71" y="62" width="4" height="8" rx="1" fill="#10B981" opacity="0.6" className="chip-pin pin-b3" />

        {/* Outer Chip Body */}
        <rect x="18" y="18" width="64" height="44" rx="8" fill="rgba(16, 185, 129, 0.08)" stroke="#10B981" strokeWidth="1.8" />
        {/* Inner Core */}
        <rect x="32" y="27" width="36" height="26" rx="4" fill="rgba(16, 185, 129, 0.2)" stroke="#34D399" strokeWidth="1.2" />
        <text x="50" y="43" textAnchor="middle" fill="#10B981" fontSize="9" fontWeight="800" fontFamily="sans-serif">AI</text>

        {/* Data pulse streams entering chip */}
        <circle cx="10" cy="40" r="2" fill="#34D399" className="chip-stream stream-l" />
        <circle cx="90" cy="40" r="2" fill="#34D399" className="chip-stream stream-r" />
      </svg>
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
          {/* Card 1: Accuracy */}
          <div className="perf-metric-card">
            <SparklineVis />
            <div className="perf-metric-value">95%</div>
            <div className="perf-metric-label">Accuracy</div>
            <div className="perf-metric-sublabel">Cross Validated ML</div>
          </div>

          {/* Card 2: Prediction Speed */}
          <div className="perf-metric-card">
            <LightningVis />
            <div className="perf-metric-value">&lt;1 sec</div>
            <div className="perf-metric-label">Prediction Speed</div>
            <div className="perf-metric-sublabel">Real-Time Inference</div>
          </div>

          {/* Card 3: Input Features */}
          <div className="perf-metric-card">
            <NeuralVis />
            <div className="perf-metric-value">12+</div>
            <div className="perf-metric-label">Input Features</div>
            <div className="perf-metric-sublabel">Behavioral Signals</div>
          </div>

          {/* Card 4: ML Model */}
          <div className="perf-metric-card">
            <AIChipVis />
            <div className="perf-metric-value">Scikit-Learn</div>
            <div className="perf-metric-label">ML Model</div>
            <div className="perf-metric-sublabel">Ensemble Classifier</div>
          </div>
        </div>
      </div>
    </section>
  );
}
