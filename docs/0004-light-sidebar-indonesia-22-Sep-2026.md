## Meta
- id: 0004
- date: 22-Sep-2026
- status: accepted
- related: 0003

## Context
Dark neon glass theme reads as AI template. Owner wants light editorial look: white-cream-dark gray solid colors, no overlay, no backdrop blur, no gradients. Sidebar navigation (collapsible, minimal width), full Bahasa Indonesia copy with English technical terms kept (seed, tap, keystream). Serif display + sans UI + mono bits.

## Decisions
1. Palette: page cream #FAF6EF, cards white, ink #1C1917, muted #78716C, hairline #E7E0D3, accent deep teal #0F766E, tap amber #B45309. Max 12px radius, hairline borders, single shadow-sm.
2. Sidebar fixed 248px expanded, 72px icon-only collapsed, toggle button persistent. Mobile under 768px becomes top bar with horizontal scroll.
3. Copy all Indonesian, lang="id". Technical terms stay English. Cipher error strings translated.
4. Rewrite components.js kit on light classes. All views inherit. cipher.js math untouched.

## Verify
1. All 6 routes render light, no English remnants outside technical terms.
2. Sidebar toggle collapses to icons, mobile stacks.
3. Menu 3 roundtrip still A -> bits -> A.
