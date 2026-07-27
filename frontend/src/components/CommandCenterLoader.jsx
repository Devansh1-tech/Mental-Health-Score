import { useEffect, useState } from 'react';

const STEPS = [
  'Collecting Behavioural Signals',
  'Understanding Lifestyle Patterns',
  'Running Machine Learning Model',
  'Comparing Similar Behaviour Profiles',
  'Generating Wellness Score',
];

export default function CommandCenterLoader() {
  const [completedIndex, setCompletedIndex] = useState(-1);

  useEffect(() => {
    const timer1 = setTimeout(() => setCompletedIndex(0), 300);
    const timer2 = setTimeout(() => setCompletedIndex(1), 700);
    const timer3 = setTimeout(() => setCompletedIndex(2), 1100);
    const timer4 = setTimeout(() => setCompletedIndex(3), 1500);
    const timer5 = setTimeout(() => setCompletedIndex(4), 1900);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, []);

  return (
    <div className="command-center-overlay">
      <div className="command-center-box">
        {/* Radar Pulse Animation */}
        <div className="command-radar">
          <div className="command-radar-ring"></div>
          <div className="command-radar-ring command-radar-ring--2"></div>
          <div className="command-radar-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4Z" />
              <path d="M16 8v2a4 4 0 0 0 4 4" />
              <path d="M8 8v2a4 4 0 0 1-4 4" />
              <path d="M12 12v10" />
            </svg>
          </div>
        </div>

        <div className="command-title">AI Diagnostics Command Center</div>
        <div className="command-subtitle">Executing sub-second neural inference pipeline...</div>

        {/* Step Checklist */}
        <div className="command-steps">
          {STEPS.map((step, i) => {
            const isDone = i <= completedIndex;
            const isActive = i === completedIndex + 1;

            return (
              <div
                key={i}
                className={`command-step-item ${isDone ? 'completed' : isActive ? 'active' : ''}`}
              >
                <span>{step}</span>
                <span className="command-step-icon">
                  {isDone ? '✓' : isActive ? '⏳' : '•'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
