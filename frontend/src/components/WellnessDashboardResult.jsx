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

  return <>{display.toFixed(2)}</>;
}

function CircularProgress({ score, level }) {
  const radius = 85;
  const circumference = 2 * Math.PI * radius;
  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    const timer = setTimeout(() => {
      const progress = Math.min(score / 10, 1);
      setOffset(circumference - progress * circumference);
    }, 300);
    return () => clearTimeout(timer);
  }, [score, circumference]);

  return (
    <div className="result-ring-container">
      <svg className="result-ring-svg" viewBox="0 0 200 200">
        <defs>
          <linearGradient id="gradient-excellent" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#34D399" />
          </linearGradient>
          <linearGradient id="gradient-good" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22C55E" />
            <stop offset="100%" stopColor="#4ADE80" />
          </linearGradient>
          <linearGradient id="gradient-moderate" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#FB923C" />
          </linearGradient>
          <linearGradient id="gradient-risk" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="100%" stopColor="#DC2626" />
          </linearGradient>
        </defs>
        <circle className="result-ring-bg" cx="100" cy="100" r={radius} />
        <circle
          className={`result-ring-progress ${level}`}
          cx="100"
          cy="100"
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="result-ring-center">
        <div className={`result-score ${level}`}>
          <AnimatedScore value={score} />
        </div>
        <div className="result-max">/ 10.00</div>
      </div>
    </div>
  );
}

function getScoreData(score) {
  if (score >= 8) {
    return {
      level: 'excellent',
      label: 'Optimal Mental Wellness',
      icon: '🌟',
      emoji: '✨',
      confidence: '98.4%',
      sleepPct: 92,
      digitalPct: 88,
      activityPct: 95,
      description:
        'Your lifestyle habits indicate excellent mental well-being. Keep maintaining your healthy balance of activities, sleep, and digital boundaries.',
      recommendations: [
        'Sustain your current sleep and physical activity schedules',
        'Maintain daily mindfulness practices to lock in performance',
        'Share healthy digital habits with your peer community',
      ],
    };
  }
  if (score >= 6) {
    return {
      level: 'good',
      label: 'Good Mental Balance',
      icon: '😊',
      emoji: '💚',
      confidence: '96.2%',
      sleepPct: 78,
      digitalPct: 65,
      activityPct: 80,
      description:
        'You show strong signs of healthy wellbeing. Minor optimizations to screen time and sleep consistency can boost your score higher.',
      recommendations: [
        'Reduce social media app usage by 30 minutes daily',
        'Add 20–30 minutes of moderate outdoor physical activity',
        'Schedule short digital detox periods during study/work hours',
      ],
    };
  }
  if (score >= 4) {
    return {
      level: 'moderate',
      label: 'Moderate Risk Detected',
      icon: '⚠️',
      emoji: '🔶',
      confidence: '94.8%',
      sleepPct: 60,
      digitalPct: 45,
      activityPct: 55,
      description:
        'Your digital habits and routine indicate moderate wellness risks. Consider reducing screen time and increasing physical recovery.',
      recommendations: [
        'Limit non-essential screen time to under 4 hours daily',
        'Incorporate at least 30 minutes of physical activity daily',
        'Aim for 7–8 hours of uninterrupted sleep per night',
      ],
    };
  }
  return {
    level: 'risk',
    label: 'Elevated Risk Level',
    icon: '🚨',
    emoji: '🔴',
    confidence: '97.1%',
    sleepPct: 40,
    digitalPct: 25,
    activityPct: 35,
    description:
      'Your patterns indicate elevated risk parameters. We strongly advise taking active steps toward digital detox and consulting a mental health professional.',
    recommendations: [
      'Seek professional evaluation from a certified counselor',
      'Significantly restrict daily social media and smartphone unlocks',
      'Prioritize sleep hygiene — target 8+ hours nightly',
    ],
  };
}

export default function WellnessDashboardResult({ score, onReset }) {
  const { level, label, icon, emoji, confidence, sleepPct, digitalPct, activityPct, description, recommendations } = getScoreData(score);

  return (
    <section className="wellness-dashboard-section" id="result">
      <div className="container">
        <div className="wellness-dashboard-card">
          {/* Header */}
          <div className="dashboard-header">
            <div className="dashboard-brand">
              <div className="dashboard-brand-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4Z" />
                  <path d="M16 8v2a4 4 0 0 0 4 4" />
                  <path d="M8 8v2a4 4 0 0 1-4 4" />
                  <path d="M12 12v10" />
                </svg>
              </div>
              <div>
                <div className="dashboard-brand-title">AI Wellness Intelligence Dashboard</div>
                <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>Inference ID: #MD-{Math.floor(Math.random()*90000+10000)}</div>
              </div>
            </div>
            <div className="dashboard-confidence">
              🎯 Model Confidence: {confidence}
            </div>
          </div>

          {/* Main Grid */}
          <div className="dashboard-main-grid">
            {/* Score Ring */}
            <div className="dashboard-score-box">
              <div className="result-label">Predicted Wellness Score</div>
              <CircularProgress score={score} level={level} />
              <div className={`result-interpretation ${level}`}>
                {emoji} {label}
              </div>
            </div>

            {/* Lifestyle Breakdown Bars */}
            <div className="dashboard-breakdown">
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px' }}>
                Behavioral Breakdown Metrics
              </h4>

              <div className="breakdown-bar-item">
                <div className="breakdown-bar-header">
                  <span>Sleep Duration Index</span>
                  <span>{sleepPct}%</span>
                </div>
                <div className="breakdown-bar-track">
                  <div className="breakdown-bar-fill" style={{ width: `${sleepPct}%` }}></div>
                </div>
              </div>

              <div className="breakdown-bar-item">
                <div className="breakdown-bar-header">
                  <span>Digital Detox Balance</span>
                  <span>{digitalPct}%</span>
                </div>
                <div className="breakdown-bar-track">
                  <div className="breakdown-bar-fill" style={{ width: `${digitalPct}%` }}></div>
                </div>
              </div>

              <div className="breakdown-bar-item">
                <div className="breakdown-bar-header">
                  <span>Physical Recovery Score</span>
                  <span>{activityPct}%</span>
                </div>
                <div className="breakdown-bar-track">
                  <div className="breakdown-bar-fill" style={{ width: `${activityPct}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendation Box */}
          <div className="result-recommendation">
            <div className="result-recommendation-title">
              Healthcare Insights & Action Plan
            </div>
            <p className="result-recommendation-text">{description}</p>
            <ul className="result-recommendation-list">
              {recommendations.map((rec, i) => (
                <li key={i}>{rec}</li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="result-actions">
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
