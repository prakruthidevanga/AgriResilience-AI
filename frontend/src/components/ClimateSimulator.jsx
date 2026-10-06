import { useState } from 'react'

const presets = {
  Normal: { temperature: 28, droughtDays: 4, salinity: 2 },
  'Heat stress': { temperature: 40, droughtDays: 8, salinity: 3 },
  Drought: { temperature: 34, droughtDays: 35, salinity: 4 },
  'Drought + salinity': { temperature: 37, droughtDays: 30, salinity: 28 },
}

const steps = [
  'Analyzing climate conditions...',
  'Analyzing crop stress...',
  'Simulating future field condition...',
  'Calculating agricultural risk...',
  'Generating biological insights...',
]

function ClimateSimulator({ onRun, loading, processingStep, error }) {
  const [form, setForm] = useState({
    crop: 'Rice',
    temperature: 35,
    droughtDays: 10,
    salinity: 0,
    simulationPeriod: 30,
  })

  function updateField(event) {
    const { name, value } = event.target
    setForm({ ...form, [name]: name === 'crop' ? value : Number(value) })
  }

  function applyPreset(name) {
    setForm({ ...form, ...presets[name] })
  }

  function handleSubmit(event) {
    event.preventDefault()
    onRun(form)
  }

  return (
    <div className="simulator-grid">
      <form className="simulator-form" onSubmit={handleSubmit}>
        <div className="form-topline"><span>SCENARIO BUILDER</span><span>01 — 04</span></div>
        <div className="preset-row" aria-label="Climate presets">
          {Object.keys(presets).map((preset) => (
            <button className="preset-button" type="button" key={preset} onClick={() => applyPreset(preset)}>
              {preset}
            </button>
          ))}
        </div>

        <label className="field-label" htmlFor="crop">Crop</label>
        <select id="crop" name="crop" value={form.crop} onChange={updateField}>
          <option>Rice</option><option>Wheat</option><option>Maize</option><option>Tomato</option>
        </select>

        <div className="range-field">
          <label className="field-label" htmlFor="temperature">Temperature <output>{form.temperature}°C</output></label>
          <input id="temperature" name="temperature" type="range" min="20" max="50" value={form.temperature} onChange={updateField} />
          <div className="range-ends"><span>20°C</span><span>50°C</span></div>
        </div>
        <div className="range-field">
          <label className="field-label" htmlFor="droughtDays">Drought duration <output>{form.droughtDays} days</output></label>
          <input id="droughtDays" name="droughtDays" type="range" min="0" max="60" value={form.droughtDays} onChange={updateField} />
          <div className="range-ends"><span>0 days</span><span>60 days</span></div>
        </div>
        <div className="range-field">
          <label className="field-label" htmlFor="salinity">Salinity <output>{form.salinity}%</output></label>
          <input id="salinity" name="salinity" type="range" min="0" max="50" value={form.salinity} onChange={updateField} />
          <div className="range-ends"><span>0%</span><span>50%</span></div>
        </div>
        <label className="field-label" htmlFor="simulationPeriod">Simulation period</label>
        <select id="simulationPeriod" name="simulationPeriod" value={form.simulationPeriod} onChange={updateField}>
          <option value="7">7 days</option><option value="15">15 days</option>
          <option value="30">30 days</option><option value="60">60 days</option>
        </select>
        <button className="button button-lime run-button" type="submit" disabled={loading}>
          {loading ? 'Running prototype analysis…' : 'Run AI simulation'} <span aria-hidden="true">↗</span>
        </button>
        <p className="form-disclaimer">Simplified prototype calculations. Not an agronomic forecast.</p>
      </form>

      <aside className="processing-panel">
        <div className="processing-topline"><span>SIMULATION PIPELINE</span><span className="live-label"><span className="status-dot" /> {loading ? 'IN PROGRESS' : 'READY'}</span></div>
        <div className="pipeline-visual" aria-hidden="true">
          <div className="pipeline-ring ring-one" /><div className="pipeline-ring ring-two" />
          <div className="pipeline-center">FIELD<br /><span>→</span><br />SIGNAL</div>
          <span className="pipeline-point point-one" /><span className="pipeline-point point-two" /><span className="pipeline-point point-three" />
        </div>
        <div className="processing-steps">
          {steps.map((step, index) => {
            const done = processingStep > index
            const active = loading && processingStep === index + 1
            return <div className={`processing-step ${done ? 'is-done' : ''} ${active ? 'is-active' : ''}`} key={step}>
              <span className="step-marker">{done ? '✓' : `0${index + 1}`}</span><span>{step}</span>
            </div>
          })}
          {processingStep > steps.length && <p className="complete-message">Simulation complete. Results are ready below.</p>}
        </div>
        {error && <p className="error-message" role="alert">{error}</p>}
      </aside>
    </div>
  )
}

export default ClimateSimulator