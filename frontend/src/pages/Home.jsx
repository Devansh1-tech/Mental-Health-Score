import { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import PipelineSection from '../components/PipelineSection';
import AIEngineSection from '../components/AIEngineSection';
import BentoSection from '../components/BentoSection';
import LiveDemoSection from '../components/LiveDemoSection';
import ModelPerformance from '../components/ModelPerformance';
import PredictionForm from '../components/PredictionForm';
import CommandCenterLoader from '../components/CommandCenterLoader';
import WellnessDashboardResult from '../components/WellnessDashboardResult';
import PersonalizedRecommendations from '../components/PersonalizedRecommendations';
import TestimonialSection from '../components/TestimonialSection';
import ProfessionalPerspectiveSection from '../components/ProfessionalPerspectiveSection';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(null);
  const [error, setError] = useState(null);

  const handleResult = (predictedScore) => {
    setError(null);
    setScore(predictedScore);
    setTimeout(() => {
      document.getElementById('result')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleError = (message) => {
    setScore(null);
    setError(message);
  };

  const handleReset = () => {
    setScore(null);
    setError(null);
    document.getElementById('prediction')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Navbar />
      <Hero />
      <PipelineSection />
      <AIEngineSection />
      <BentoSection />
      <LiveDemoSection />
      <ModelPerformance />

      <PredictionForm
        onResult={handleResult}
        onError={handleError}
        loading={loading}
        setLoading={setLoading}
      />

      {loading && <CommandCenterLoader />}

      {!loading && score !== null && (
        <>
          <WellnessDashboardResult score={score} onReset={handleReset} />
          <PersonalizedRecommendations />
        </>
      )}

      {!loading && error && (
        <section className="result-section">
          <div className="container">
            <div className="error-card">
              <div className="error-icon">❌</div>
              <h3 className="error-title">Prediction Failed</h3>
              <p className="error-message">
                {error}. Please check your connection and try again.
              </p>
              <button className="error-btn" onClick={handleReset}>
                🔄 Try Again
              </button>
            </div>
          </div>
        </section>
      )}

      <TestimonialSection />
      <ProfessionalPerspectiveSection />
      <FAQ />
      <Footer />
    </>
  );
}
