import { useEffect, useRef, useState } from 'react';

const TECH_TAGS = [
  'Python', 'Scikit-Learn', 'FastAPI', 'React.js',
  'Pandas', 'NumPy', 'Joblib', 'REST API',
];

const MODEL_STATS = [
  { label: 'Algorithm', value: 'Ensemble Model' },
  { label: 'Features Used', value: '12+' },
  { label: 'Training Data', value: 'Student Survey' },
  { label: 'Score Range', value: '0 – 10' },
  { label: 'API Response', value: '< 50ms' },
  { label: 'Backend', value: 'FastAPI' },
];

export default function AboutModel() {
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
    <section className="about-section" id="about" ref={ref}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">🧬 Technology</div>
          <h2 className="section-title">About the ML Model</h2>
          <p className="section-subtitle">
            Under the hood, MindAI uses an advanced machine learning model trained on
            real behavioral data to deliver accurate predictions.
          </p>
        </div>

        <div className="about-content">
          <div
            className="about-text-block"
            style={{
              animation: visible ? 'fadeInUp 0.7s ease forwards' : 'none',
              opacity: visible ? undefined : 0,
            }}
          >
            <h3>
              Built with <span className="gradient-text">Precision</span>
            </h3>
            <p>
              Our model analyzes 12+ behavioral features including social media usage patterns,
              sleep habits, physical activity levels, and stress indicators to predict a mental
              health wellness score on a scale of 0 to 10.
            </p>
            <p>
              Trained on real-world student survey data, the model captures the complex
              relationships between digital habits and mental well-being, providing
              actionable insights you can use immediately.
            </p>

            <div className="about-tech-tags">
              {TECH_TAGS.map((tag, i) => (
                <span
                  className="about-tech-tag"
                  key={i}
                  style={{
                    animation: visible
                      ? `fadeInUp 0.4s ease ${0.4 + i * 0.07}s forwards`
                      : 'none',
                    opacity: visible ? undefined : 0,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div
            className="about-visual"
            style={{
              animation: visible ? 'fadeInUp 0.7s ease 0.2s forwards' : 'none',
              opacity: visible ? undefined : 0,
            }}
          >
            <div className="about-model-card glass-card">
              <h4 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.1rem',
                fontWeight: 700,
                marginBottom: '20px',
                color: 'var(--text-primary)',
                textAlign: 'center',
                letterSpacing: '0.3px',
              }}>
                Model Specifications
              </h4>
              {MODEL_STATS.map((stat, i) => (
                <div className="about-model-stat" key={i}>
                  <span className="about-model-stat-label">{stat.label}</span>
                  <span className="about-model-stat-value">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
