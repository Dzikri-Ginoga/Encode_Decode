/**
 * Landing page. Static cards, no cipher math.
 * @module home
 */

/**
 * Render home landing.
 * @param {HTMLElement} root - container
 * @returns {void}
 */
export function renderHome(root) {
  const cards = [
    ["classic1", "key", "Klasik 1", "Ruang anggota lain.", false],
    ["classic2", "key", "Klasik 2", "Ruang anggota lain.", false],
    ["modern1", "lock", "Aliran LFSR", "Seed dan tap bisa diatur, jejak per bit.", true],
    ["modern2", "cpu", "Modern 2", "Ruang anggota lain.", false],
    ["super", "layers", "Super Enkripsi", "Empat tahap dalam satu alur.", true]
  ];
  root.innerHTML = `
    <h1 class="display">Pahami sandi dengan melihat cara kerjanya.</h1>
    <p class="lead" style="margin-bottom:var(--space-section)">Lima menu, tiap langkah terlihat. Semua berjalan di peramban.</p>
    <div class="btn-row" style="margin:0 0 var(--space-section)">
      <a href="#/modern1" class="btn-solid"><i class="iconoir-play"></i>Coba demo LFSR</a>
    </div>
    <div class="menu-grid" style="margin-bottom:var(--space-section)">
      ${cards.map(([r, ic, t, d, live]) => `
        <a href="#/${r}" class="menu-card">
          <i class="iconoir-${ic}"></i>
          <h3>${t}</h3>
          <p>${d}</p>
          <span class="badge ${live ? "live" : "stub"}">${live ? "Aktif" : "Segera"}</span>
        </a>`).join("")}
    </div>
    <section class="card">
      <h2>Tiga langkah memakai</h2>
      <ol class="about-list">
        <li><b>Isi.</b> Teks dan kunci, seed dan tap untuk LFSR.</li>
        <li><b>Jalankan.</b> Enkripsi atau dekripsi.</li>
        <li><b>Telusuri.</b> Buka jejak langkah satu per satu.</li>
      </ol>
    </section>`;
}
