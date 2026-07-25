import { useEffect, useRef, useState } from 'react';

const FEATURES = [
  {
    icon: '🧬',
    title: 'Deep ML Analysis',
    desc: 'Advanced ensemble model trained on real student behavioral data for accurate predictions.',
  },
  {
    icon: '⚡',
    title: 'Instant Results',
    desc: 'Get your mental health score in under a second with our optimized inference pipeline.',
  },
  {
    icon: '🔒',
    title: 'Privacy First',
    desc: 'Your data never leaves your session. No tracking, no storage, completely anonymous.',
  },
  {
    icon: '📱',
    title: 'Digital Habit Insights',
    desc: 'Understand how your screen time, social media usage, and daily unlocks impact your wellbeing.',
  },
  {
    icon: '🎯',
    title: 'Personalized Score',
    desc: 'Tailored assessment based on 12+ lifestyle features unique to your daily routine.',
  },
  {
    icon: '💡',
    title: 'Smart Recommendations',
    desc: 'Receive AI-generated insights and actionable tips to improve your mental health.',
  },
];

export default function Features() {
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
    <section className="features-section" id="features" ref={ref}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">🚀 Features</div>
          <h2 className="section-title">Why Choose MindAI</h2>
          <p className="section-subtitle">
            Built with cutting-edge technology to provide the most accurate and private mental health predictions.
          </p>
        </div>

        <div className="features-grid">
          {FEATURES.map((feature, i) => (
            <div
              className="feature-card glass-card"
              key={i}
              style={{
                animation: visible
                  ? `fadeInUp 0.6s ease ${i * 0.1}s forwards`
                  : 'none',
                opacity: visible ? undefined : 0,
              }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
