export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">🧠</div>
            <span className="footer-brand-text">MindAI</span>
          </div>

          <div className="footer-copyright">
            © {year} <span className="highlight">MindAI</span> — AI-Powered Mental Health Analytics. Built with ❤️ &amp; ML
          </div>

          <div className="footer-links">
            <a href="#hero">Home</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#prediction">Predict</a>
            <a href="#faq">FAQ</a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
