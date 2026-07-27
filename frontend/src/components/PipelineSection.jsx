import { useEffect, useRef, useState } from 'react';

const STAGES = [
  {
    step: '01',
    title: 'Lifestyle',
    desc: 'Physical activity & study hours',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 20V10M12 20V4M6 20v-6" />
      </svg>
    ),
  },
  {
    step: '02',
    title: 'Social Habits',
    desc: 'Screen usage & unlocks',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
  },
  {
    step: '03',
    title: 'Sleep Pattern',
    desc: 'Circadian rhythm duration',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    ),
  },
  {
    step: '04',
    title: 'Stress Index',
    desc: 'Subjective load assessment',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    step: '05',
    title: 'ML Engine',
    desc: 'Ensemble feature weight trees',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4Z" />
        <path d="M16 8v2a4 4 0 0 0 4 4" />
        <path d="M8 8v2a4 4 0 0 1-4 4" />
        <path d="M12 12v10" />
      </svg>
    ),
  },
  {
    step: '06',
    title: 'Health Score',
    desc: '0.00 – 10.00 wellness metric',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
];

export default function PipelineSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="pipeline-section" id="pipeline" ref={ref}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
            Cognitive Pipeline
          </div>
          <h2 className="section-title">How AI Understands You</h2>
          <p className="section-subtitle">
            Watch your raw daily habits travel through our neural feature pipeline to form an objective healthcare assessment.
          </p>
        </div>

        <div className="pipeline-flow">
          {STAGES.map((stage, i) => (
            <div
              className="pipeline-node"
              key={i}
              style={{
                animation: visible
                  ? `fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.1}s forwards`
                  : 'none',
                opacity: visible ? undefined : 0,
              }}
            >
              <div className="pipeline-node-icon">
                {stage.icon}
              </div>
              <div className="pipeline-node-title">{stage.title}</div>
              <div className="pipeline-node-desc">{stage.desc}</div>

              {i < STAGES.length - 1 && (
                <div className="pipeline-arrow">→</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
