KriptoHengker/
├── README.md                               # Primary project overview and setup instructions
├── ARCHITECTURE.md                         # Data pipeline and UI visualizer contract
├── AGENTS.md                               # Agent operational rules, constraints, and doc index
├── _context/
│   ├── PRD.md                              # Product Requirements Document
│   ├── STACK.md                            # Technical stack specifications
│   ├── INIT.md                             # Bootstrapping and setup sequence
│   └── GIT_CONVENTIONS.md                  # Git branching, commit format, and PR │guidelines
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
    ├── journal.json                        # Machine-readable execution log
    └── 0000-template-22-Sep-2026.md        # DR 0000: Base Modular Monolith Architecture
