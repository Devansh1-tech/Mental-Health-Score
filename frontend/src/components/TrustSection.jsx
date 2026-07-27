import { useEffect, useRef, useState } from 'react';

const TRUST_ITEMS = [
  {
    title: 'Privacy First',
    desc: 'Your data never leaves your session. No tracking, no storage — completely anonymous and secure.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        <circle cx="12" cy="16" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: 'Machine Learning',
    desc: 'Advanced ensemble model trained on real behavioral data for highly accurate mental wellness predictions.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4Z" />
        <path d="M16 8v2a4 4 0 0 0 4 4" />
        <path d="M8 8v2a4 4 0 0 1-4 4" />
        <path d="M12 12v10" />
        <path d="M8 18h8" />
      </svg>
    ),
  },
  {
    title: 'Instant Analysis',
    desc: 'Get your mental health score in under a second with our optimized inference pipeline and real-time processing.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    title: 'Personalized Recommendations',
    desc: 'Receive AI-generated, tailored insights based on 12+ lifestyle features unique to your daily routine.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
];

export default function TrustSection() {
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
    <section className="trust-section" id="trust" ref={ref}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            Trusted Platform
          </div>
          <h2 className="section-title">Why Thousands Trust MindAI</h2>
          <p className="section-subtitle">
            Built with cutting-edge technology and a commitment to privacy, accuracy, and personalized care.
          </p>
        </div>

        <div className="trust-grid">
          {TRUST_ITEMS.map((item, i) => (
            <div
              className="trust-card"
              key={i}
              style={{
                animation: visible
                  ? `fadeInUp 0.6s ease ${i * 0.1}s forwards`
                  : 'none',
                opacity: visible ? undefined : 0,
              }}
            >
              <div className="trust-card-icon">{item.icon}</div>
              <h3 className="trust-card-title">{item.title}</h3>
              <p className="trust-card-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
