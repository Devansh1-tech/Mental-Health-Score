import { useEffect, useRef, useState } from 'react';

const STEPS = [
  {
    icon: '📝',
    title: 'Enter Your Data',
    desc: 'Fill in details about your lifestyle, digital habits, and daily routines.',
  },
  {
    icon: '🤖',
    title: 'AI Analyzes',
    desc: 'Our ML model processes 12+ features to understand behavioral patterns.',
  },
  {
    icon: '📊',
    title: 'Get Your Score',
    desc: 'Receive a personalized mental health score from 0 to 10 in seconds.',
  },
  {
    icon: '💡',
    title: 'Actionable Insights',
    desc: 'Get tailored recommendations to improve your mental wellness.',
  },
];

export default function HowItWorks() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="how-it-works" id="how-it-works" ref={ref}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">⚡ Process</div>
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            Four simple steps to understand your mental wellness using cutting-edge AI technology.
          </p>
        </div>

        <div className="timeline">
          {STEPS.map((step, i) => (
            <div
              className="timeline-step"
              key={i}
              style={{
                animation: visible
                  ? `fadeInUp 0.6s ease ${i * 0.15}s forwards`
                  : 'none',
                opacity: visible ? undefined : 0,
              }}
            >
              <div className="timeline-step-number">{String(i + 1).padStart(2, '0')}</div>
              <span className="timeline-step-icon">{step.icon}</span>
              <h4 className="timeline-step-title">{step.title}</h4>
              <p className="timeline-step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
