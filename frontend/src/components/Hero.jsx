function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-shade" />
      <div className="hero-content">
        <p className="hero-kicker"><span className="status-dot" /> CLIMATE RESILIENCE, MADE VISIBLE</p>
        <h1>See the Future<br />of Your <em>Crop.</em></h1>
        <p className="hero-description">
          Simulate climate stress, understand agricultural risk, and explore AI-driven
          biological adaptation in one platform.
        </p>
        <div className="hero-actions">
          <a className="button button-lime" href="#simulator">Launch climate simulator <span aria-hidden="true">↘</span></a>
          <a className="button button-outline" href="#genomics">Explore genomic AI <span aria-hidden="true">↘</span></a>
        </div>
      </div>
      <div className="hero-note">
        <span className="note-index">01 / 04</span>
        <span>From climate signal<br />to adaptation insight</span>
        <span className="note-line" />
        <span className="note-caption">A research prototype</span>
      </div>
      <a className="hero-scroll" href="#overview">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></a>
    </section>
  )
}

export default Hero