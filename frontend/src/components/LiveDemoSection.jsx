import { useState } from 'react';

const PROFILES = [
  {
    id: 'student',
    name: 'Student Profile',
    data: {
      age: 21,
      gender: 'Male',
      platform: 'Instagram',
      usage: '4.5 hrs/day',
      unlocks: '65 times',
      sleep: '6.0 hrs',
      activity: '1.0 hr',
      stress: 'High',
    },
    predictedScore: 6.42,
    level: 'Good Balance',
  },
  {
    id: 'engineer',
    name: 'Software Engineer',
    data: {
      age: 26,
      gender: 'Female',
      platform: 'Twitter',
      usage: '6.0 hrs/day',
      unlocks: '90 times',
      sleep: '7.5 hrs',
      activity: '1.5 hrs',
      stress: 'Medium',
    },
    predictedScore: 7.85,
    level: 'Optimal Wellness',
  },
  {
    id: 'researcher',
    name: 'Researcher Profile',
    data: {
      age: 29,
      gender: 'Female',
      platform: 'LinkedIn',
      usage: '2.5 hrs/day',
      unlocks: '30 times',
      sleep: '8.0 hrs',
      activity: '2.0 hrs',
      stress: 'Low',
    },
    predictedScore: 8.95,
    level: 'Optimal Wellness',
  },
];

export default function LiveDemoSection() {
  const [activeProfile, setActiveProfile] = useState(PROFILES[0]);
  const [animating, setAnimating] = useState(false);

  const selectProfile = (profile) => {
    setAnimating(true);
    setActiveProfile(profile);
    setTimeout(() => setAnimating(false), 500);
  };

  return (
    <section className="demo-section" id="demo">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Interactive Sandbox
          </div>
          <h2 className="section-title">Live AI Demonstration</h2>
          <p className="section-subtitle">
            Select a sample profile below to watch how MindAI synthesizes behavioral features into a wellness score in real time.
          </p>
        </div>

        <div className="demo-card">
          {/* Profile Selector */}
          <div className="demo-profiles">
            {PROFILES.map((p) => (
              <button
                key={p.id}
                className={`demo-profile-btn ${activeProfile.id === p.id ? 'active' : ''}`}
                onClick={() => selectProfile(p)}
              >
                {p.name}
              </button>
            ))}
          </div>

          {/* Interactive Screen */}
          <div className="demo-screen">
            {/* Input Attributes */}
            <div className="demo-inputs">
              <div className="demo-input-row">
                <span className="demo-input-label">Age / Gender</span>
                <span className="demo-input-val">{activeProfile.data.age} / {activeProfile.data.gender}</span>
              </div>
              <div className="demo-input-row">
                <span className="demo-input-label">Primary Platform</span>
                <span className="demo-input-val">{activeProfile.data.platform}</span>
              </div>
              <div className="demo-input-row">
                <span className="demo-input-label">Daily Screen Time</span>
                <span className="demo-input-val">{activeProfile.data.usage}</span>
              </div>
              <div className="demo-input-row">
                <span className="demo-input-label">Phone Unlocks</span>
                <span className="demo-input-val">{activeProfile.data.unlocks}</span>
              </div>
              <div className="demo-input-row">
                <span className="demo-input-label">Nightly Sleep</span>
                <span className="demo-input-val">{activeProfile.data.sleep}</span>
              </div>
              <div className="demo-input-row">
                <span className="demo-input-label">Physical Activity</span>
                <span className="demo-input-val">{activeProfile.data.activity}</span>
              </div>
            </div>

            {/* Simulated Prediction Result Output */}
            <div className="demo-result-box">
              <div style={{ fontSize: '0.78rem', color: '#94A3B8', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>
                Simulated AI Score
              </div>
              <div className="demo-score-num" style={{ opacity: animating ? 0.3 : 1, transition: 'opacity 0.3s' }}>
                {activeProfile.predictedScore.toFixed(2)}
              </div>
              <div className="demo-score-label">
                ✨ {activeProfile.level}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: '12px' }}>
                Inference speed: 38ms
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
