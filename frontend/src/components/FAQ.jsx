import { useState } from 'react';

const FAQ_DATA = [
  {
    question: 'How accurate is the MindAI prediction?',
    answer:
      'MindAI uses an ensemble machine learning model trained on real student behavioral data. While no model is 100% accurate, our predictions provide a strong indication of mental wellness trends based on your lifestyle inputs. Always consult a professional for clinical assessments.',
  },
  {
    question: 'Is my data stored or shared?',
    answer:
      'No. Your data is processed entirely in real-time and never stored on our servers. We do not track, log, or share any personal information. Your privacy is our top priority.',
  },
  {
    question: 'What does the score mean?',
    answer:
      'The score ranges from 0 to 10. Scores of 8+ indicate excellent mental health, 6-7.9 suggest good health with minor improvements possible, 4-5.9 indicate moderate risk, and below 4 signals high risk. Each result includes personalized recommendations.',
  },
  {
    question: 'Can this replace professional mental health advice?',
    answer:
      'Absolutely not. MindAI is a predictive tool designed for awareness and education. It should not replace professional mental health evaluation or treatment. If you are experiencing mental health difficulties, please reach out to a qualified professional.',
  },
  {
    question: 'What features does the model use?',
    answer:
      'The model analyzes 12+ features including age, gender, country, academic level, most-used social media platform, purpose of use, daily usage hours, phone unlocks, study hours, physical activity, sleep hours, and stress level.',
  },
  {
    question: 'What technology stack powers MindAI?',
    answer:
      'MindAI is built with React.js for the frontend, FastAPI (Python) for the backend API, and Scikit-Learn for the machine learning model. The model is serialized with Joblib for fast inference.',
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
          <div className="section-tag">❓ FAQ</div>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Everything you need to know about MindAI and how it works.
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
