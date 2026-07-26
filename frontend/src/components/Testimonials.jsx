import { useEffect, useRef, useState } from 'react';

const TESTIMONIALS = [
  {
    name: 'Ananya Shakya',
    role: 'Clinical Psychologist Expert',
    avatar: 'S',
    text: 'MindAI helped me realize how much my social media habits were affecting my mental health. The recommendations were spot-on and easy to follow.',
    stars: 5,
  },
  {
    name: 'Raj M.',
    role: 'Software Engineer',
    avatar: 'R',
    text: 'The AI prediction was surprisingly accurate. It identified my sleep and exercise patterns as key areas for improvement. Highly recommended!',
    stars: 5,
  },
  {
    name: 'Emily C.',
    role: 'University Researcher',
    avatar: 'E',
    text: "As someone who studies behavioral patterns, I'm impressed by the model's accuracy. The interface is beautiful and the insights are genuinely useful.",
    stars: 5,
  },
];

export default function Testimonials() {
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
    <section className="testimonials-section" id="testimonials" ref={ref}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">💬 Testimonials</div>
          <h2 className="section-title">What People Say</h2>
          <p className="section-subtitle">
            Hear from students, researchers, and professionals who've used MindAI
            to gain insight into their mental wellness.
          </p>
        </div>

        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, i) => (
            <div
              className="testimonial-card glass-card"
              key={i}
              style={{
                animation: visible
                  ? `fadeInUp 0.6s ease ${i * 0.15}s forwards`
                  : 'none',
                opacity: visible ? undefined : 0,
              }}
            >
              <div className="testimonial-stars">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <span className="testimonial-star" key={j}>★</span>
                ))}
              </div>
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.avatar}</div>
                <div>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
