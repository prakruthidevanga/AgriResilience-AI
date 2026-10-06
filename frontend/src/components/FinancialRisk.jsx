function FinancialRisk({ results }) {
  return (
    <section className="section-wrap financial-section">
      <div className="financial-copy"><p className="eyebrow">Farm-level perspective</p><h2>Understand the<br />potential exposure.</h2>
        <p>Simple estimates connect crop impact to an example farm value. They are not a real financial prediction.</p>
      </div>
      <div className="financial-data">
        <span className="prototype-tag">PROTOTYPE ESTIMATE</span>
        <div className="financial-line"><span>Estimated yield loss</span><strong>{results.yieldLoss}%</strong></div>
        <div className="financial-line"><span>Financial loss per acre</span><strong>${results.financialLoss.toLocaleString()}</strong></div>
        <div className="financial-line"><span>Risk level</span><strong>{results.riskLevel}</strong></div>
        <p className="small-note">Illustrative values use a fixed example crop value per acre for demonstration.</p>
      </div>
    </section>
  )
}

export default FinancialRisk