import { useState } from 'react'

function parseInput(raw) {
  return raw
    .split(/[\n,]+/)
    .map(s => s.trim())
    .filter(s => s.length > 0)
}

export default function InputPanel({ onSubmit, loading }) {
  const [value, setValue] = useState('')

  function handleSubmit() {
    const entries = parseInput(value)
    if (entries.length === 0) return
    onSubmit(entries)
  }

  function handleClear() {
    setValue('')
  }

  return (
    <div className="card">
      <p className="card-title">Input</p>
      <textarea
        className="input-textarea"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder={`Enter edges, one per line or comma-separated:\nA->B\nA->C\nB->D\nX->Y, Y->Z, Z->X`}
        onKeyDown={e => {
          if (e.key === 'Enter' && e.ctrlKey) handleSubmit()
        }}
      />
      <p className="input-hint">
        Format: <code>X-&gt;Y</code> where X and Y are single uppercase letters (A–Z).
        Separate with newlines or commas. Press Ctrl+Enter to submit.
      </p>
      <div className="input-actions">
        <button
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={loading || !value.trim()}
        >
          {loading ? 'Analysing…' : 'Analyse'}
        </button>
        <button
          className="btn btn-ghost"
          onClick={handleClear}
          disabled={loading}
        >
          Clear
        </button>
      </div>
      {loading && (
        <div className="spinner-wrap">
          <div className="spinner" />
          Calling API…
        </div>
      )}
    </div>
  )
}
