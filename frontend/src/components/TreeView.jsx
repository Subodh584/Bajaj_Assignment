function TreeNode({ label, subtree }) {
  const children = Object.entries(subtree || {})
  return (
    <div className="tree-item">
      <span className="tree-node-dot">{label}</span>
      {children.length > 0 && (
        <div className="tree-item-children">
          <div className="tree-subtree">
            {children.map(([child, grandchildren]) => (
              <TreeNode key={child} label={child} subtree={grandchildren} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function TreeView({ tree }) {
  if (!tree || Object.keys(tree).length === 0) return null
  const [[root, subtree]] = Object.entries(tree)
  const children = Object.entries(subtree || {})

  return (
    <div className="tree-view">
      <div className="tree-root-row">
        <span className="tree-node-dot" style={{ width: 24, height: 24, fontSize: '0.82rem', background: 'var(--accent-bg)', borderColor: 'var(--accent-border)', color: 'var(--accent)' }}>
          {root}
        </span>
      </div>
      {children.length > 0 && (
        <div className="tree-subtree">
          {children.map(([child, grandchildren]) => (
            <TreeNode key={child} label={child} subtree={grandchildren} />
          ))}
        </div>
      )}
    </div>
  )
}
