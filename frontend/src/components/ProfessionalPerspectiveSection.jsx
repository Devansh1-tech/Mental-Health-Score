import { useEffect, useRef, useState } from 'react';

const CARDS_DATA = [
  {
    title: 'Behavior Analysis',
    desc: 'Tracking non-linear correlations between screen time, sleep cycles, and daily stress factors.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    title: 'Lifestyle Insights',
    desc: 'Empowering users with objective behavioral data to recognize healthy daily habit loops.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: 'Early Wellness Awareness',
    desc: 'Highlighting subtle behavioral shifts before they evolve into chronic stress indicators.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    title: 'Professional Guidance',
    desc: 'Recommending certified clinical care and therapy whenever elevated risk markers occur.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

export default function ProfessionalPerspectiveSection() {
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
    <section className="pro-section" id="professional-perspective" ref={ref}>
      <div className="container">
        {/* Top Header */}
        <div className="pro-top-layout">
          {/* Left Column: Large Psychologist Visual Illustration */}
          <div
            className="pro-left-illustration-card glass-card"
            style={{
              animation: visible ? 'fadeInUp 0.7s ease forwards' : 'none',
              opacity: visible ? undefined : 0,
            }}
          >
            <div className="psychologist-visual-wrapper">
              <div className="psychologist-glow-ring"></div>
              {/* Premium Clinical Avatar Vector */}
              <div className="psychologist-avatar-badge">
                <svg width="84" height="84" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="7" r="4" fill="rgba(16,185,129,0.15)" stroke="#10B981" strokeWidth="1.8" />
                  <path d="M5.5 21v-2a4.5 4.5 0 0 1 4.5-4.5h4a4.5 4.5 0 0 1 4.5 4.5v2" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M16 11l2 2 4-4" stroke="#34D399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="psychologist-badge-tag">
                <span className="live-dot"></span> Clinical Diagnostics AI
              </div>
              <div className="psychologist-title">Certified Preventive Framework</div>
              <div className="psychologist-sub">Bridging Artificial Intelligence with Evidence-Based Psychology</div>
            </div>
          </div>

          {/* Right Column: Title, Heading, Description */}
          <div
            className="pro-right-text-content"
            style={{
              animation: visible ? 'fadeInUp 0.7s ease 0.15s forwards' : 'none',
              opacity: visible ? undefined : 0,
            }}
          >
            <div className="pro-small-title">CLINICAL PARADIGM</div>
            <h2 className="pro-heading">Grounded in Behavioral Science & Clinical Analytics</h2>
            <p className="pro-short-desc">
              MindAI evaluates non-linear behavioral correlations to support early self-awareness while empowering clinicians with objective patient insights.
            </p>
          </div>
        </div>

        {/* 4 Premium Glass Cards Below */}
        <div
          className="pro-cards-grid-4"
          style={{
            animation: visible ? 'fadeInUp 0.7s ease 0.3s forwards' : 'none',
            opacity: visible ? undefined : 0,
          }}
        >
          {CARDS_DATA.map((card, idx) => (
            <div className="pro-glass-card-item" key={idx}>
              <div className="pro-card-icon-box">{card.icon}</div>
              <h3 className="pro-card-title">{card.title}</h3>
              <p className="pro-card-sentence">{card.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom Medical Disclaimer Card */}
        <div
          className="pro-disclaimer-card"
          style={{
            animation: visible ? 'fadeInUp 0.7s ease 0.45s forwards' : 'none',
            opacity: visible ? undefined : 0,
          }}
        >
          <div className="disclaimer-icon">🛡️</div>
          <div className="disclaimer-text">
            <strong>Clinical Disclaimer:</strong> MindAI provides predictive behavioral insights for preventive awareness and daily habit tracking. It does not replace professional medical advice, diagnosis, or clinical therapy. If you are experiencing distress, please consult a licensed healthcare professional immediately.
          </div>
        </div>
      </div>
    </section>
  );
}
