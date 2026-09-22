## Meta
- id: 0006
- date: 22-Sep-2026
- status: accepted
- related: 0005

## Context
Selepas 0005 menumpuk pekerjaan tak tercatat: README/CONTRIBUTING/CoC, JSDoc Inggris, seed bit 1 hitam, separator strip ber-background, tap teks, sidebar ikon + collapse tanpa persist + mobile seadanya. Keputusan: satukan dalam satu batch UI, satu DR, satu commit.

## Decisions
1. Governance: README (run, menu, kontrak modul), CONTRIBUTING (ownership anggota, aturan vanilla + kit + token, git workflow, vektor verifikasi LFSR), CODE_OF_CONDUCT (ownership, review, eskalasi ke instruktur).
2. Tap Menu 3: teks koma -> dual-thumb range slider (`dualRange` di kit), 2 posisi, max ikut panjang seed, clamp + sort saat dipakai, highlight grid live, tanpa rebuild saat drag.
3. Sidebar: nav teks saja + dot status, brand mark home, collapse foot sembunyi/tampil, state di localStorage `kripto-shell-collapsed`, sidebar hidden saat collapse + tombol hamburger 36px + clearance konten 76px, mobile sticky top bar selalu tampil.
4. Seed display: sel 1 dan 0 seragam (fill hitam dibuang), tap tetap garis bawah. Separator strip `›` tanpa background.
5. Komentar kode dan JSDoc Inggris, copy UI tetap Indonesia.

## Verify
1. Roundtrip A + seed 1011 tap [0,2] -> 10010010 -> A; 3-tap 10111 [0,2,4] roundtrip.
2. index.html, main.js, styles.css serve 200. main.js parse OK.
3. Collapse persist across reload, mobile 768px top bar, hamburger tidak overlap judul.
