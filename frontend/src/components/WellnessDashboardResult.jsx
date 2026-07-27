import { useEffect, useState } from 'react';

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

  return <>{display.toFixed(1)}</>;
}

function RadarChart({ dimensions }) {
  const [scale, setScale] = useState(0);
  const cx = 150;
  const cy = 125;
  const maxR = 85;

  useEffect(() => {
    const timer = setTimeout(() => setScale(1), 200);
    return () => clearTimeout(timer);
  }, []);

  const angles = [-90, -18, 54, 126, 198];

  const getCoordinates = (angleDeg, radius) => {
    const rad = (angleDeg * Math.PI) / 180;
    return {
      x: cx + radius * Math.cos(rad),
      y: cy + radius * Math.sin(rad),
    };
  };

  const gridRings = [0.25, 0.5, 0.75, 1.0].map((pct) => {
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
      <svg width="300" height="250" viewBox="0 0 300 250">
        <defs>
          <linearGradient id="radarPolyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#34D399" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {gridRings.map((pts, idx) => (
          <polygon
            key={idx}
            points={pts}
            fill="none"
            stroke="rgba(16, 185, 129, 0.14)"
            strokeWidth="1.2"
          />
        ))}

        {angles.map((angle, i) => {
          const outerPt = getCoordinates(angle, maxR);
          const labelPt = getCoordinates(angle, maxR + 20);
          return (
            <g key={i}>
              <line
                x1={cx}
                y1={cy}
                x2={outerPt.x}
                y2={outerPt.y}
                stroke="rgba(16, 185, 129, 0.18)"
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

        <polygon
          points={polygonPoints}
          fill="url(#radarPolyGrad)"
          stroke="#10B981"
          strokeWidth="2.5"
          strokeLinejoin="round"
          style={{ transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)' }}
        />

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
      label: 'Optimal Balance',
      confidence: '98.4%',
      barPct: (score / 10) * 100,
      radarDimensions: [
        { label: 'Sleep', val: 0.92 },
        { label: 'Digital', val: 0.84 },
        { label: 'Activity', val: 0.88 },
        { label: 'Balance', val: 0.91 },
        { label: 'Stress', val: 0.85 },
      ],
      breakdown: [
        { label: 'Sleep Quality', val: 92, icon: '😴' },
        { label: 'Physical Activity', val: 88, icon: '🏃' },
        { label: 'Stress Management', val: 85, icon: '🧘' },
        { label: 'Digital Wellness', val: 84, icon: '📱' },
        { label: 'Lifestyle Balance', val: 91, icon: '⚖️' },
      ],
      positives: [
        { icon: '🌙', text: '7.5+ hours restorative sleep per night' },
        { icon: '🏃', text: 'Regular physical activity & daily walks' },
        { icon: '📚', text: 'Consistent daily study hours & deep focus' },
      ],
      improvements: [
        { icon: '📱', text: 'Minor screen time reduction before bedtime' },
      ],
      insights: 'Optimal circadian rhythm and active physical recovery are driving high cognitive balance.',
    };
  }
  if (score >= 6) {
    return {
      label: 'Good Balance',
      confidence: '94.8%',
      barPct: (score / 10) * 100,
      radarDimensions: [
        { label: 'Sleep', val: 0.82 },
        { label: 'Digital', val: 0.55 },
        { label: 'Activity', val: 0.76 },
        { label: 'Balance', val: 0.79 },
        { label: 'Stress', val: 0.61 },
      ],
      breakdown: [
        { label: 'Sleep Quality', val: 82, icon: '😴' },
        { label: 'Physical Activity', val: 76, icon: '🏃' },
        { label: 'Stress Management', val: 61, icon: '🧘' },
        { label: 'Digital Wellness', val: 55, icon: '📱' },
        { label: 'Lifestyle Balance', val: 79, icon: '⚖️' },
      ],
      positives: [
        { icon: '🏃', text: 'Sufficient daily physical activity' },
        { icon: '📚', text: 'Solid academic study routine' },
      ],
      improvements: [
        { icon: '📱', text: 'High screen usage & social media time' },
        { icon: '🔓', text: 'Frequent phone unlocks (40+ per day)' },
      ],
      insights: 'Reducing evening notification switches will boost your overall balance score significantly.',
    };
  }
  if (score >= 4) {
    return {
      label: 'Moderate Risk',
      confidence: '94.2%',
      barPct: (score / 10) * 100,
      radarDimensions: [
        { label: 'Sleep', val: 0.62 },
        { label: 'Digital', val: 0.42 },
        { label: 'Activity', val: 0.58 },
        { label: 'Balance', val: 0.56 },
        { label: 'Stress', val: 0.48 },
      ],
      breakdown: [
        { label: 'Sleep Quality', val: 62, icon: '😴' },
        { label: 'Physical Activity', val: 58, icon: '🏃' },
        { label: 'Stress Management', val: 48, icon: '🧘' },
        { label: 'Digital Wellness', val: 42, icon: '📱' },
        { label: 'Lifestyle Balance', val: 56, icon: '⚖️' },
      ],
      positives: [
        { icon: '📚', text: 'Regular study schedule maintained' },
      ],
      improvements: [
        { icon: '😴', text: 'Sub-optimal sleep duration (<6 hours)' },
        { icon: '🧘', text: 'Elevated self-reported stress levels' },
      ],
      insights: 'Prioritize restorative sleep and set strict digital boundaries after 10 PM.',
    };
  }
  return {
    label: 'Elevated Risk',
    confidence: '96.5%',
    barPct: (score / 10) * 100,
    radarDimensions: [
      { label: 'Sleep', val: 0.45 },
      { label: 'Digital', val: 0.28 },
      { label: 'Activity', val: 0.38 },
      { label: 'Balance', val: 0.40 },
      { label: 'Stress', val: 0.32 },
    ],
    breakdown: [
      { label: 'Sleep Quality', val: 45, icon: '😴' },
      { label: 'Physical Activity', val: 38, icon: '🏃' },
      { label: 'Stress Management', val: 32, icon: '🧘' },
      { label: 'Digital Wellness', val: 28, icon: '📱' },
      { label: 'Lifestyle Balance', val: 40, icon: '⚖️' },
    ],
    positives: [
      { icon: '📋', text: 'Completed behavioral assessment' },
    ],
    improvements: [
      { icon: '😴', text: 'Severe sleep debt accumulated' },
      { icon: '📱', text: 'Excessive daily screen exposure' },
      { icon: '🏃', text: 'Low physical activity levels' },
    ],
    insights: 'Immediate focus on sleep restoration and digital boundary setting recommended.',
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
        <div className="dashboard-wrapper">

          {/* TOP SECTION: Score Card */}
          <div className="dash-top-card glass-card">
            <div className="dash-top-header">
              <div className="dash-score-flex">
                <div className="dash-score-main">
                  <span className="dash-score-num">
                    <AnimatedScore value={score} />
                  </span>
                  <span className="dash-score-max">/10.0</span>
                </div>
                <div className="dash-badges-wrap">
                  <span className="dash-status-pill">✨ {data.label}</span>
                  <span className="dash-conf-pill">🎯 {data.confidence} Confidence</span>
                </div>
              </div>
            </div>

            {/* Horizontal Progress Bar */}
            <div className="dash-score-bar-wrap">
              <div className="dash-score-bar-track">
                <div
                  className="dash-score-bar-fill"
                  style={{ width: `${barWidth}%` }}
                ></div>
              </div>
              <div className="dash-score-bar-labels">
                <span>0.0 (Elevated Risk)</span>
                <span>5.0 (Moderate)</span>
                <span className="gold-label">10.0 (Optimal)</span>
              </div>
            </div>
          </div>

          {/* MIDDLE SECTION: 2-Column Grid */}
          <div className="dash-mid-grid">

            {/* LEFT COLUMN: Radar Chart + Behavior Breakdown */}
            <div className="dash-col-left">
              {/* Radar Chart Glass Card */}
              <div className="dash-card glass-card">
                <div className="dash-card-title">
                  <span>📊</span> Behavior Radar Chart
                </div>
                <RadarChart dimensions={data.radarDimensions} />
              </div>

              {/* Behavior Breakdown Glass Card */}
              <div className="dash-card glass-card">
                <div className="dash-card-title">
                  <span>⚖️</span> Behavioral Signals Breakdown
                </div>
                <div className="dash-metrics-list">
                  {data.breakdown.map((m, idx) => (
                    <div className="dash-metric-row" key={idx}>
                      <div className="dash-metric-info">
                        <span>{m.icon} {m.label}</span>
                        <span className="dash-metric-val">{m.val}%</span>
                      </div>
                      <div className="dash-metric-track">
                        <div
                          className="dash-metric-fill"
                          style={{ width: `${barWidth > 0 ? m.val : 0}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Habits + Needs Improvement + AI Insights */}
            <div className="dash-col-right">

              {/* Top Positive Habits */}
              <div className="dash-card glass-card">
                <div className="dash-card-title">
                  <span>🌟</span> Top Positive Habits
                </div>
                <div className="dash-cards-stack">
                  {data.positives.map((p, idx) => (
                    <div className="habit-mini-card positive" key={idx}>
                      <span className="habit-icon">{p.icon}</span>
                      <span className="habit-text">{p.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Needs Improvement */}
              <div className="dash-card glass-card">
                <div className="dash-card-title">
                  <span>⚡</span> Needs Improvement
                </div>
                <div className="dash-cards-stack">
                  {data.improvements.map((imp, idx) => (
                    <div className="habit-mini-card warning" key={idx}>
                      <span className="habit-icon">{imp.icon}</span>
                      <span className="habit-text">{imp.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Key Insights */}
              <div className="dash-card glass-card insight-glass-card">
                <div className="dash-card-title">
                  <span>💡</span> AI Key Insights
                </div>
                <p className="dash-insight-p">
                  "{data.insights}"
                </p>
              </div>

            </div>
          </div>

          {/* BOTTOM SECTION: Daily Wellness Plan */}
          <div className="dash-bottom-card glass-card">
            <div className="dash-card-title" style={{ marginBottom: '20px' }}>
              <span>🗓️</span> Daily Wellness Action Plan
            </div>

            <div className="daily-timeline-grid">
              <div className="timeline-slot">
                <div className="slot-header">
                  <span className="slot-icon">🌅</span>
                  <div>
                    <div className="slot-name">Morning</div>
                    <div className="slot-time">7:00 AM - 9:00 AM</div>
                  </div>
                </div>
                <div className="slot-body">
                  10-minute natural sunlight exposure & 500ml morning hydration.
                </div>
              </div>

              <div className="timeline-slot">
                <div className="slot-header">
                  <span className="slot-icon">☀️</span>
                  <div>
                    <div className="slot-name">Afternoon</div>
                    <div className="slot-time">12:00 PM - 2:00 PM</div>
                  </div>
                </div>
                <div className="slot-body">
                  20-minute brisk walk & 5-minute desk mobility stretching.
                </div>
              </div>

              <div className="timeline-slot">
                <div className="slot-header">
                  <span className="slot-icon">🌆</span>
                  <div>
                    <div className="slot-name">Evening</div>
                    <div className="slot-time">6:00 PM - 8:00 PM</div>
                  </div>
                </div>
                <div className="slot-body">
                  Enable phone Grayscale mode & eat a balanced glycemic dinner.
                </div>
              </div>

              <div className="timeline-slot">
                <div className="slot-header">
                  <span className="slot-icon">🌙</span>
                  <div>
                    <div className="slot-name">Night</div>
                    <div className="slot-time">10:00 PM - 11:00 PM</div>
                  </div>
                </div>
                <div className="slot-body">
                  4-7-8 box breathing & cool dark bedroom setting for sleep.
                </div>
              </div>
            </div>
          </div>

          {/* Reset Actions */}
          <div className="dash-actions">
            <button className="btn-secondary" onClick={onReset}>
              🔄 Recalculate Assessment
            </button>
            <button
              className="btn-primary"
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
