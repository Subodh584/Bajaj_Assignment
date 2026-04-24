import HierarchyCard from './HierarchyCard'

export default function ResultsPanel({ data }) {
  const { user_id, email_id, college_roll_number, hierarchies, invalid_entries, duplicate_edges, summary } = data

  return (
    <>
      {/* Identity */}
      <div className="identity-strip">
        <div className="id-chip">
          <span className="id-chip-label">User ID</span>
          {user_id}
        </div>
        <div className="id-chip">
          <span className="id-chip-label">Email</span>
          {email_id}
        </div>
        <div className="id-chip">
          <span className="id-chip-label">Roll Number</span>
          {college_roll_number}
        </div>
      </div>

      {/* Summary */}
      <div className="summary-badges">
        <div className="badge badge-trees">
          {summary.total_trees}
          <span className="badge-label">Valid Trees</span>
        </div>
        <div className="badge badge-cycles">
          {summary.total_cycles}
          <span className="badge-label">Cyclic Groups</span>
        </div>
        <div className="badge badge-root">
          {summary.largest_tree_root || '—'}
          <span className="badge-label">Largest Tree Root</span>
        </div>
      </div>

      {/* Flags */}
      <div className="card">
        <p className="card-title">Flags</p>
        <div className="flags-grid">
          <div>
            <p className="flags-section-label">Invalid Entries</p>
            <div className="tag-list">
              {invalid_entries.length === 0
                ? <span className="tag-empty">None</span>
                : invalid_entries.map((e, i) => (
                    <span key={i} className="tag tag-invalid">{e || '(empty)'}</span>
                  ))
              }
            </div>
          </div>
          <div>
            <p className="flags-section-label">Duplicate Edges</p>
            <div className="tag-list">
              {duplicate_edges.length === 0
                ? <span className="tag-empty">None</span>
                : duplicate_edges.map((e, i) => (
                    <span key={i} className="tag tag-dup">{e}</span>
                  ))
              }
            </div>
          </div>
        </div>
      </div>

      {/* Hierarchies */}
      <div className="card">
        <p className="card-title">Hierarchies</p>
        {hierarchies.length === 0
          ? <p className="tag-empty">No hierarchies found.</p>
          : (
            <div className="h-grid">
              {hierarchies.map(h => (
                <HierarchyCard key={h.root} hierarchy={h} />
              ))}
            </div>
          )
        }
      </div>

      {/* Raw JSON */}
      <details className="raw-details">
        <summary>Raw JSON response</summary>
        <pre className="raw-pre">{JSON.stringify(data, null, 2)}</pre>
      </details>
    </>
  )
}
