import './App.css';
import Home from './pages/Home';

export default function App() {
  return (
    <>
      {/* Animated gradient mesh background */}
      <div className="app-background"></div>

      {/* Aurora gradient beams */}
      <div className="aurora-overlay">
        <div className="aurora-beam"></div>
        <div className="aurora-beam"></div>
        <div className="aurora-beam"></div>
        <div className="aurora-beam"></div>
      </div>

      {/* Floating particles */}
      <div className="particles-layer">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      {/* Main app */}
      <Home />
    </>
  );
}
