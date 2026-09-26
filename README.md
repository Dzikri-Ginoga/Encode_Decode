# KriptoHengker

Interactive cryptography lab. Classical, modern, and chained ciphers with full step trace in the browser.

Status: completed. All five menus live with step traces, docs and governance files in place.

## Run

No build. No npm runtime deps. ES modules require HTTP, `file://` fails.

```sh
python -m http.server
```

Open `http://localhost:8000/index.html`. Try Menu 3 with text `A`, seed `1011`, both tap thumbs at `0` and `2`. Expected cipher bits `10010010`.

## Menus

- Home - landing cards and usage steps.
- Caesar Cipher - live. Shift 0-25 over A-Z/a-z, other chars pass through. Key `{ shift }`. Encrypt and decrypt with per-character trace.
- Vigenere Cipher - live. Polyalphabetic keyword over A-Z/a-z. Key `{ keyword }`, non-letters stripped from key and skipped in text. Per-character trace with key alignment.
- Stream Cipher LFSR - live. Fibonacci LFSR, shift-right, MSB feedback XOR taps, output rightmost bit. Key `{ seed, taps }`: seed binary 2-32 bit nonzero, taps int array 0-based from left. Taps are set with one dual-thumb slider (max follows seed length). Encrypt text to bits, decrypt bits to text.
- Block Cipher S-DES - live. 8-bit blocks, 10-bit key, 2 Feistel rounds (EP, S0/S1, P4, swap). Key `{ key }` exactly 10 binary chars. Per-block trace, decrypt reverses subkey order.
- Super Encryption - live. Chains Caesar -> Vigenere -> LFSR -> S-DES with aggregated trace and bit/text bridges between stages.

## Structure

- Entry: `index.html` -> `js/main.js` hash router (`#/home`, `#/classic1`, `#/classic2`, `#/modern1`, `#/modern2`, `#/super`). Text-only sidebar with status dots, hide/show persisted in localStorage, hamburger reopen, sticky top bar on mobile.
- UI kit: `js/shared/components.js` (panel, field, flowStrip, bitGrid, dualRange, wireCopy, renderStepper). No duplicated panel HTML.
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
- `CONTRIBUTING.md` - module ownership, code rules, git workflow, verification.
- `CODE_OF_CONDUCT.md` - team conduct and enforcement.
- `_context/` - PRD, stack, init, git conventions, repo structure.
- `docs/` - decision records `0000`-`0006` with registry in `docs/INDEX.md` and log in `docs/journal.json`.
