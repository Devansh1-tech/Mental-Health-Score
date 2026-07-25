import { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import Features from '../components/Features';
import Stats from '../components/Stats';
import PredictionForm from '../components/PredictionForm';
import Loader from '../components/Loader';
import ResultCard from '../components/ResultCard';
import AboutModel from '../components/AboutModel';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Developer from '../components/Developer';
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
      <HowItWorks />
      <Features />
      <Stats />

      <PredictionForm
        onResult={handleResult}
        onError={handleError}
        loading={loading}
        setLoading={setLoading}
      />

      {loading && <Loader />}

      {!loading && score !== null && (
        <ResultCard score={score} onReset={handleReset} />
      )}

      {!loading && error && (
        <section className="result-section">
          <div className="container">
            <div className="error-card glass-card">
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

      <AboutModel />
      <Testimonials />
      <FAQ />
      <Developer />
      <Footer />
    </>
  );
}
