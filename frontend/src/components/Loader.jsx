export default function Loader() {
  return (
    <div className="loader-overlay">
      <div className="loader-ring">
        <div className="loader-ring-circle"></div>
        <div className="loader-ring-circle"></div>
        <div className="loader-ring-circle"></div>
      </div>
      <div className="loader-text">
        Analyzing your data
        <span className="loader-dots">
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </span>
      </div>
    </div>
  );
}
