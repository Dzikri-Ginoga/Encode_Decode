import { encrypt, decrypt } from "./cipher.js";
import { panel, field, textInput, textArea, btn, flowStrip, wireCopy, renderStepper } from "../../shared/components.js";

/**
 * Render Menu 4 S-DES Block Cipher: panel konfigurasi, hasil, dan log trace blok.
 * @param {HTMLElement} root - container
 * @returns {void}
 */
export function renderModern2(root) {
  root.innerHTML =
    `<h1 class="display">Block Cipher S-DES.</h1>` +
    flowStrip([["text", "Teks"], ["binary", "Blok 8-Bit"], ["key", "K1 & K2"], ["lock", "Sandi"]]) +
    `<div class="tool-grid" style="margin-top:var(--space-section)">` +
    panel("Masukkan dan Kunci",
      "",
      `${field("Teks", textArea("m2-in", "Teks biasa untuk enkripsi, atau deretan bit kelipatan 8 untuk dekripsi."))}
      <div class="grid sm:grid-cols-1 gap-4">
        ${field("Kunci S-DES (10-bit)", textInput("m2-key", "1010000010"), "Harus tepat 10 bit biner (0 atau 1).")}
      </div>
      <div class="btn-row" style="margin-top:1rem;">
        ${btn("m2-enc", "lock", "Enkripsi")}
        ${btn("m2-dec", "unlock", "Dekripsi", false)}
      </div>`) +
    panel("Hasil",
      "",
      `<div class="output font-mono text-sm" id="m2-out"><span class="empty">Hasil muncul di sini.</span></div>
      <div class="btn-row">${btn("m2-copy", "copy", "Salin", false)}</div>`) +
    `</div>` +
    panel("Jejak Langkah (Trace Per Blok)",
      "",
      `<div id="m2-trace"><p class="empty">Jalankan dulu untuk melihat langkahnya.</p></div>`) +
    panel("Prinsip Kerja S-DES",
      "",
      `<ul class="about-list">
        <li><b>Berbasis Blok 8-bit.</b> Teks dipecah menjadi unit 1 byte (8 bit) dan diproses secara terpisah.</li>
        <li><b>Subkey Scheduler.</b> Kunci 10-bit ditransformasi lewat P10, Shift, dan P8 untuk memproduksi dua subkunci 8-bit (K1 dan K2).</li>
        <li><b>Jaringan Feistel 2-Round.</b> Menggunakan permutasi ekspansi (EP), substitusi kotak S-Box (S0, S1), permutasi P4, serta penukaran blok (switch) antar-round.</li>
        <li><b>Dekripsi Simetris Terbalik.</b> Struktur dekripsi sama dengan enkripsi, hanya urutan pemakaian subkuncinya dibalik: K2 lalu K1.</li>
      </ul>`);

  const run = (fn) => {
    const out = root.querySelector("#m2-out");
    const trace = root.querySelector("#m2-trace");
    try {
      const r = fn(root.querySelector("#m2-in").value, {
        key: root.querySelector("#m2-key").value.trim()
      });
      out.textContent = r.result === "" ? "(kosong)" : r.result;
      renderStepper(trace, r.steps);
    } catch (err) {
      out.textContent = "Galat: " + err.message;
      trace.innerHTML = `<p class="empty">Perbaiki masukan, lalu jalankan lagi.</p>`;
    }
  };

  root.querySelector("#m2-enc").onclick = () => run(encrypt);
  root.querySelector("#m2-dec").onclick = () => run(decrypt);
  wireCopy(root, "m2-copy", "m2-out");
}