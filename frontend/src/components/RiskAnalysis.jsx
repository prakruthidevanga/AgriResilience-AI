function RiskAnalysis({ results }) {
  const risks = [
    ['Heat stress', results.heatStress],
    ['Drought stress', results.droughtStress],
    ['Salinity stress', results.salinityStress],
    ['Crop health', results.cropHealth],
  ]

  return (
    <section className="risk-section">
      <div className="section-wrap risk-layout">
        <div className="risk-score">
          <p className="eyebrow">Agricultural risk intelligence</p>
          <h2>Stress, translated<br />into a signal.</h2>
          <div className="score-display"><strong>{results.riskScore}</strong><span>/ 100<br />OVERALL RISK</span></div>
          <span className={`risk-level risk-${results.riskLevel.toLowerCase()}`}>{results.riskLevel} risk</span>
        </div>
        <div className="risk-detail">
          <p className="risk-insight">“{results.insight}”</p>
          <div className="risk-bars">
            {risks.map(([name, value]) => <div className="risk-bar-row" key={name}>
              <div className="risk-bar-label"><span>{name}</span><strong>{value}%</strong></div>
              <div className="risk-track"><span style={{ width: `${Math.max(0, Math.min(100, value))}%` }} /></div>
            </div>)}
          </div>
          <p className="small-note">Prototype analysis only. Values illustrate a simple rule-based model, not a validated crop forecast.</p>
        </div>
      </div>
    </section>
  )
}

export default RiskAnalysis