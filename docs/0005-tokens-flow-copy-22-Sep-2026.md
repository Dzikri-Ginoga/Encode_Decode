## Meta
- id: 0005
- date: 22-Sep-2026
- status: accepted
- related: 0004

## Context
Token lapis tunggal, spacing angka ajaib, tipografi tanpa skala, copy terjemahan 1:1 tanpa suara. Keputusan: file token DTCG-lite sebagai sumber kebenaran, layout alat 2 kolom, copy minim tapi tajam, ilustrasi cukup strip alur inline (tanpa lib baru).

## Decisions
1. tokens.json (~40 token, 3 tier: primitif, semantik, komponen) + css/tokens.css hasil flatten. styles.css dan @theme hanya referensi token.
2. Kit v2: panel tanpa nomor dekorasi, tombol satu kepribadian, active sidebar indikator kiri, flowStrip untuk alur, empty state membimbing.
3. Layout Menu 3 dan 5: kiri alat, kanan keluaran (desktop), jejak penuh di bawah. Stub pakai kerangka sama.
4. Copy: tiap halaman 1 kalimat orientasi, empty state mengarahkan, About 3 poin mekanik.

## Verify
1. Tidak ada hex hardcode di luar tokens.css dan @theme.
2. Roundtrip LFSR utuh, semua rute render, mobile susun vertikal.
