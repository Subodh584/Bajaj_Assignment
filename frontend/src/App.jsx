import { useState, useCallback } from 'react'
import InputPanel from './components/InputPanel'
import ResultsPanel from './components/ResultsPanel'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL || '/bfhl'

function App() {
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)
  const [result, setResult]   = useState(null)

  const handleSubmit = useCallback(async (entries) => {
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: entries }),
      })
      const json = await res.json()
      if (!res.ok) {
        setError(json.error || `Server error ${res.status}`)
      } else {
        setResult(json)
      }
    } catch (e) {
      setError(`Network error: ${e.message}`)
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">BFHL Node Hierarchy Analyser</h1>
        <p className="app-sub">Enter node edges to discover tree structures and cycles</p>
      </header>

      <InputPanel onSubmit={handleSubmit} loading={loading} />

      {error && (
        <div className="error-banner">
          <span className="error-icon">✕</span>
          {error}
        </div>
      )}

      {result && <ResultsPanel data={result} />}
    </div>
  )
}

export default App
