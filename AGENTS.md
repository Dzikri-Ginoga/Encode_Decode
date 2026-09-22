# AGENTS.md

## Run
- No build, no npm runtime deps, no test/lint/typecheck configured.
- Must serve over HTTP because ES modules fail on `file://`. Example: `python -m http.server`.
- Verify manually: open `index.html` via server, test input `XYZ` with key `ABC`, check step trace panel.
- Repo is pre-scaffold: `index.html` is a stub with no module entry, `js/` and `css/` do not exist yet. Bootstrap per `_context/INIT.md` before adding cipher logic.

## Structure
- Entry: `index.html` -> `js/main.js` (tab router). Shared helpers: `js/shared/utils.js`.
- Modules: `js/modules/classic1/`, `classic2/`, `modern1/` (LFSR), `modern2/`, each with `cipher.js` + `view.js`.
- Pipeline: `js/modules/super-crypto/pipeline.js` chains classic1 -> classic2 -> modern1 -> modern2 with aggregated trace, plus `view.js`.
- Ownership: `cipher.js` holds pure math only, `view.js` holds DOM only. `pipeline.js` imports cipher modules, never DOM.

## Module Contract
Every `js/modules/*/cipher.js` must export:
```javascript
export function encrypt(input, key) { /* return { result, steps } */ }
export function decrypt(input, key) { /* return { result, steps } */ }
```
- `input`: string. `key`: object. Return `{ result: string, steps: Array<{ title: string, detail: string }> }`.
- Add JSDoc types on all exports. Cross-check cipher math against lecture spec, do not assume shifts, directions, or sizes.

## Constraints
- Vanilla ES2022 browser modules only. Do not add bundlers or npm runtime deps.
- No emojis anywhere. Use ASCII hyphen `-` only, never em/en dashes. No Lucide or third-party icon libs, use CSS or ASCII.

## Docs Ops
- Decision records: `docs/NNNN-title-DD-mon-YYYY.md`, must start with `## Meta` block. See `docs/0000-template-22-Sep-2026.md`.
- Register every new record in `docs/INDEX.md`.
- Append `docs/journal.json` on every logic or architecture commit, with matching `related_dr`.

## Git Ops
- Run `git status` first. Never commit directly to `main`, use `<type>/<scope>-<desc>` where type is `feat`, `fix`, `docs`, `refactor`, or `style`.
- Use Conventional Commits with scopes `classic1`, `classic2`, `modern1`, `modern2`, `super`, `ui`, `core`, `docs`.
- Keep commits atomic. PR title is `[<scope>] summary` with module checklist and trace verification.

## Specs
- `_context/PRD.md` - menus and LFSR/XOR scope
- `_context/STACK.md` - runtime and run rules
- `_context/INIT.md` - bootstrap sequence
- `_context/GIT_CONVENTIONS.md` - branches, commits, PRs
- `_context/REPO_STRUCTURE.md` - target layout and ownership
