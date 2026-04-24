import { useState } from 'react'

const EXAMPLES = [
  { label: 'Simple tree',  value: 'A->B, A->C, B->D, C->E, E->F' },
  { label: 'With cycle',   value: 'A->B, A->C, B->D, X->Y, Y->Z, Z->X' },
  { label: 'Full example', value: 'A->B, A->C, B->D, C->E, E->F, X->Y, Y->Z, Z->X, P->Q, Q->R, G->H, G->H, G->I, hello, 1->2, A->' },
]

function parseInput(raw) {
  return raw.split(/[\n,]+/).map(s => s.trim()).filter(Boolean)
}

export default function InputPanel({ onSubmit, loading }) {
  const [value, setValue] = useState('')

  function handleSubmit() {
    const entries = parseInput(value)
    if (entries.length > 0) onSubmit(entries)
  }

  return (
    <div className="card">
      <div className="examples-row">
        <span className="examples-label">Try:</span>
        {EXAMPLES.map(ex => (
          <button
            key={ex.label}
            className="example-chip"
            onClick={() => setValue(ex.value)}
            disabled={loading}
          >
            {ex.label}
          </button>
        ))}
      </div>

      <textarea
        className="input-textarea"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder={'A->B, A->C, B->D\nX->Y, Y->Z, Z->X'}
        onKeyDown={e => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) handleSubmit() }}
        spellCheck={false}
      />

      <div className="input-footer">
        <p className="input-hint">
          Format: <code>X-&gt;Y</code> — single uppercase letters only.
          Separate with newlines or commas. <span style={{color:'var(--text-3)'}}>⌘↵ to submit</span>
        </p>
        <div className="input-actions">
          <button
            className="btn btn-ghost"
            onClick={() => setValue('')}
            disabled={loading || !value}
          >
            Clear
          </button>
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={loading || !value.trim()}
          >
            {loading
              ? <><span className="spinner" /> Analysing</>
              : 'Analyse'}
          </button>
        </div>
      </div>

      {loading && (
        <div className="loading-bar">
          <span className="loading-dot" />
          <span className="loading-dot" />
          <span className="loading-dot" />
          <span style={{ marginLeft: '4px' }}>Processing edges…</span>
        </div>
      )}
    </div>
  )
}
