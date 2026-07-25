export default function Developer() {
  return (
    <section className="developer-section" id="developer">
      <div className="container">
        <div className="developer-card glass-card">
          <div className="developer-avatar">👨‍💻</div>
          <h3 className="developer-name">Built by Developers, for Everyone</h3>
          <p className="developer-role">AI & Machine Learning Engineering</p>
          <p className="developer-bio">
            MindAI is an open-source project that combines the power of machine learning
            with modern web technologies to make mental health awareness more accessible.
            Built with passion for technology and care for mental wellness.
          </p>
          <div className="developer-socials">
            <a
              href="https://github.com"
              className="developer-social-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              ⌨️
            </a>
            <a
              href="https://linkedin.com"
              className="developer-social-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              💼
            </a>
            <a
              href="https://twitter.com"
              className="developer-social-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              🐦
            </a>
            <a
              href="mailto:hello@mindai.dev"
              className="developer-social-link"
              aria-label="Email"
            >
              ✉️
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
