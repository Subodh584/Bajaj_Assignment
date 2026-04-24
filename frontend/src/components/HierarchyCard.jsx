import TreeView from './TreeView'

export default function HierarchyCard({ hierarchy }) {
  const { root, tree, depth, has_cycle } = hierarchy

  return (
    <div className={`h-card${has_cycle ? ' h-card-cyclic' : ''}`}>
      <div className="h-card-header">
        <span className="h-root">{root}</span>
        {has_cycle
          ? <span className="h-pill h-pill-cycle">Cycle</span>
          : <span className="h-pill h-pill-tree">Tree</span>
        }
      </div>

      {!has_cycle && (
        <p className="h-depth">Depth: <strong>{depth}</strong></p>
      )}

      {has_cycle
        ? <p className="cycle-msg">⟳ Cycle detected — no tree structure</p>
        : <TreeView tree={tree} />
      }
    </div>
  )
}
