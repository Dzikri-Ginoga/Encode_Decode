# Repository Structure

Target layout for the modular monolith. Status as of DR 0001: index.html exists as stub, js/ and css/ are planned, README.md and ARCHITECTURE.md are planned.

```text
KriptoHengker/
├── README.md                               # Planned: project overview and setup instructions
├── ARCHITECTURE.md                         # Planned: data pipeline and UI visualizer contract
├── AGENTS.md                               # Agent operational rules, constraints, and doc index
├── _context/
│   ├── PRD.md                              # Product Requirements Document
│   ├── STACK.md                            # Technical stack specifications
│   ├── INIT.md                             # Bootstrapping and setup sequence
│   ├── GIT_CONVENTIONS.md                  # Git branching, commit format, and PR guidelines
│   └── REPO_STRUCTURE.md                   # This file
├── index.html                              # SPA layout shell and tab container
├── css/
│   └── styles.css                          # Application layout and step visualizer styles
├── js/
│   ├── main.js                             # Tab navigation router and initialization script
│   ├── shared/
│   │   └── utils.js                        # Binary, hex, and text conversion helpers
│   └── modules/
│       ├── classic1/                       # Menu 1: Classic Cipher 1
│       │   ├── cipher.js                   # Core transformation logic and step tracing
│       │   └── view.js                     # DOM rendering controller
│       ├── classic2/                       # Menu 2: Classic Cipher 2
│       │   ├── cipher.js
│       │   └── view.js
│       ├── modern1/                        # Menu 3: Modern Cipher 1 (LFSR Stream Cipher)
│       │   ├── cipher.js
│       │   └── view.js
│       ├── modern2/                        # Menu 4: Modern Cipher 2
│       │   ├── cipher.js
│       │   └── view.js
│       └── super-crypto/                   # Menu 5: Super Encryption Pipeline
│           ├── pipeline.js                 # Sequential algorithm chain controller
│           └── view.js                     # Aggregated step visualizer view
└── docs/
    ├── INDEX.md                            # Decision record registry
    ├── journal.json                        # Machine-readable execution log
    └── NNNN-title-DD-mon-YYYY.md           # Decision records
```

## Ownership Notes
- js/modules/*/cipher.js: pure cipher math, no DOM access.
- js/modules/*/view.js: DOM rendering only, imports cipher.js.
- js/modules/super-crypto/pipeline.js: chains classic1 -> classic2 -> modern1 -> modern2.
- js/shared/utils.js: shared bit, hex, and text helpers used by all cipher modules.
