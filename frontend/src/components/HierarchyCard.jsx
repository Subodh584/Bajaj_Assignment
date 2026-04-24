import TreeView from './TreeView'

export default function HierarchyCard({ hierarchy, index }) {
  const { root, tree, depth, has_cycle } = hierarchy

  return (
    <div
      className={`h-card${has_cycle ? ' h-card-cyclic' : ''}`}
      style={{ animationDelay: `${index * 55}ms` }}
    >
      <div className="h-card-top">
        <span className={`h-root-badge${has_cycle ? ' h-root-badge-cycle' : ''}`}>
          {root}
        </span>
        <span className={`h-status ${has_cycle ? 'h-status-cycle' : 'h-status-tree'}`}>
          {has_cycle ? 'Cycle' : 'Tree'}
        </span>
      </div>

      {!has_cycle && (
        <div className="h-meta">
          <span className="h-depth-pill">depth {depth}</span>
        </div>
      )}

      {has_cycle ? (
        <div className="h-cycle-msg">
          <span className="h-cycle-icon">↺</span>
          Cyclic — no tree structure
        </div>
      ) : (
        <TreeView tree={tree} />
      )}
    </div>
  )
}
