function Navbar() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="AgriResilience AI home">
        <span className="brand-mark" aria-hidden="true">A</span>
        <span>AgriResilience<span className="brand-ai">.AI</span></span>
      </a>
      <nav className="main-nav" aria-label="Main navigation">
        <a href="#overview">Platform</a>
        <a href="#simulator">Simulator</a>
        <a href="#genomics">Biological research</a>
        <a href="#workflow">About</a>
      </nav>
      <a className="nav-action" href="#simulator">Run a scenario <span aria-hidden="true">↗</span></a>
    </header>
  )
}

export default Navbar