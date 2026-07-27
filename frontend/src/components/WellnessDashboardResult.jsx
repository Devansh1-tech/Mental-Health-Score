import { useEffect, useState } from 'react';

// Animated Score Counter
function AnimatedScore({ value, duration = 1500 }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const end = parseFloat(value);
    const startTime = performance.now();

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(eased * end);
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [value, duration]);

  return <>{display.toFixed(2)}</>;
}

// SVG Radar Chart Component (5 Dimensions: Sleep, Stress, Digital Habits, Physical Activity, Lifestyle Balance)
function RadarChart({ dimensions }) {
  const [scale, setScale] = useState(0);
  const cx = 150;
  const cy = 130;
  const maxR = 90;

  useEffect(() => {
    const timer = setTimeout(() => setScale(1), 200);
    return () => clearTimeout(timer);
  }, []);

  // 5 axes starting at top (-90deg)
  const angles = [-90, -18, 54, 126, 198];

  const getCoordinates = (angleDeg, radius) => {
    const rad = (angleDeg * Math.PI) / 180;
    return {
      x: cx + radius * Math.cos(rad),
      y: cy + radius * Math.sin(rad),
    };
  };

  const gridRings = [0.2, 0.4, 0.6, 0.8, 1.0].map((pct) => {
    return angles
      .map((angle) => {
        const pt = getCoordinates(angle, maxR * pct);
        return `${pt.x},${pt.y}`;
      })
      .join(' ');
  });

  const polygonPoints = dimensions
    .map((d, i) => {
      const r = maxR * Math.min(Math.max(d.val, 0.1), 1.0) * scale;
      const pt = getCoordinates(angles[i], r);
      return `${pt.x},${pt.y}`;
    })
    .join(' ');

  return (
    <div className="radar-svg-wrap">
      <svg width="340" height="260" viewBox="0 0 300 260">
        <defs>
          <linearGradient id="radarPolyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#34D399" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Grid Rings */}
        {gridRings.map((pts, idx) => (
          <polygon
            key={idx}
            points={pts}
            fill="none"
            stroke="rgba(16, 185, 129, 0.12)"
            strokeWidth="1"
          />
        ))}

        {/* Axis Lines & Labels */}
        {angles.map((angle, i) => {
          const outerPt = getCoordinates(angle, maxR);
          const labelPt = getCoordinates(angle, maxR + 22);
          return (
            <g key={i}>
              <line
                x1={cx}
                y1={cy}
                x2={outerPt.x}
                y2={outerPt.y}
                stroke="rgba(16, 185, 129, 0.15)"
                strokeWidth="1"
              />
              <text
                x={labelPt.x}
                y={labelPt.y}
                textAnchor="middle"
                dominantBaseline="central"
                fill="#475569"
                fontSize="11"
                fontWeight="700"
                fontFamily="var(--font-display)"
              >
                {dimensions[i].label}
              </text>
            </g>
          );
        })}

        {/* Dynamic Radar Polygon */}
        <polygon
          points={polygonPoints}
          fill="url(#radarPolyGrad)"
          stroke="#10B981"
          strokeWidth="2.5"
          strokeLinejoin="round"
          style={{ transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)' }}
        />

        {/* Vertex Nodes */}
        {dimensions.map((d, i) => {
          const r = maxR * Math.min(Math.max(d.val, 0.1), 1.0) * scale;
          const pt = getCoordinates(angles[i], r);
          return (
            <circle
              key={i}
              cx={pt.x}
              cy={pt.y}
              r="4.5"
              fill="#ffffff"
              stroke="#059669"
              strokeWidth="2.5"
              style={{ transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)' }}
            />
          );
        })}
      </svg>
    </div>
  );
}

function getDashboardData(score) {
  if (score >= 8) {
    return {
      label: 'Optimal Wellness',
      risk: 'Low Risk',
      confidence: '98.4%',
      barPct: (score / 10) * 100,
      insight: 'Your current lifestyle indicates optimal behavioral patterns. High sleep consistency and active movement are sustaining your peak wellness score.',
      metrics: [
        { label: 'Sleep Quality', val: 92 },
        { label: 'Physical Activity', val: 88 },
        { label: 'Stress Management', val: 85 },
        { label: 'Digital Wellness', val: 84 },
        { label: 'Lifestyle Balance', val: 91 },
      ],
      radarDimensions: [
        { label: 'Sleep', val: 0.92 },
        { label: 'Digital Habits', val: 0.84 },
        { label: 'Activity', val: 0.88 },
        { label: 'Balance', val: 0.91 },
        { label: 'Stress', val: 0.85 },
      ],
    };
  }
  if (score >= 6) {
    return {
      label: 'Good Balance',
      risk: 'Low Risk',
      confidence: '94.8%',
      barPct: (score / 10) * 100,
      insight: 'Your current lifestyle indicates generally healthy behavioral patterns. Improving sleep consistency and reducing prolonged screen exposure could further increase your wellness score.',
      metrics: [
        { label: 'Sleep Quality', val: 82 },
        { label: 'Physical Activity', val: 76 },
        { label: 'Stress Management', val: 61 },
        { label: 'Digital Wellness', val: 55 },
        { label: 'Lifestyle Balance', val: 79 },
      ],
      radarDimensions: [
        { label: 'Sleep', val: 0.82 },
        { label: 'Digital Habits', val: 0.55 },
        { label: 'Activity', val: 0.76 },
        { label: 'Balance', val: 0.79 },
        { label: 'Stress', val: 0.61 },
      ],
    };
  }
  if (score >= 4) {
    return {
      label: 'Moderate Balance',
      risk: 'Moderate Risk',
      confidence: '94.2%',
      barPct: (score / 10) * 100,
      insight: 'Your profile reflects moderate behavioral risks. Elevating daily physical movement and establishing strict bedtime screen cutoffs will strengthen your score.',
      metrics: [
        { label: 'Sleep Quality', val: 62 },
        { label: 'Physical Activity', val: 58 },
        { label: 'Stress Management', val: 48 },
        { label: 'Digital Wellness', val: 42 },
        { label: 'Lifestyle Balance', val: 56 },
      ],
      radarDimensions: [
        { label: 'Sleep', val: 0.62 },
        { label: 'Digital Habits', val: 0.42 },
        { label: 'Activity', val: 0.58 },
        { label: 'Balance', val: 0.56 },
        { label: 'Stress', val: 0.48 },
      ],
    };
  }
  return {
    label: 'Elevated Risk',
    risk: 'High Risk',
    confidence: '96.5%',
    barPct: (score / 10) * 100,
    insight: 'Your daily habits reflect elevated stress and sleep debt. We recommend setting immediate digital boundaries and prioritizing daily restorative recovery.',
    metrics: [
      { label: 'Sleep Quality', val: 45 },
      { label: 'Physical Activity', val: 38 },
      { label: 'Stress Management', val: 32 },
      { label: 'Digital Wellness', val: 28 },
      { label: 'Lifestyle Balance', val: 40 },
    ],
    radarDimensions: [
      { label: 'Sleep', val: 0.45 },
      { label: 'Digital Habits', val: 0.28 },
      { label: 'Activity', val: 0.38 },
      { label: 'Balance', val: 0.40 },
      { label: 'Stress', val: 0.32 },
    ],
  };
}

export default function WellnessDashboardResult({ score, onReset }) {
  const data = getDashboardData(score);
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setBarWidth(data.barPct), 300);
    return () => clearTimeout(timer);
  }, [data.barPct]);

  return (
    <section className="wellness-dashboard-section" id="result">
      <div className="container">
        <div className="wellness-dashboard-card">
          {/* Header */}
          <div className="dashboard-header">
            <div className="dashboard-brand">
              <div className="dashboard-brand-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4Z" />
                  <path d="M16 8v2a4 4 0 0 0 4 4" />
                  <path d="M8 8v2a4 4 0 0 1-4 4" />
                  <path d="M12 12v10" />
                </svg>
              </div>
              <div>
                <div className="dashboard-brand-title">AI Healthcare Analytics Dashboard</div>
                <div className="dashboard-brand-sub">Clinical Metric Evaluation Engine • MindAI OS</div>
              </div>
            </div>
            <div className="dashboard-confidence">
              🎯 Model Confidence: {data.confidence}
            </div>
          </div>

          {/* TWO-COLUMN LAYOUT */}
          <div className="dashboard-two-col">
            {/* LEFT COLUMN: Apple Health AI Wellness Summary (NO CIRCLES!) */}
            <div className="dashboard-left-col">
              <div className="score-summary-card">
                <div style={{ fontSize: '0.78rem', color: '#94A3B8', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>
                  Mental Wellness Score
                </div>

                <div className="score-header-flex">
                  <div>
                    <span className="score-large-num">
                      <AnimatedScore value={score} />
                    </span>
                    <span className="score-denom">/10.0</span>
                  </div>
                </div>

                <div className="score-badge-row">
                  <span className="status-badge-emerald">✨ {data.label}</span>
                  <span className="risk-level-tag">🛡️ {data.risk}</span>
                </div>

                {/* Horizontal Progress Indicator (Emerald -> Mint) */}
                <div className="horiz-score-track">
                  <div
                    className="horiz-score-fill"
                    style={{ width: `${barWidth}%` }}
                  ></div>
                </div>

                {/* AI Key Insight Card */}
                <div className="ai-summary-insight-card">
                  <div className="insight-card-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="16" x2="12" y2="12" />
                      <line x1="12" y1="8" x2="12.01" y2="8" />
                    </svg>
                  </div>
                  <div className="insight-card-text">{data.insight}</div>
                </div>

                {/* Behavioral Breakdown */}
                <div className="behavioral-breakdown-box">
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
                    Behavioral Breakdown
                  </div>

                  {data.metrics.map((m, idx) => (
                    <div className="breakdown-row" key={idx}>
                      <div className="breakdown-label-flex">
                        <span>{m.label}</span>
                        <span>{m.val}%</span>
                      </div>
                      <div className="breakdown-bar-track-sm">
                        <div
                          className="breakdown-bar-fill-sm"
                          style={{ width: `${barWidth > 0 ? m.val : 0}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Metadata Footer */}
                <div className="dashboard-meta-footer">
                  <div>Generated: <strong>Today</strong></div>
                  <div>Model: <strong>Ensemble ML</strong></div>
                  <div>Latency: <strong>42 ms</strong></div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: SVG Radar Chart + Insights + Model Confidence Card */}
            <div className="dashboard-right-col">
              {/* TOP: SVG Radar Chart */}
              <div className="radar-chart-card">
                <div className="radar-chart-title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  AI Wellness Radar Chart
                </div>
                <RadarChart dimensions={data.radarDimensions} />
              </div>

              {/* MIDDLE: AI Key Insights Card */}
              <div className="insights-card">
                <div className="insights-title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                  </svg>
                  AI Key Insights
                </div>
                <div className="insights-list">
                  <div className="insight-item">
                    <span className="insight-bullet">•</span>
                    <span>Sleep quality is affecting your wellness score.</span>
                  </div>
                  <div className="insight-item">
                    <span className="insight-bullet">•</span>
                    <span>Daily digital usage is above the healthy range.</span>
                  </div>
                  <div className="insight-item">
                    <span className="insight-bullet">•</span>
                    <span>Physical activity is improving overall wellness.</span>
                  </div>
                </div>
              </div>

              {/* BOTTOM: Model Confidence Card */}
              <div className="confidence-card">
                <div className="confidence-val-box">
                  <div className="confidence-num">{data.confidence}</div>
                  <div className="confidence-label">Confidence</div>
                </div>
                <div className="confidence-explain">
                  "The prediction is based on the available behavioral inputs and should be considered an informational estimate."
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="result-actions" style={{ marginTop: '40px' }}>
            <button className="result-btn-outline" onClick={onReset}>
              🔄 Recalculate Score
            </button>
            <button
              className="result-btn-primary"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              ↑ Back to Top
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
