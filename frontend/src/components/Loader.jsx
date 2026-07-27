import { useState, useEffect } from 'react';

const LOADING_PHASES = [
  'Thinking...',
  'Analyzing behavioral signals...',
  'Evaluating lifestyle markers...',
  'Predicting mental wellness score...',
];

export default function Loader() {
  const [phaseIndex, setPhaseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhaseIndex((prev) => (prev + 1) % LOADING_PHASES.length);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loader-overlay">
      <div className="loader-brain">
        <div className="loader-ring-outer"></div>
        <div className="loader-ring-mid"></div>
        <div className="loader-ring-inner"></div>
        <div className="loader-core">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4Z" />
            <path d="M16 8v2a4 4 0 0 0 4 4" />
            <path d="M8 8v2a4 4 0 0 1-4 4" />
            <path d="M12 12v10" />
          </svg>
        </div>
      </div>
      <div className="loader-text">
        {LOADING_PHASES[phaseIndex]}
      </div>
      <div className="loader-subtext">MindAI Neural Network Engine</div>
    </div>
  );
}
