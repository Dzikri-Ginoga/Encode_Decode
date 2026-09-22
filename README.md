# KriptoHengker

Interactive cryptography lab. Classical, modern, and chained ciphers with full step trace in the browser.

## Run

No build. No npm runtime deps. ES modules require HTTP, `file://` fails.

```sh
python -m http.server
```

Open `http://localhost:8000/index.html`. Try Menu 3 with text `A`, seed `1011`, taps `0,2`. Expected cipher bits `10010010`.

## Menus

- Home - landing cards and usage steps.
- Classic 1 - stub owned by member.
- Classic 2 - stub owned by member.
- Modern 1 LFSR - live. Fibonacci LFSR, shift-right, MSB feedback XOR taps, output rightmost bit. Key `{ seed, taps }`: seed binary 2-32 bit nonzero, taps int array 0-based from left. Encrypt text to bits, decrypt bits to text.
- Modern 2 - stub owned by member.
- Super Encryption - chains classic1 -> classic2 -> modern1 -> modern2 with aggregated trace. Only LFSR stage is live.

## Structure

- Entry: `index.html` -> `js/main.js` hash router (`#/home`, `#/classic1`, `#/classic2`, `#/modern1`, `#/modern2`, `#/super`).
- UI kit: `js/shared/components.js` (panel, field, flowStrip, bitGrid, wireCopy, renderStepper). No duplicated panel HTML.
- Helpers: `js/shared/utils.js` (`textToBits`, `bitsToText`, `xorBits`, `isBinary`, `renderSteps`).
- Modules: `js/modules/*/cipher.js` + `view.js`. `cipher.js` is pure math, no DOM. `view.js` is DOM only.
- Pipeline: `js/modules/super-crypto/pipeline.js` imports ciphers only, never DOM.
- Style: Tailwind v4 browser CDN + Iconoir CSS + Inter/JetBrains Mono. Tokens in `tokens.json`, flattened to `css/tokens.css`. No hex outside tokens.
- UI copy is Indonesian. Code comments and JSDoc are English.

## Module Contract

Every `js/modules/*/cipher.js` exports:

```javascript
export function encrypt(input, key) { /* return { result, steps } */ }
export function decrypt(input, key) { /* return { result, steps } */ }
```

`input` is string, `key` is object, return is `{ result: string, steps: Array<{ title: string, detail: string }> }`. All exports carry JSDoc types.

## Docs

- `AGENTS.md` - agent run, structure, and git rules.
- `_context/` - PRD, stack, init, git conventions, repo structure.
- `docs/` - decision records `NNNN-title-DD-mon-YYYY.md` with registry in `docs/INDEX.md` and log in `docs/journal.json`.
