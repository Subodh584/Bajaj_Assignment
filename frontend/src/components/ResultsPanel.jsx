import HierarchyCard from './HierarchyCard'

export default function ResultsPanel({ data }) {
  const {
    user_id, email_id, college_roll_number,
    hierarchies, invalid_entries, duplicate_edges, summary,
  } = data

  return (
    <div className="results">

      {/* Identity */}
      <div className="identity-row">
        <div className="id-cell">
          <div className="id-cell-label">User ID</div>
          <div className="id-cell-value">{user_id}</div>
        </div>
        <div className="id-cell">
          <div className="id-cell-label">Email</div>
          <div className="id-cell-value">{email_id}</div>
        </div>
        <div className="id-cell">
          <div className="id-cell-label">Roll Number</div>
          <div className="id-cell-value">{college_roll_number}</div>
        </div>
      </div>

      {/* Summary stats */}
      <div className="stats-row">
        <div className="stat-cell stat-trees">
          <span className="stat-value">{summary.total_trees}</span>
          <span className="stat-label">Valid trees</span>
        </div>
        <div className="stat-cell stat-cycles">
          <span className="stat-value">{summary.total_cycles}</span>
          <span className="stat-label">Cyclic groups</span>
        </div>
        <div className="stat-cell stat-root">
          <span className="stat-value">{summary.largest_tree_root || '—'}</span>
          <span className="stat-label">Largest tree root</span>
        </div>
      </div>

      {/* Flags */}
      <div className="flags-row">
        <div className="flag-cell">
          <div className="flag-cell-label">Invalid entries</div>
          <div className="tag-list">
            {invalid_entries.length === 0
              ? <span className="tag-none">None</span>
              : invalid_entries.map((e, i) => (
                  <span key={i} className="tag tag-invalid">{e || '(empty)'}</span>
                ))
            }
          </div>
        </div>
        <div className="flag-cell">
          <div className="flag-cell-label">Duplicate edges</div>
          <div className="tag-list">
            {duplicate_edges.length === 0
              ? <span className="tag-none">None</span>
              : duplicate_edges.map((e, i) => (
                  <span key={i} className="tag tag-dup">{e}</span>
                ))
            }
          </div>
        </div>
      </div>

      {/* Hierarchies */}
      <div className="hierarchies-section">
        <div className="h-section-header">
          <span className="section-label">Hierarchies</span>
          <span className="h-count">{hierarchies.length} group{hierarchies.length !== 1 ? 's' : ''}</span>
        </div>
        <div className="h-grid">
          {hierarchies.map((h, i) => (
            <HierarchyCard key={h.root} hierarchy={h} index={i} />
          ))}
        </div>
      </div>

      {/* Raw JSON */}
      <details className="raw-details">
        <summary className="raw-summary">
          Raw JSON response
          <svg className="raw-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </summary>
        <pre className="raw-pre">{JSON.stringify(data, null, 2)}</pre>
      </details>

    </div>
  )
}
