# Contributing to KriptoHengker

Course team project. Keep changes small, atomic, and traceable.

## Setup

No build. No npm runtime deps.

```sh
python -m http.server
```

Open `http://localhost:8000/index.html` over HTTP. ES modules fail on `file://`.

## Ownership

Each menu belongs to one member. Do not rewrite another member's module without asking them first.

- `classic1`, `classic2`, `modern2` - member-owned stubs.
- `modern1` (LFSR) - live reference implementation.
- `super-crypto/pipeline.js` - chains all four stages.

## Module Contract

Every `js/modules/*/cipher.js` must export:

```javascript
export function encrypt(input, key) { /* return { result, steps } */ }
export function decrypt(input, key) { /* return { result, steps } */ }
```

- `input` is string, `key` is object.
- Return `{ result: string, steps: Array<{ title: string, detail: string }> }`.
- `cipher.js` holds pure math only, never touches the DOM.
- `view.js` holds DOM only and imports its `cipher.js`.
- `pipeline.js` imports cipher modules only, never DOM.
- Cross-check cipher math against the lecture spec. Do not assume shifts, directions, or sizes.

## Code Rules

- Cipher logic stays vanilla ES2022 browser modules. No bundlers or npm runtime deps for logic.
- Styling exception: Tailwind v4 browser CDN + Iconoir CSS + Google Fonts only. No Lucide.
- All views consume the shared kit in `js/shared/components.js`. No duplicated panel HTML.
- Code comments and JSDoc are English. UI copy is Indonesian (technical terms like seed, tap, and keystream stay English).
- No emojis anywhere. Use ASCII hyphen `-` only, never em/en dashes.
- Colors come from `tokens.json` via `css/tokens.css`. No hex outside tokens.

## Git Workflow

- Run `git status` before starting.
- Never commit directly to `main`. Use `<type>/<scope>-<desc>` where type is `feat`, `fix`, `docs`, `refactor`, or `style`.
- Use Conventional Commits with scopes `classic1`, `classic2`, `modern1`, `modern2`, `super`, `ui`, `core`, `docs`.
- Keep commits atomic. One concern per commit.
- PR title is `[<scope>] summary` with the module checklist and trace verification from `_context/GIT_CONVENTIONS.md`.

## Docs

- Decision records live in `docs/` as `NNNN-title-DD-mon-YYYY.md` and must start with a `## Meta` block.
- Register every new record in `docs/INDEX.md`.
- Append `docs/journal.json` on every logic or architecture commit, with matching `related_dr`.

## Verification

Before opening a PR:

1. Serve over HTTP and open each affected menu.
2. For LFSR: encrypt `A` with seed `1011` and taps `0,2`, expect `10010010`. Decrypt it back to `A`.
3. Check the step trace panel renders every stage.
