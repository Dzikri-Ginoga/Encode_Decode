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
    ["classic1", "key", "Caesar Cipher", "Enkripsi dan dekripsi menggunakan pergeseran huruf.", true],
    ["classic2", "key", "Vignere Cipher", "Enkripsi dan dekripsi menggunakan tabel substitusi.", true],
    ["modern1", "lock", "Stream Cipher LFSR", "Seed dan tap bisa diatur, jejak per bit.", true],
    ["modern2", "cpu", "Block Chiper S-DES", "Enkripsi berbasis blok dengan kunci tetap, setiap blok diproses secara terpisah untuk menjaga keamanan data.", true],
    ["super", "layers", "Super Enkripsi", "Empat tahap dalam satu alur.", true]
  ];
  root.innerHTML = `
    <h1 class="display">KriptoHengker.</h1>
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
        <li><b>Isi</b> teks dan kunci.</li>
        <li><b>Jalankan</b> enkripsi atau dekripsi.</li>
        <li><b>Telusuri</b> jejak langkah.</li>
      </ol>
    </section>`;
}
