"""
Core processing logic for POST /bfhl.

IMPORTANT: Fill in your actual details below before submitting.
"""
import re
from collections import defaultdict, deque

# ── Identity — replace with your real details ──────────────────────────────
USER_ID = "subodhkumar_07072005"
EMAIL_ID = "sk3663@srmist.edu.in"
COLLEGE_ROLL_NUMBER = "RA2311026010805"
# ───────────────────────────────────────────────────────────────────────────

# A single uppercase letter on each side of "->"
VALID_PATTERN = re.compile(r'^[A-Z]->[A-Z]$')


def process(data: list) -> dict:
    """
    Full pipeline:
    1. Validate & classify entries (valid / invalid)
    2. Detect duplicate edges
    3. Build directed graph (multi-parent: first parent wins)
    4. Find connected components
    5. Per component: detect cycles, build tree, compute depth
    6. Build summary
    """
    invalid_entries = []
    duplicate_edges = []
    valid_edges = []          # list of (parent, child) in encounter order
    seen_edges = set()        # for duplicate detection
    duplicate_seen = set()    # so we only add each duplicate edge once

    # ── Step 1 & 2: Validate and deduplicate ──────────────────────────────
    for raw in data:
        entry = raw.strip()

        if not VALID_PATTERN.match(entry):
            invalid_entries.append(entry)
            continue

        parent, child = entry[0], entry[3]

        # Self-loop is invalid
        if parent == child:
            invalid_entries.append(entry)
            continue

        edge = (parent, child)

        if edge in seen_edges:
            # Duplicate — record once
            if edge not in duplicate_seen:
                duplicate_edges.append(entry)
                duplicate_seen.add(edge)
        else:
            seen_edges.add(edge)
            valid_edges.append(edge)

    # ── Step 3: Build directed graph (multi-parent: first parent wins) ─────
    child_parent: dict[str, str] = {}     # child → its assigned parent
    adjacency: dict[str, list] = defaultdict(list)   # parent → [children]
    all_nodes: set[str] = set()

    for parent, child in valid_edges:
        if child in child_parent:
            # This child already has a parent — silently discard
            continue
        child_parent[child] = parent
        adjacency[parent].append(child)
        all_nodes.add(parent)
        all_nodes.add(child)

    # ── Step 4: Connected components (undirected view) ────────────────────
    undirected: dict[str, set] = defaultdict(set)
    for parent, children in adjacency.items():
        for child in children:
            undirected[parent].add(child)
            undirected[child].add(parent)

    visited_global: set[str] = set()
    components: list[set] = []

    for node in sorted(all_nodes):
        if node not in visited_global:
            component: set[str] = set()
            queue = deque([node])
            while queue:
                cur = queue.popleft()
                if cur in component:
                    continue
                component.add(cur)
                visited_global.add(cur)
                for neighbour in undirected[cur]:
                    if neighbour not in component:
                        queue.append(neighbour)
            components.append(component)

    # ── Step 5: Per-component processing ──────────────────────────────────
    hierarchies = []

    for component in components:
        # Nodes that appear as a child within this component
        children_in_comp = set(child_parent.keys()) & component
        roots = component - children_in_comp

        # Pure cycle → no root → use lexicographically smallest node
        root = min(roots) if roots else min(component)

        if _has_cycle(component, adjacency):
            hierarchies.append({
                "root": root,
                "tree": {},
                "has_cycle": True,
            })
        else:
            tree = _build_tree(root, adjacency)
            depth = _depth(root, adjacency)
            hierarchies.append({
                "root": root,
                "tree": tree,
                "depth": depth,
            })

    # ── Step 6: Summary ────────────────────────────────────────────────────
    non_cyclic = [h for h in hierarchies if "has_cycle" not in h]
    total_trees = len(non_cyclic)
    total_cycles = len(hierarchies) - total_trees

    largest_tree_root = ""
    best_depth = -1
    for h in non_cyclic:
        d = h["depth"]
        r = h["root"]
        if d > best_depth or (d == best_depth and r < largest_tree_root):
            best_depth = d
            largest_tree_root = r

    return {
        "user_id": USER_ID,
        "email_id": EMAIL_ID,
        "college_roll_number": COLLEGE_ROLL_NUMBER,
        "hierarchies": hierarchies,
        "invalid_entries": invalid_entries,
        "duplicate_edges": duplicate_edges,
        "summary": {
            "total_trees": total_trees,
            "total_cycles": total_cycles,
            "largest_tree_root": largest_tree_root,
        },
    }


# ── Helpers ────────────────────────────────────────────────────────────────

def _has_cycle(component: set, adjacency: dict) -> bool:
    """DFS cycle detection on the directed subgraph for this component."""
    visited: set[str] = set()
    rec_stack: set[str] = set()

    def dfs(node: str) -> bool:
        visited.add(node)
        rec_stack.add(node)
        for child in adjacency.get(node, []):
            if child not in visited:
                if dfs(child):
                    return True
            elif child in rec_stack:
                return True
        rec_stack.discard(node)
        return False

    for node in component:
        if node not in visited:
            if dfs(node):
                return True
    return False


def _build_subtree(node: str, adjacency: dict) -> dict:
    """Return the subtree rooted at node as a nested dict (children only)."""
    children = adjacency.get(node, [])
    if not children:
        return {}
    return {child: _build_subtree(child, adjacency) for child in children}


def _build_tree(root: str, adjacency: dict) -> dict:
    """Return the full nested tree including root as the outermost key."""
    return {root: _build_subtree(root, adjacency)}


def _depth(node: str, adjacency: dict) -> int:
    """Number of nodes on the longest root-to-leaf path."""
    children = adjacency.get(node, [])
    if not children:
        return 1
    return 1 + max(_depth(child, adjacency) for child in children)
