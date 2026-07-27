import { useState } from 'react';

const FAQ_DATA = [
  {
    question: 'How accurate is the MindAI prediction?',
    answer:
      'MindAI uses an ensemble machine learning model trained on empirical student behavioral datasets. Achieving 95% cross-validated accuracy, our model provides a highly reliable indication of mental wellness trends based on lifestyle signals. Note that it is designed for awareness, not clinical diagnosis.',
  },
  {
    question: 'Is my personal data stored or shared?',
    answer:
      'No. MindAI is engineered with privacy as a foundational principle. Your input parameters are processed ephemerally in real time and are never stored in any database or shared with third parties.',
  },
  {
    question: 'What does the score range mean?',
    answer:
      'Scores range from 0.00 to 10.00. Scores of 8.0+ indicate optimal mental wellness, 6.0–7.9 signal good balance with minor optimization areas, 4.0–5.9 suggest moderate risk factors, and scores below 4.0 highlight elevated risk patterns.',
  },
  {
    question: 'Can MindAI replace a professional therapist?',
    answer:
      'No. MindAI is an intelligent predictive tool aimed at preventive awareness and daily habit tracking. If you are experiencing distress, we encourage consulting a certified healthcare professional.',
  },
  {
    question: 'What input parameters are evaluated?',
    answer:
      'Our model evaluates 12+ signals including age, academic level, primary social platform, daily screen time, phone unlocks, study hours, physical activity, sleep duration, and self-reported stress levels.',
  },
  {
    question: 'What architecture powers MindAI?',
    answer:
      'MindAI features a Vite + React frontend styled with custom glassmorphism design tokens, backed by a FastAPI microservice and Scikit-Learn ensemble model serialized via Joblib for sub-second inference.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

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
            FAQ
          </div>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Everything you need to know about MindAI technology, privacy, and clinical metrics.
          </p>
        </div>

        <div className="faq-list">
          {FAQ_DATA.map((item, i) => (
            <div
              className={`faq-item ${openIndex === i ? 'open' : ''}`}
              key={i}
            >
              <button className="faq-question" onClick={() => toggle(i)}>
                <span>{item.question}</span>
                <span className="faq-chevron">▼</span>
              </button>
              <div className="faq-answer">
                <div className="faq-answer-content">{item.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
