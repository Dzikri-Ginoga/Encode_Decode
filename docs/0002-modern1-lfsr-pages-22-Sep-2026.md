## Meta
- id: 0002
- date: 22-Sep-2026
- status: accepted
- related: 0001

## Context
Owner implements Menu 3 (modern1 LFSR) only. Menus 1, 2, 4 belong to other members and stay as contract-compliant blanks. Menu 5 pipeline must tolerate blanks. Target host is Cloudflare Pages via Git-connected deploy with no build step. Role model is cryptii Brick/Pipe simplified to cipher.js (pure) + view.js (DOM) + pipeline.js (chain).

## Decisions
1. Scaffold full static shell: index.html tab router, css/styles.css, js/main.js, js/shared/utils.js, plus _headers and 404.html for Pages.
2. Implement modern1 with configurable taps: key is { seed, taps }, Fibonacci LFSR, shift-right, MSB feedback as XOR of tap positions (0-indexed from left). Reject all-zero seed, non-binary seed, out-of-range taps.
3. Stub classic1, classic2, modern2 cipher.js to return not-implemented steps so pipeline and UI keep working for other members.
4. Super pipeline chains classic1 -> classic2 -> modern1 -> modern2 with aggregated trace and skip markers for stubs.
5. Pages settings: production branch main, build command exit 0, output directory root. No functions/ directory.

## Verify
1. Serve via static server, Menu 3 encrypts text to bits with visible keystream steps.
2. Other tabs render placeholder without JS errors.
3. Pages preview deploy loads index.html at root.
