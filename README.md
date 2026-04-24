# BFHL Node Hierarchy Analyser

A full-stack web application built for the **SRM Full Stack Engineering Challenge (Round 1)**. The app parses node edge lists, constructs hierarchical trees, detects cycles, and returns structured insights via a REST API.

---

## Screenshots

<!-- Add screenshots below after deployment -->

### Frontend — Input Panel
<!-- ![Input Panel](screenshots/input.png) -->

### Frontend — Results View
<!-- ![Results View](screenshots/results.png) -->

### Frontend — Cycle Detection
<!-- ![Cycle Detection](screenshots/cycle.png) -->

---

## Live Demo

| | URL |
|---|---|
| **Frontend** | https://bajaj-assignment-green-ten.vercel.app |
| **API Base** | https://bajaj-assignment-2-p2gg.onrender.com |
| **API Endpoint** | https://bajaj-assignment-2-p2gg.onrender.com/bfhl |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Python 3, Django 4.2 |
| Frontend | React 18, Vite |
| Backend Hosting | Render |
| Frontend Hosting | Vercel |

---

## API Reference

### `POST /bfhl`

**Request**
```json
{
  "data": ["A->B", "A->C", "B->D", "X->Y", "Y->Z", "Z->X"]
}
```

**Response**
```json
{
  "user_id": "subodhkumar_07072005",
  "email_id": "sk3663@srmist.edu.in",
  "college_roll_number": "RA2311026010805",
  "hierarchies": [
    {
      "root": "A",
      "tree": { "A": { "B": { "D": {} }, "C": {} } },
      "depth": 3
    },
    {
      "root": "X",
      "tree": {},
      "has_cycle": true
    }
  ],
  "invalid_entries": [],
  "duplicate_edges": [],
  "summary": {
    "total_trees": 1,
    "total_cycles": 1,
    "largest_tree_root": "A"
  }
}
```

---

## Processing Rules

- **Valid format** — `X->Y` where X and Y are single uppercase letters (A–Z)
- **Invalid entries** — self-loops (`A->A`), wrong format (`AB->C`, `1->2`, `hello`), empty strings
- **Duplicate edges** — first occurrence is used for tree construction; subsequent ones go to `duplicate_edges`
- **Multi-parent** — if a child node has more than one parent, the first-encountered parent edge wins
- **Cycle detection** — cyclic groups return `has_cycle: true` and `tree: {}`
- **Depth** — number of nodes on the longest root-to-leaf path
- **Largest tree root** — tiebreaker on equal depth: lexicographically smaller root wins

---

## Project Structure

```
├── manage.py
├── requirements.txt
├── Procfile                      # gunicorn start command for Render
├── bfhl_project/
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── bfhl/
│   ├── processor.py              # core tree/cycle logic
│   └── views.py                  # POST /bfhl endpoint
└── frontend/                     # React + Vite
    ├── src/
    │   ├── App.jsx
    │   └── components/
    │       ├── InputPanel.jsx
    │       ├── ResultsPanel.jsx
    │       ├── HierarchyCard.jsx
    │       └── TreeView.jsx
    └── dist/                     # production build
```

---

## Running Locally

### Backend
```bash
pip install -r requirements.txt
python manage.py runserver
# API available at http://localhost:8000/bfhl
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# App available at http://localhost:5173
```

The Vite dev server proxies `/bfhl` to `http://localhost:8000` automatically.

---

## Author

**Subodh Kumar**
- Email: sk3663@srmist.edu.in
- Roll Number: RA2311026010805
