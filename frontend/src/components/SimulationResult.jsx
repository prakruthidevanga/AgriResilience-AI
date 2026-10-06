function Metric({ label, value, unit, detail }) {
  return <div className="metric-card"><span>{label}</span><strong>{value}<small>{unit}</small></strong><p>{detail}</p></div>
}

function SimulationResult({ results }) {
  return (
    <section className="section-wrap result-block" id="field-result">
      <div className="result-heading">
        <div><p className="eyebrow">Prototype visual simulation</p><h2>A possible future, made tangible.</h2></div>
        <span className="prototype-tag">DEMO RESULT</span>
      </div>
      <p className="result-context">{results.crop} · {results.simulationPeriod} day scenario · simplified climate-stress calculation</p>
      <div className="field-comparison">
        <figure className="field-image current-field">
          <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1100&q=85" alt="Green agricultural fields under a bright sky" />
          <figcaption><span>REFERENCE FIELD</span><strong>Current field condition</strong></figcaption>
        </figure>
        <figure className="field-image future-field">
          <img src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1100&q=85" alt="Crop rows showing a dry field condition" />
          <figcaption><span>PROTOTYPE VISUAL SIMULATION</span><strong>Simulated future condition</strong></figcaption>
        </figure>
      </div>
      <div className="metrics-grid">
        <Metric label="Crop health" value={results.cropHealth} unit="%" detail="Estimated from selected stress factors" />
        <Metric label="Canopy loss" value={results.canopyLoss} unit="%" detail="Simplified canopy stress estimate" />
        <Metric label="Soil moisture" value={results.soilMoisture} unit="%" detail="Scenario-level moisture estimate" />
        <Metric label="Yield impact" value={results.yieldLoss} unit="%" detail="Prototype yield-loss estimate" />
      </div>
    </section>
  )
}

export default SimulationResult