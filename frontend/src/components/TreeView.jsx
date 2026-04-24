function TreeChildren({ obj }) {
  if (!obj || Object.keys(obj).length === 0) return null
  return (
    <div className="tree-children">
      {Object.entries(obj).map(([node, children]) => (
        <div key={node} className="tree-node">
          <span className="tree-node-label">{node}</span>
          <TreeChildren obj={children} />
        </div>
      ))}
    </div>
  )
}

export default function TreeView({ tree }) {
  if (!tree || Object.keys(tree).length === 0) return null
  const [root] = Object.keys(tree)
  return (
    <div className="tree-view">
      <div className="tree-node">
        <span className="tree-node-label">{root}</span>
        <TreeChildren obj={tree[root]} />
      </div>
    </div>
  )
}
