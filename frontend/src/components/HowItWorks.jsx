import { useEffect, useRef, useState } from 'react';

const STEPS = [
  {
    image: '/assets/step-clipboard.png',
    title: 'Enter Your Data',
    desc: 'Fill in your daily habits, study routines, digital screen time, and wellbeing details in our simple form.',
  },
  {
    image: '/assets/step-ai-brain.png',
    title: 'AI Analysis',
    desc: 'Our trained machine learning model analyzes your inputs against behavioral patterns in real time.',
  },
  {
    image: '/assets/step-dashboard.png',
    title: 'Mental Health Score',
    desc: 'Receive an instant, objective mental health score on a 0 to 10 scale along with a risk interpretation.',
  },
  {
    image: '/assets/step-recommendations.png',
    title: 'Personalized Recommendations',
    desc: 'Get tailored, actionable advice to optimize your digital lifestyle, sleep, and overall wellness.',
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
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="how-it-works" id="how-it-works" ref={ref}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            Simple Process
          </div>
          <h2 className="section-title">How MindAI Works</h2>
          <p className="section-subtitle">
            Four seamless steps from inputting your daily habits to receiving intelligent healthcare recommendations.
          </p>
        </div>

        <div className="hiw-cards-grid">
          {STEPS.map((step, i) => (
            <div
              className="hiw-card"
              key={i}
              style={{
                animation: visible
                  ? `fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.12}s forwards`
                  : 'none',
                opacity: visible ? undefined : 0,
              }}
            >
              <div className="hiw-card-badge">
                0{i + 1}
              </div>

              <div className="hiw-card-image-wrap">
                <img
                  className="hiw-card-image"
                  src={step.image}
                  alt={step.title}
                  loading="lazy"
                />
              </div>

              <h3 className="hiw-card-title">{step.title}</h3>
              <p className="hiw-card-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
