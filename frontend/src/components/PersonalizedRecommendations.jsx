import { useState } from 'react';

const RECOMMENDATIONS = [
  {
    id: 'sleep',
    category: '🌙 Sleep Health',
    title: 'Circadian Rhythm Realignment',
    priority: 'High',
    impactStars: 5,
    difficulty: 'Easy',
    timeRequired: '10 mins',
    reason: 'MindAI detected sleep irregularities correlated with daily screen time. Stabilizing circadian cues accelerates neuro-cognitive recovery.',
    checklist: [
      'Maintain a fixed 11:00 PM sleep schedule',
      'Disable blue-light screens 45 minutes before sleep',
      'Expose eyes to natural morning sunlight for 10 mins',
      'Keep bedroom temperature at optimal 68°F (20°C)',
    ],
  },
  {
    id: 'digital',
    category: '📱 Digital Wellness',
    title: 'Screen Time & Notification Audit',
    priority: 'High',
    impactStars: 5,
    difficulty: 'Moderate',
    timeRequired: '30 mins',
    reason: 'Your daily unlock rate exceeds baseline thresholds. Reducing rapid notification context-switching lowers ambient anxiety.',
    checklist: [
      'Enable Grayscale mode during deep focus sessions',
      'Mute non-essential social app push notifications',
      'Set strict 45-minute daily limits on entertainment apps',
      'Establish a phone-free desk radius during study hours',
    ],
  },
  {
    id: 'activity',
    category: '🏃 Physical Activity',
    title: 'Daily Kinetic Recovery Flow',
    priority: 'Medium',
    impactStars: 4,
    difficulty: 'Easy',
    timeRequired: '20 mins',
    reason: 'Physical activity boosts BDNF levels and enhances dopamine regulation, offsetting sedentary study fatigue.',
    checklist: [
      'Complete a 20-minute brisk morning walk',
      'Perform 5-minute desk stretches every 2 hours',
      'Hydrate with 500ml water immediately upon waking',
      'Log 7,000+ daily steps in health tracking app',
    ],
  },
  {
    id: 'stress',
    category: '🧘 Stress Management',
    title: 'Mindful Somatic Resets',
    priority: 'High',
    impactStars: 5,
    difficulty: 'Easy',
    timeRequired: '5 mins',
    reason: 'Somatic 4-7-8 breathing triggers parasympathetic nervous system activation, instantly reducing physiological stress.',
    checklist: [
      'Practice 3 cycles of box breathing twice daily',
      'Perform a 5-minute guided evening body scan',
      'Log daily mood triggers in reflection journal',
      'Take 3 intentional silent pauses during study hours',
    ],
  },
  {
    id: 'lifestyle',
    category: '🍎 Healthy Lifestyle',
    title: 'Nutritional & Cognitive Balance',
    priority: 'Low',
    impactStars: 3,
    difficulty: 'Moderate',
    timeRequired: '15 mins',
    reason: 'Stable glycemic index meals prevent mid-afternoon brain fog and mood fluctuations.',
    checklist: [
      'Replace late-day caffeine with herbal chamomile tea',
      'Incorporate Omega-3 rich foods into lunch meal',
      'Maintain consistent meal timings without skipping',
      'Practice mindful eating away from digital screens',
    ],
  },
];

export default function PersonalizedRecommendations() {
  const [openId, setOpenId] = useState('sleep');
  // Track checked state per item id: { [recId]: Set of checked indexes }
  const [checkedMap, setCheckedMap] = useState({
    sleep: new Set([0, 1]),
    digital: new Set([0]),
    activity: new Set([0, 2]),
    stress: new Set([0]),
    lifestyle: new Set(),
  });

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  const toggleCheck = (recId, idx, e) => {
    e.stopPropagation();
    setCheckedMap((prev) => {
      const currentSet = new Set(prev[recId] || []);
      if (currentSet.has(idx)) {
        currentSet.delete(idx);
      } else {
        currentSet.add(idx);
      }
      return { ...prev, [recId]: currentSet };
    });
  };

  return (
    <section className="recommendations-section" id="recommendations">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            AI Wellness Action Plan
          </div>
          <h2 className="section-title">Personalized Care Plan</h2>
          <p className="section-subtitle">
            Targeted behavioral adjustments synthesized by MindAI intelligence to optimize your mental health score.
          </p>
        </div>

        <div className="recommendations-container">
          {/* Top Summary Glass Card */}
          <div className="rec-summary-card glass-card">
            <div className="rec-summary-header">
              <div className="rec-summary-badge-wrap">
                <span className="rec-summary-icon">✨</span>
                <div>
                  <h3 className="rec-summary-title">Estimated Wellness Improvement</h3>
                  <p className="rec-summary-sub">Based on your 12 behavioral input signals</p>
                </div>
              </div>
              <div className="rec-summary-score">+18%</div>
            </div>

            {/* Animated Horizontal Progress Bar */}
            <div className="rec-summary-progress-wrap">
              <div className="rec-summary-progress-bar">
                <div className="rec-summary-progress-fill" style={{ width: '85%' }}></div>
              </div>
              <div className="rec-summary-progress-labels">
                <span>Current Profile</span>
                <span className="target-label">Target Wellness Goal (+18% Boost)</span>
              </div>
            </div>

            <p className="rec-summary-explanation">
              MindAI predictive model identified 5 high-impact habit optimizations. Completing these actions over the next 14 days is projected to increase your overall wellness balance score from <strong>6.8 to 8.4</strong>.
            </p>
          </div>

          {/* Expandable Action Cards Grid */}
          <div className="rec-cards-stack">
            {RECOMMENDATIONS.map((rec) => {
              const isOpen = openId === rec.id;
              const checkedIndices = checkedMap[rec.id] || new Set();
              const totalItems = rec.checklist.length;
              const completedCount = checkedIndices.size;
              const pct = Math.round((completedCount / totalItems) * 100);

              return (
                <div
                  key={rec.id}
                  className={`rec-item-card glass-card ${isOpen ? 'is-expanded' : ''}`}
                >
                  <button
                    className="rec-item-header"
                    onClick={() => toggleAccordion(rec.id)}
                  >
                    <div className="rec-item-left">
                      <div className="rec-cat-tag">{rec.category}</div>
                      <h4 className="rec-item-title">{rec.title}</h4>
                      <div className="rec-meta-pills">
                        <span className={`priority-pill priority-${rec.priority.toLowerCase()}`}>
                          {rec.priority} Priority
                        </span>
                        <span className="meta-pill">
                          Impact: {'★'.repeat(rec.impactStars)}{'☆'.repeat(5 - rec.impactStars)}
                        </span>
                        <span className="meta-pill">Diff: {rec.difficulty}</span>
                        <span className="meta-pill">⏱️ {rec.timeRequired}</span>
                      </div>
                    </div>

                    <div className="rec-item-right">
                      {/* Compact Progress Badge */}
                      <div className="compact-pct-badge">{pct}% Done</div>
                      <div className="rec-expand-chevron">{isOpen ? '−' : '+'}</div>
                    </div>
                  </button>

                  {/* Expandable Details Body */}
                  <div className="rec-item-body">
                    <div className="rec-body-inner">
                      {/* Why MindAI Recommends This */}
                      <div className="rec-why-box">
                        <div className="rec-why-title">💡 Why MindAI recommends this</div>
                        <p className="rec-why-text">{rec.reason}</p>
                      </div>

                      {/* Action Checklist with animated checkboxes */}
                      <div className="rec-checklist-wrap">
                        <div className="rec-checklist-title">Action Checklist</div>
                        <div className="rec-checklist-items">
                          {rec.checklist.map((itemText, idx) => {
                            const isChecked = checkedIndices.has(idx);
                            return (
                              <div
                                key={idx}
                                className={`rec-check-row ${isChecked ? 'is-checked' : ''}`}
                                onClick={(e) => toggleCheck(rec.id, idx, e)}
                              >
                                <div className="custom-checkbox">
                                  {isChecked && <span className="check-svg">✓</span>}
                                </div>
                                <span className="check-text">{itemText}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Progress Tracker */}
                      <div className="rec-tracker-wrap">
                        <div className="rec-tracker-info">
                          <span>Completion Progress ({completedCount}/{totalItems} tasks)</span>
                          <span className="tracker-pct">{pct}%</span>
                        </div>
                        <div className="rec-tracker-bar">
                          <div
                            className="rec-tracker-fill"
                            style={{ width: `${pct}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Weekly Wellness Challenge Box */}
          <div className="weekly-challenge-card glass-card">
            <div className="challenge-icon-box">🏆</div>
            <div className="challenge-content">
              <div className="challenge-badge">Weekly AI Wellness Challenge</div>
              <h4 className="challenge-title">Sleep before 11 PM for five consecutive days</h4>
              <p className="challenge-desc">Maintain an uninterrupted circadian rhythm to boost cognitive recovery.</p>
            </div>
            <div className="challenge-reward-badge">
              +0.6 Wellness Points
            </div>
          </div>

          {/* Bottom Dual Action Buttons */}
          <div className="rec-actions-footer">
            <button className="btn-primary rec-btn-download">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download Wellness Plan
            </button>
            <button className="btn-secondary rec-btn-coach">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              Talk to MindAI Coach
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
