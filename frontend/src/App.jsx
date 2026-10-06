import { useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import ClimateSimulator from './components/ClimateSimulator.jsx'
import SimulationResult from './components/SimulationResult.jsx'
import RiskAnalysis from './components/RiskAnalysis.jsx'
import FinancialRisk from './components/FinancialRisk.jsx'
import GenomicInsights from './components/GenomicInsights.jsx'
import Workflow from './components/Workflow.jsx'
import Footer from './components/Footer.jsx'
import { runSimulation } from './services/api.js'
import './App.css'

function App() {
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [processingStep, setProcessingStep] = useState(0)
  const [error, setError] = useState('')

  async function handleSimulation(input) {
    setLoading(true)
    setError('')
    setResults(null)

    const steps = [
      'Analyzing climate conditions...',
      'Analyzing crop stress...',
      'Simulating future field condition...',
      'Calculating agricultural risk...',
      'Generating biological insights...',
    ]

    try {
      for (let index = 0; index < steps.length; index += 1) {
        setProcessingStep(index + 1)
        await new Promise((resolve) => setTimeout(resolve, 450))
      }

      const simulation = await runSimulation(input)
      setResults(simulation)
      setProcessingStep(steps.length + 1)
    } catch {
      setError('Unable to connect to the analysis server. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero />

        <section className="intro-section section-wrap" id="overview">
          <div className="section-heading">
            <p className="eyebrow">A changing climate needs a new lens</p>
            <h2>From weather signal to field decision.</h2>
          </div>
          <div className="intro-copy">
            <p>
              AgriResilience-AI connects a climate scenario to its possible impact on crops,
              farm economics, and future biological research, in one explainable prototype.
            </p>
            <a className="text-link" href="#simulator">Explore the simulator <span aria-hidden="true">↘</span></a>
          </div>
          <div className="overview-rail" aria-label="Platform overview">
            <div><span>01</span><strong>Climate conditions</strong><small>Choose a crop and scenario</small></div>
            <div><span>02</span><strong>Field simulation</strong><small>Preview possible future stress</small></div>
            <div><span>03</span><strong>Risk intelligence</strong><small>Understand impact and exposure</small></div>
            <div><span>04</span><strong>Biological research</strong><small>Explore adaptation concepts</small></div>
          </div>
        </section>

        <section className="simulator-section" id="simulator">
          <div className="section-wrap">
            <div className="section-heading section-heading-light">
              <p className="eyebrow">Interactive research prototype</p>
              <h2>Set the conditions.<br />See the signal.</h2>
              <p>Adjust a few climate variables to explore a simplified crop-stress scenario.</p>
            </div>
            <ClimateSimulator
              onRun={handleSimulation}
              loading={loading}
              processingStep={processingStep}
              error={error}
            />
          </div>
        </section>

        {results && (
          <div className="results-section" aria-live="polite">
            <SimulationResult results={results} />
            <RiskAnalysis results={results} />
            <FinancialRisk results={results} />
          </div>
        )}

        <GenomicInsights />
        <Workflow />
      </main>
      <Footer />
    </>
  )
}

export default App