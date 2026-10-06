const flow = [
  ['Climate conditions', 'Temperature · drought · salinity'],
  ['Macro simulation', 'Explore a future field scenario'],
  ['Agricultural risk', 'Stress · health · yield impact'],
  ['Financial exposure', 'Prototype loss estimate'],
  ['Micro adaptation', 'Genomic research concepts'],
]

const technologies = [
  ['React + JavaScript', 'Frontend'],
  ['CSS + Vite', 'Interface'],
  ['Python + Flask', 'Analysis API'],
  ['MongoDB', 'Simulation records'],
  ['REST + fetch()', 'Communication'],
]

function Workflow() {
  return (
    <>
      <section className="workflow-section" id="workflow">
        <div className="section-wrap">
          <div className="section-heading"><p className="eyebrow">One connected research journey</p><h2>Big-picture climate.<br />Small-scale biology.</h2></div>
          <div className="workflow-list">
            {flow.map(([title, detail], index) => <div className="workflow-row" key={title}>
              <span className="workflow-number">0{index + 1}</span><h3>{title}</h3><p>{detail}</p><span className="workflow-arrow" aria-hidden="true">↗</span>
            </div>)}
          </div>
        </div>
      </section>
      <section className="technology-section">
        <div className="section-wrap technology-row">
          <div><p className="eyebrow">Technology · current prototype</p><h2>A simple stack, clearly connected.</h2></div>
          <div className="technology-list">
            {technologies.map(([name, role]) => <div key={name}><strong>{name}</strong><span>{role}</span></div>)}
          </div>
        </div>
      </section>
      <section className="project-section">
        <div className="section-wrap project-grid">
          <div><p className="eyebrow">Research prototype · 2026</p><h2>Honest about<br />what comes next.</h2><p className="project-description">The current prototype demonstrates the workflow using transparent calculations and sample research data. Advanced generative, vision, and genomic models are future integrations.</p></div>
          <div className="project-status">
            <div><span className="status-symbol status-current">✓</span><p><strong>Current prototype</strong><small>Climate stress calculations, risk and financial estimates, result visualization, and database-ready API.</small></p></div>
            <div><span className="status-symbol status-future">＋</span><p><strong>Future AI integration</strong><small>SAM, ControlNet, Stable Diffusion, OpenCV, LLM + RAG, ESM-2, and DNABERT.</small></p></div>
            <div><span className="status-symbol status-future">＋</span><p><strong>Research validation</strong><small>All biological concepts require real data, domain review, and experimental validation.</small></p></div>
          </div>
        </div>
      </section>
      <section className="team-section">
        <div className="section-wrap team-row"><div><p className="eyebrow">Team · final-year GenAI capstone</p><h2>A team project for resilient agriculture.</h2></div><p>AgriResilience-AI<br /><span>Multimodal Generative Visual Climate Simulation and Bio-LLM Genomic Adaptation</span></p></div>
      </section>
    </>
  )
}

export default Workflow