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
            <stop offset="0%" stopColor="#22C55E" />
            <stop offset="100%" stopColor="#4ADE80" />
          </linearGradient>
          <linearGradient id="gradient-good" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#3B82F6" />
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
        <circle
          className="result-ring-bg"
          cx="100"
          cy="100"
          r={radius}
        />
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
      label: 'Excellent Mental Health',
      icon: '🌟',
      emoji: '✨',
      description:
        'Your lifestyle habits indicate excellent mental well-being. Keep maintaining your healthy balance of activities, sleep, and social media use.',
      recommendations: [
        'Continue your current balanced lifestyle',
        'Share your wellness practices with others',
        'Maintain consistent sleep and exercise habits',
        'Consider mindfulness to sustain this level',
      ],
    };
  }
  if (score >= 6) {
    return {
      level: 'good',
      label: 'Good Mental Health',
      icon: '😊',
      emoji: '💙',
      description:
        'You show signs of good mental health. Minor adjustments to your daily routine could help you achieve an even better balance.',
      recommendations: [
        'Reduce social media usage by 30 minutes daily',
        'Add 20 minutes of physical activity',
        'Improve sleep consistency with a fixed schedule',
        'Take regular digital detox breaks',
      ],
    };
  }
  if (score >= 4) {
    return {
      level: 'moderate',
      label: 'Moderate Risk',
      icon: '⚠️',
      emoji: '🔶',
      description:
        'Your habits suggest moderate mental health risk. Consider reducing screen time, increasing physical activity, and improving sleep patterns.',
      recommendations: [
        'Limit screen time to under 4 hours daily',
        'Exercise for at least 30 minutes each day',
        'Aim for 7-8 hours of quality sleep',
        'Practice stress-reduction techniques daily',
        'Consider speaking with a counselor',
      ],
    };
  }
  return {
    level: 'risk',
    label: 'High Risk',
    icon: '🚨',
    emoji: '🔴',
    description:
      'Your patterns indicate elevated mental health risk. We strongly recommend speaking with a mental health professional and making lifestyle changes.',
    recommendations: [
      'Seek professional mental health support',
      'Significantly reduce social media consumption',
      'Prioritize sleep — aim for 8+ hours nightly',
      'Incorporate daily physical activity',
      'Build a strong support network of friends/family',
      'Consider a complete digital detox period',
    ],
  };
}

export default function ResultCard({ score, onReset }) {
  const { level, label, icon, emoji, description, recommendations } = getScoreData(score);

  return (
    <section className="result-section" id="result">
      <div className="container">
        <div className="result-card glass-card">
          <div className="result-icon">{icon}</div>
          <div className="result-label">Your Predicted Score</div>

          <CircularProgress score={score} level={level} />

          <div className={`result-interpretation ${level}`}>
            {emoji} {label}
          </div>

          <div className="result-recommendation">
            <div className="result-recommendation-title">
              💡 Recommendations
            </div>
            <p className="result-recommendation-text">{description}</p>
            <ul className="result-recommendation-list">
              {recommendations.map((rec, i) => (
                <li key={i}>{rec}</li>
              ))}
            </ul>
          </div>

          <div className="result-actions">
            <button className="result-btn-outline" onClick={onReset}>
              🔄 New Prediction
            </button>
            <button
              className="result-btn-primary"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              ↑ Back to Top
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
