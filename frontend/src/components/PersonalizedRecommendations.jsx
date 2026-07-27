import { useState } from 'react';

const RECOMMENDATION_CARDS = [
  {
    id: 'sleep',
    icon: '🌙',
    title: 'Sleep Optimization',
    collapsedText: 'Improve your sleep quality.',
    expandedItems: [
      'Maintain a consistent bedtime.',
      'Sleep 7–8 hours per night.',
      'Avoid screens 45 minutes before sleep.',
      'Keep your bedroom cool and dark.',
    ],
  },
  {
    id: 'digital',
    icon: '📱',
    title: 'Digital Wellness',
    collapsedText: 'Reduce unnecessary screen exposure.',
    expandedItems: [
      'Limit non-essential social media usage.',
      'Enable focus mode during study/work sessions.',
      'Schedule regular digital detox breaks.',
      'Avoid doom-scrolling before bedtime.',
    ],
  },
  {
    id: 'activity',
    icon: '🏃',
    title: 'Physical Activity',
    collapsedText: 'Stay physically active.',
    expandedItems: [
      'Walk at least 30 minutes daily.',
      'Stretch every hour of sitting.',
      'Exercise three to five days weekly.',
      'Spend active time outdoors in sunlight.',
    ],
  },
  {
    id: 'stress',
    icon: '🧘',
    title: 'Stress Management',
    collapsedText: 'Build healthy coping habits.',
    expandedItems: [
      'Practice daily mindfulness meditation.',
      'Perform deep breathing exercises during work.',
      'Keep a daily gratitude journal.',
      'Connect regularly with family or trusted friends.',
    ],
  },
];

export default function PersonalizedRecommendations() {
  const [openCard, setOpenCard] = useState('sleep');

  const toggle = (id) => {
    setOpenCard(openCard === id ? null : id);
  };

  return (
    <section className="recommendations-section" id="recommendations">
      <div className="container">
        <div className="recommendations-card-container">
          <div className="section-header" style={{ marginBottom: '32px' }}>
            <div className="section-tag">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              Actionable Care Plan
            </div>
            <h2 className="section-title">Your Personalized Wellness Recommendations</h2>
            <p className="section-subtitle">
              Tailored behavioral adjustments recommended by MindAI intelligence to optimize your wellbeing.
            </p>
          </div>

          {/* Top Overall Wellness Improvement Score Banner */}
          <div className="rec-top-banner">
            <div className="rec-banner-text">
              ✨ Estimated Score Improvement Potential
            </div>
            <div className="rec-banner-badge">
              +18% Score Boost
            </div>
          </div>

          {/* Expandable Accordion List */}
          <div className="rec-accordion-list">
            {RECOMMENDATION_CARDS.map((card) => {
              const isOpen = openCard === card.id;
              return (
                <div
                  key={card.id}
                  className={`rec-accordion-item ${isOpen ? 'open' : ''}`}
                >
                  <button
                    className="rec-accordion-header"
                    onClick={() => toggle(card.id)}
                  >
                    <div className="rec-header-left">
                      <div className="rec-icon-box">{card.icon}</div>
                      <div className="rec-header-titles">
                        <h4>{card.title}</h4>
                        <p>{card.collapsedText}</p>
                      </div>
                    </div>
                    <div className="rec-chevron">
                      {isOpen ? '▲' : '▼'}
                    </div>
                  </button>

                  <div className="rec-accordion-body">
                    <div className="rec-checklist">
                      {card.expandedItems.map((item, idx) => (
                        <div className="rec-check-item" key={idx}>
                          <span className="rec-check-mark">✓</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
