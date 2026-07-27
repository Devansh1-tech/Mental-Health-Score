import { useState } from 'react';

const GENDERS = ['Male', 'Female'];
const ACADEMIC_LEVELS = ['High School', 'Undergraduate', 'Graduate'];
const PLATFORMS = [
  'Facebook', 'LinkedIn', 'Instagram', 'Snapchat', 'Twitter',
  'YouTube', 'TikTok', 'LINE', 'KakaoTalk', 'VKontakte', 'WhatsApp', 'WeChat',
];
const PURPOSES = ['Networking', 'Education', 'Entertainment', 'News'];
const STRESS_LEVELS = ['Low', 'Medium', 'High', 'Very High'];

const FIELD_ICONS = {
  age: '🎂',
  gender: '👤',
  country: '🌍',
  academic_level: '🎓',
  most_used_platform: '📱',
  purpose_of_use: '🎯',
  avg_daily_usage_hours: '⏱️',
  daily_unlocks: '🔓',
  study_hours: '📚',
  physical_activity_hours: '🏃',
  sleep_hours_per_night: '😴',
  stress_level: '🧘',
};

const INITIAL_FORM = {
  age: '',
  gender: '',
  country: '',
  academic_level: '',
  most_used_platform: '',
  purpose_of_use: '',
  avg_daily_usage_hours: '',
  daily_unlocks: '',
  study_hours: '',
  physical_activity_hours: '',
  sleep_hours_per_night: '',
  stress_level: '',
};

function validate(form) {
  const errors = {};

  if (form.age === '') {
    errors.age = 'Age is required';
  } else {
    const age = Number(form.age);
    if (isNaN(age) || age < 10 || age > 100) {
      errors.age = 'Age must be between 10 and 100';
    }
  }

  if (!form.gender) errors.gender = 'Please select a gender';
  if (!form.country.trim()) errors.country = 'Country is required';
  if (!form.academic_level) errors.academic_level = 'Please select academic level';
  if (!form.most_used_platform) errors.most_used_platform = 'Please select a platform';
  if (!form.purpose_of_use) errors.purpose_of_use = 'Please select purpose of use';

  const hourFields = [
    { key: 'avg_daily_usage_hours', label: 'Daily usage hours' },
    { key: 'study_hours', label: 'Study hours' },
    { key: 'physical_activity_hours', label: 'Physical activity hours' },
    { key: 'sleep_hours_per_night', label: 'Sleep hours' },
  ];

  hourFields.forEach(({ key, label }) => {
    if (form[key] === '') {
      errors[key] = `${label} is required`;
    } else {
      const val = Number(form[key]);
      if (isNaN(val) || val < 0 || val > 24) {
        errors[key] = `${label} must be between 0 and 24`;
      }
    }
  });

  if (form.daily_unlocks === '') {
    errors.daily_unlocks = 'Daily unlocks is required';
  } else {
    const val = Number(form.daily_unlocks);
    if (isNaN(val) || val < 0) {
      errors.daily_unlocks = 'Daily unlocks must be 0 or more';
    }
  }

  if (!form.stress_level) errors.stress_level = 'Please select stress level';

  return errors;
}

export default function PredictionForm({ onResult, onError, loading, setLoading }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const allErrors = validate(form);
    if (allErrors[name]) {
      setErrors((prev) => ({ ...prev, [name]: allErrors[name] }));
    }
  };

  const handleRipple = (e) => {
    const btn = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    ripple.className = 'ripple';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleRipple(e);

    const validationErrors = validate(form);
    setErrors(validationErrors);

    const allTouched = {};
    Object.keys(form).forEach((key) => (allTouched[key] = true));
    setTouched(allTouched);

    if (Object.keys(validationErrors).length > 0) return;

    const payload = {
      age: Number(form.age),
      gender: form.gender,
      country: form.country.trim(),
      academic_level: form.academic_level,
      most_used_platform: form.most_used_platform,
      purpose_of_use: form.purpose_of_use,
      avg_daily_usage_hours: Number(form.avg_daily_usage_hours),
      daily_unlocks: Number(form.daily_unlocks),
      study_hours: Number(form.study_hours),
      physical_activity_hours: Number(form.physical_activity_hours),
      sleep_hours_per_night: Number(form.sleep_hours_per_night),
      stress_level: form.stress_level,
    };

    setLoading(true);

    try {
      const response = await fetch("https://mental-health-score-5v35.onrender.com/predict", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      onResult(data.predicted_mental_health_score);
    } catch (err) {
      onError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderField = (name, label, type = 'text', options = null, placeholder = '') => {
    const hasError = touched[name] && errors[name];
    const icon = FIELD_ICONS[name] || '📋';
    return (
      <div className="form-group" key={name}>
        <label className="form-label" htmlFor={name}>
          <span className="form-label-icon">{icon}</span>
          {label}
        </label>
        {options ? (
          <select
            id={name}
            name={name}
            className={`form-select ${hasError ? 'error' : ''}`}
            value={form[name]}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="">Select {label}</option>
            {options.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            className={`form-input ${hasError ? 'error' : ''}`}
            value={form[name]}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            step={type === 'number' ? 'any' : undefined}
            min={type === 'number' ? '0' : undefined}
          />
        )}
        {hasError && (
          <div className="validation-message">
            <span>⚠️</span> {errors[name]}
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="prediction-section" id="prediction">
      <div className="container">
        <div className="prediction-container">
          <div className="prediction-layout">
            {/* Left Column: Info & Decorative Illustration */}
            <div className="prediction-info">
              <div className="prediction-info-tag">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                Prediction Engine
              </div>
              <h2>Analyze Your Mental Wellness</h2>
              <p>
                Complete our behavioral assessment form to calculate your AI mental wellness score with instant precision.
              </p>

              <div className="prediction-deco">
                <div className="prediction-deco-item">
                  <div className="prediction-deco-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>
                  <div className="prediction-deco-text">100% Private & Anonymous Session</div>
                </div>

                <div className="prediction-deco-item">
                  <div className="prediction-deco-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                  </div>
                  <div className="prediction-deco-text">Instant Sub-second Model Inference</div>
                </div>

                <div className="prediction-deco-item">
                  <div className="prediction-deco-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <div className="prediction-deco-text">Tailored Healthcare Recommendations</div>
                </div>
              </div>
            </div>

            {/* Right Column: Prediction Form */}
            <div className="prediction-form-panel">
              <form onSubmit={handleSubmit} noValidate>
                <div className="form-grid">
                  {/* Personal Information */}
                  <div className="form-section-title">👤 Personal Profile</div>
                  {renderField('age', 'Age', 'number', null, 'e.g. 21')}
                  {renderField('gender', 'Gender', 'text', GENDERS)}
                  {renderField('country', 'Country', 'text', null, 'e.g. United States')}
                  {renderField('academic_level', 'Academic Level', 'text', ACADEMIC_LEVELS)}

                  <div className="form-divider"></div>

                  {/* Digital Habits */}
                  <div className="form-section-title">📱 Digital Habits</div>
                  {renderField('most_used_platform', 'Primary Social Platform', 'text', PLATFORMS)}
                  {renderField('purpose_of_use', 'Primary Purpose', 'text', PURPOSES)}
                  {renderField('avg_daily_usage_hours', 'Daily Usage (Hours)', 'number', null, 'e.g. 4')}
                  {renderField('daily_unlocks', 'Daily Unlocks', 'number', null, 'e.g. 50')}

                  <div className="form-divider"></div>

                  {/* Lifestyle */}
                  <div className="form-section-title">🏃 Lifestyle & Wellbeing</div>
                  {renderField('study_hours', 'Study Hours / Day', 'number', null, 'e.g. 5')}
                  {renderField('physical_activity_hours', 'Physical Activity (Hours)', 'number', null, 'e.g. 1.5')}
                  {renderField('sleep_hours_per_night', 'Sleep Hours / Night', 'number', null, 'e.g. 7')}
                  {renderField('stress_level', 'Current Stress Level', 'text', STRESS_LEVELS)}

                  {/* Submit Action */}
                  <div className="form-actions">
                    <button
                      type="submit"
                      className="btn-primary predict-btn"
                      disabled={loading}
                      onClick={handleRipple}
                    >
                      {loading ? (
                        <>
                          <span className="spinner"></span>
                          Processing...
                        </>
                      ) : (
                        <>Start Prediction <span className="btn-arrow">→</span></>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
