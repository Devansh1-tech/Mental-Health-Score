import { useState } from 'react';

const FAQ_DATA = [
  {
    question: 'How accurate is the MindAI prediction engine?',
    answer:
      'MindAI utilizes an ensemble machine learning model trained on empirical behavioral datasets. Achieving 95% cross-validated accuracy, our model provides a highly reliable indication of mental wellness trends based on daily lifestyle signals.',
  },
  {
    question: 'Is my personal behavioral data stored or shared?',
    answer:
      'No. MindAI is engineered with privacy as a foundational principle. Your input parameters are processed ephemerally in real time and are never stored in any database or shared with third parties.',
  },
  {
    question: 'What does the mental wellness score range indicate?',
    answer:
      'Scores range from 0.00 to 10.00. Scores of 8.0+ indicate optimal mental wellness, 6.0–7.9 signal good balance with minor optimization areas, 4.0–5.9 suggest moderate risk factors, and scores below 4.0 highlight elevated risk patterns.',
  },
  {
    question: 'Can MindAI replace a licensed professional therapist?',
    answer:
      'No. MindAI is an intelligent predictive tool aimed at preventive awareness and habit tracking. If you are experiencing distress, we encourage consulting a certified healthcare professional.',
  },
  {
    question: 'What specific behavioral signals are evaluated?',
    answer:
      'Our model evaluates 12+ signals including age, academic level, primary social platform, daily screen time, phone unlocks, study hours, physical activity, sleep duration, and self-reported stress levels.',
  },
  {
    question: 'What framework and architecture power MindAI?',
    answer:
      'MindAI features a Vite + React frontend styled with custom glassmorphism design tokens, backed by a FastAPI microservice and Scikit-Learn ensemble model serialized via Joblib for sub-second inference.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0); // First item open by default for preview

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="faq-section" id="faq">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            Support & Knowledge
          </div>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Everything you need to know about MindAI technology, data privacy, and predictive algorithms.
          </p>
        </div>

        <div className="faq-accordion-container">
          {FAQ_DATA.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`faq-glass-card ${isOpen ? 'is-open' : ''}`}
              >
                <button
                  className="faq-glass-trigger"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-question-text">{item.question}</span>
                  <div className="faq-plus-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" className="icon-v-line" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </div>
                </button>
                <div className="faq-glass-collapse">
                  <div className="faq-answer-inner">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
