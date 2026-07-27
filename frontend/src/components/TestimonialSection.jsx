import { useEffect, useRef, useState } from 'react';

const TESTIMONIALS = [
  {
    name: 'Ananya Shakya',
    role: 'Psychologist',
    location: 'Gwalior',
    initials: 'AS',
    stars: '⭐⭐⭐⭐⭐',
    date: 'July 2026',
    text: 'MindAI gave me a better understanding of how my daily habits were affecting my mental wellness. The insights encouraged me to improve my sleep routine and reduce unnecessary screen time.',
  },
  {
    name: 'Priya Verma',
    role: 'University Student',
    location: 'Delhi',
    initials: 'PV',
    stars: '⭐⭐⭐⭐⭐',
    date: 'June 2026',
    text: 'The assessment was simple and the recommendations felt practical. I especially liked the clean interface and the detailed wellness dashboard.',
  },
  {
    name: 'Rahul Mehta',
    role: 'Marketing Professional',
    location: 'Mumbai',
    initials: 'RM',
    stars: '⭐⭐⭐⭐⭐',
    date: 'July 2026',
    text: 'The AI analysis was fast and easy to understand. The visualization made the results feel much more engaging than a traditional questionnaire.',
  },
];

export default function TestimonialSection() {
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef(null);
  const scrollRef = useRef(null);

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

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const index = Math.round(scrollLeft / clientWidth);
    setActiveIndex(index);
  };

  return (
    <section className="testimonial-section" id="testimonials" ref={ref}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            User Stories
          </div>
          <h2 className="section-title">What People Say About MindAI</h2>
          <p className="section-subtitle">
            Hear how students and working professionals use MindAI intelligence to optimize their daily lives.
          </p>
        </div>

        {/* Swipeable Testimonials Carousel */}
        <div
          className="testimonial-grid mobile-carousel"
          ref={scrollRef}
          onScroll={handleScroll}
        >
          {TESTIMONIALS.map((t, i) => (
            <div
              className="t-card"
              key={i}
              style={{
                animation: visible
                  ? `fadeInUp 0.7s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.12}s forwards`
                  : 'none',
                opacity: visible ? undefined : 0,
              }}
            >
              <div className="t-quote-mark">“</div>
              <div className="t-stars">{t.stars}</div>
              <p className="t-text">"{t.text}"</p>

              <div className="t-author">
                <div className="t-avatar">{t.initials}</div>
                <div>
                  <div className="t-name">{t.name}</div>
                  <div className="t-meta">{t.role} • {t.location} • {t.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Swipe Pagination Dots */}
        <div className="carousel-dots">
          {TESTIMONIALS.map((_, idx) => (
            <span
              key={idx}
              className={`carousel-dot ${activeIndex === idx ? 'active' : ''}`}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
}
