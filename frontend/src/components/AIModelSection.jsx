import { useEffect, useRef, useState } from 'react';

const PIPELINE = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    title: 'Input Features',
    desc: '12+ lifestyle and behavioral features collected through our intelligent form.',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: 'Feature Engineering',
    desc: 'Automatic preprocessing, normalization, and intelligent feature extraction.',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4Z" />
        <path d="M16 8v2a4 4 0 0 0 4 4" />
        <path d="M8 8v2a4 4 0 0 1-4 4" />
        <path d="M12 12v10" />
        <path d="M8 18h8" />
      </svg>
    ),
    title: 'Machine Learning',
    desc: 'Ensemble model processes patterns across all features for accurate prediction.',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: 'Prediction',
    desc: 'Mental health score generated on a 0–10 scale in real-time.',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    title: 'Recommendation',
    desc: 'Personalized, actionable insights tailored to your unique profile.',
  },
];

export default function AIModelSection() {
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
    <section className="ai-model-section" id="about" ref={ref}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4Z" />
              <path d="M16 8v2a4 4 0 0 0 4 4" />
              <path d="M8 8v2a4 4 0 0 1-4 4" />
              <path d="M12 12v10" />
            </svg>
            Intelligence
          </div>
          <h2 className="section-title">How Our AI Thinks</h2>
          <p className="section-subtitle">
            A deep look into the machine learning pipeline that powers every prediction.
          </p>
        </div>

        <div className="ai-model-content">
          <div
            className="ai-model-text"
            style={{
              animation: visible ? 'fadeInUp 0.7s ease forwards' : 'none',
              opacity: visible ? undefined : 0,
            }}
          >
            <h3>
              Built with <span className="gradient-text">Precision</span>
            </h3>
            <p>
              Our model analyzes 12+ behavioral features including social media usage,
              sleep patterns, physical activity, and stress indicators to predict a mental
              wellness score on a scale of 0 to 10.
            </p>

            <div className="ai-pipeline">
              {PIPELINE.map((step, i) => (
                <div
                  className="ai-pipeline-step"
                  key={i}
                  style={{
                    animation: visible
                      ? `fadeInUp 0.5s ease ${0.2 + i * 0.1}s forwards`
                      : 'none',
                    opacity: visible ? undefined : 0,
                  }}
                >
                  <div className="ai-pipeline-dot">{step.icon}</div>
                  <div className="ai-pipeline-info">
                    <h4>{step.title}</h4>
                    <p>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="ai-model-visual"
            style={{
              animation: visible ? 'fadeInUp 0.7s ease 0.15s forwards' : 'none',
              opacity: visible ? undefined : 0,
            }}
          >
            <div className="neural-container">
              {/* Core */}
              <div className="neural-core">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4Z" />
                  <path d="M16 8v2a4 4 0 0 0 4 4" />
                  <path d="M8 8v2a4 4 0 0 1-4 4" />
                  <path d="M12 12v10" />
                  <path d="M8 18h8" />
                </svg>
              </div>
              {/* Rings */}
              <div className="neural-ring"></div>
              <div className="neural-ring"></div>
              <div className="neural-ring"></div>
              {/* Floating dots */}
              <div className="neural-dot"></div>
              <div className="neural-dot"></div>
              <div className="neural-dot"></div>
              <div className="neural-dot"></div>
              <div className="neural-dot"></div>
              <div className="neural-dot"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
