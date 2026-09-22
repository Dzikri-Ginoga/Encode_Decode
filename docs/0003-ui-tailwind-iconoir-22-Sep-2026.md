## Meta
- id: 0003
- date: 22-Sep-2026
- status: accepted
- related: 0002

## Context
Shell works but looks bare: single styles.css, duplicated panel HTML per view, monospace everywhere, tab-state router with no deep links. Owner approved breaking the styling constraint: Tailwind CDN + Google Fonts + Iconoir icons allowed (no Lucide). Cipher math stays vanilla. Local-only, CDN-online assumed.

## Decisions
1. Add Tailwind v4 browser CDN, Iconoir CSS, Space Grotesk + JetBrains Mono fonts to index.html with @theme tokens.
2. New js/shared/components.js kit: panel, field, stepsList with stepper, bitGrid with tap highlight, copyBtn, placeholder. All views consume it.
3. Hash router in main.js: #/home, #/classic1, #/classic2, #/modern1, #/modern2, #/super. New home.js landing with hero, menu cards, How It Works.
4. Menu 3 gets bit-cell seed visual, keystream timeline, prev/next stepper, copy output.
5. Keep css/styles.css for bit-grid and trace extras only. Document Play CDN dev-only tradeoff for later prebuilt-CSS path.

## Verify
1. Serve locally with network on, all 6 routes render without console errors.
2. Menu 3 encrypt A / seed 1011 / taps 0,2 shows bit grid and stepper.
3. Stubs render placeholder on same kit.
