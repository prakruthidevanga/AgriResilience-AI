const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export async function runSimulation(data) {
  const response = await fetch(`${API_URL}/api/simulate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  const result = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(result.message || 'The simulation could not be completed.')
  }

  return result
}