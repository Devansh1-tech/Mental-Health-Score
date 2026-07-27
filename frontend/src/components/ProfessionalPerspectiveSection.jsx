import { useEffect, useRef, useState } from 'react';

const PRO_CARDS = [
  {
    title: 'Behavioral Pattern Analysis',
    desc: 'Tracking non-linear trends between screen time, sleep cycles, and daily stress indicators.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
  {
    title: 'Lifestyle Awareness',
    desc: 'Empowering users with objective data to recognize healthy routines and habit loops.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    title: 'Early Wellness Insights',
    desc: 'Highlighting subtle behavioral shifts before they evolve into chronic stress factors.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    title: 'Professional Support When Needed',
    desc: 'Recommending certified clinical care and therapy resources whenever elevated risk markers occur.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
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
        <div className="section-header">
          <div className="section-tag">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            Clinical Guidance
          </div>
          <h2 className="section-title">Mental Health Professional Perspective</h2>
          <p className="section-subtitle">
            How artificial intelligence supports self-awareness while complementing professional psychological evaluation.
          </p>
        </div>

        <div className="pro-stage">
          {/* Left Visual Card */}
          <div
            className="pro-visual-card"
            style={{
              animation: visible ? 'fadeInUp 0.7s ease forwards' : 'none',
              opacity: visible ? undefined : 0,
            }}
          >
            <div className="pro-avatar-icon">
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div className="pro-visual-title">Preventive Behavioral Care</div>
            <div className="pro-visual-sub">Integrating AI Insights into Daily Wellness</div>
          </div>

          {/* Right Content Panel */}
          <div
            className="pro-right-panel"
            style={{
              animation: visible ? 'fadeInUp 0.7s ease 0.15s forwards' : 'none',
              opacity: visible ? undefined : 0,
            }}
          >
            <h3>Supporting Mental Wellness with AI</h3>
            <p>
              AI can help identify behavioral patterns and encourage healthier habits, while licensed professionals provide diagnosis and treatment when needed.
            </p>

            <div className="pro-cards-grid">
              {PRO_CARDS.map((card, idx) => (
                <div className="pro-card" key={idx}>
                  <div className="pro-card-icon">{card.icon}</div>
                  <div className="pro-card-h">{card.title}</div>
                  <div className="pro-card-p">{card.desc}</div>
                </div>
              ))}
            </div>

            {/* Bottom Highlighted Medical Disclaimer Box */}
            <div className="medical-disclaimer-box">
              🛡️ <strong>Clinical Note:</strong> MindAI provides informational wellness insights and should not be considered a medical diagnosis. If symptoms persist, consider consulting a qualified mental health professional.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
