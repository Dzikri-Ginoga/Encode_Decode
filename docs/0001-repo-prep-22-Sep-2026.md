## Meta
- id: 0001
- date: 22-Sep-2026
- status: accepted
- related: 0000

## Context
Repo is pre-scaffold. index.html is an 11-line stub with no module entry. js/, css/ do not exist. _context/ holds specs but INIT.md and GIT_CONVENTIONS.md are wrapped in code fences with broken headings, GIT_CONVENTIONS PR template is truncated at step 3, PRD.md contains citation noise, REPO_STRUCTURE.md references README.md and ARCHITECTURE.md which do not exist. docs/ has no INDEX.md. .gitignore only covers pdf/ipynb/csv and conflicts with GIT_CONVENTIONS rule on node_modules/IDE/OS artifacts. AGENTS.md is verbose and keeps citation noise.

## Decisions
1. Scope this DR to repo prep only: fix _context/, add docs/INDEX.md, rewrite AGENTS.md compact, append journal. Defer js/css scaffold and cipher implementation to next DR.
2. Unwrap INIT.md and GIT_CONVENTIONS.md to plain markdown, fix headings, complete PR verification steps, keep branch/commit/PR rules unchanged.
3. Strip citation noise from PRD.md. Keep 5-menu scope and LFSR/XOR requirements. Add explicit JSDoc contract reference.
4. Align REPO_STRUCTURE.md with reality: mark README.md and ARCHITECTURE.md as planned, not existing. Keep module paths as source of truth.
5. Extend STACK.md with run rule: static HTTP server required because ES modules fail on file://. No build, no test runner, no lint.
6. Create docs/INDEX.md as registry for 0000 and 0001. Keep NNNN-title-DD-mon-YYYY.md naming.
7. Rewrite AGENTS.md to commands, boundaries, contracts, constraints only. Point to _context/ as specs.

## Verify
1. All _context/*.md render as plain markdown with no nested fences.
2. docs/INDEX.md lists 0000 and 0001.
3. AGENTS.md has no citations, no tutorial prose, and matches current repo state.
4. Serve index.html via static server to confirm stub loads without module errors.
