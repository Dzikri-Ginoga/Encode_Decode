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
    ["classic1", "key", "Menu 1 - Klasik 1", "Modul sandi klasik milik anggota lain.", false],
    ["classic2", "key", "Menu 2 - Klasik 2", "Modul sandi klasik milik anggota lain.", false],
    ["modern1", "lock", "Menu 3 - Aliran LFSR", "Sandi aliran dengan seed dan tap yang bisa diatur. Lengkap dengan jejak bit.", true],
    ["modern2", "cpu", "Menu 4 - Modern 2", "Modul sandi modern milik anggota lain.", false],
    ["super", "layers", "Menu 5 - Super Enkripsi", "Merangkai keempat tahap dan menggabungkan seluruh jejaknya.", true]
  ];
  root.innerHTML = `
    <section class="card">
      <p class="sec-no">Laboratorium kriptografi</p>
      <h2 style="font-size:1.7rem">Lihat cara setiap bit bekerja.</h2>
      <p class="lead">Lima menu sandi dengan pelacakan langkah demi langkah. Semua perhitungan berjalan di peramban, tidak ada data yang dikirim ke mana pun.</p>
      <div class="btn-row">
        <a href="#/modern1" class="btn-solid"><i class="iconoir-play"></i>Coba demo LFSR</a>
        <a href="#/super" class="btn-plain"><i class="iconoir-layers"></i>Lihat super enkripsi</a>
      </div>
    </section>
    <div class="menu-grid" style="margin-bottom:1.1rem">
      ${cards.map(([r, ic, t, d, live]) => `
        <a href="#/${r}" class="menu-card">
          <i class="iconoir-${ic}"></i>
          <h3>${t}</h3>
          <p>${d}</p>
          <span class="badge ${live ? "live" : "stub"}">${live ? "Aktif" : "Segera"}</span>
        </a>`).join("")}
    </div>
    <section class="card">
      <p class="sec-no">Cara memakai</p>
      <h3>Cara memakai</h3>
      <ol class="lead" style="margin:0;padding-left:1.2rem">
        <li>Pilih menu, isi teks dan kunci (seed dan tap untuk LFSR).</li>
        <li>Jalankan enkripsi atau dekripsi.</li>
        <li>Telusuri jejak langkah untuk melihat tiap perubahan.</li>
      </ol>
    </section>`;
}
