import { encrypt, decrypt } from "./cipher.js";
import { isBinary } from "../../shared/utils.js";
import { panel, field, textInput, textArea, btn, bitGrid, flowStrip, wireCopy, renderStepper } from "../../shared/components.js";

/**
 * Render Menu 3 LFSR: kolom alat + kolom keluaran, jejak penuh di bawah.
 * @param {HTMLElement} root - container
 * @returns {void}
 */
export function renderModern1(root) {
  root.innerHTML =
    `<h1 class="display">Aliran LFSR.</h1>` +
    flowStrip([["text", "Teks"], ["binary", "Bit"], ["key", "Keystream"], ["lock", "Sandi"]]) +
    `<div class="tool-grid" style="margin-top:var(--space-section)">` +
    panel("Masukkan dan kunci",
      "",
      `${field("Teks", textArea("m1-in", "Teks biasa, atau deretan bit untuk dekripsi."))}
      <div class="grid sm:grid-cols-2 gap-4">
        ${field("Seed", textInput("m1-seed", "1011"), "Biner 2-32 bit, jangan nol semua.")}
        ${field("Tap", textInput("m1-taps", "0,2"), "Angka pisah koma, 0 dari kiri.")}
      </div>
      <div id="m1-grid"></div>
      <div class="btn-row">
        ${btn("m1-enc", "lock", "Enkripsi")}
        ${btn("m1-dec", "unlock", "Dekripsi", false)}
      </div>`) +
    panel("Hasil",
      "",
      `<div class="output font-mono text-sm" id="m1-out"><span class="empty">Hasil muncul di sini.</span></div>
      <div class="btn-row">${btn("m1-copy", "copy", "Salin", false)}</div>`) +
    `</div>` +
    panel("Jejak langkah",
      "",
      `<div id="m1-trace"><p class="empty">Jalankan dulu untuk melihat langkahnya.</p></div>`) +
    panel("Kenapa ini bekerja",
      "",
      `<ul class="about-list">
        <li><b>Satu bit satu langkah.</b> Tiap karakter jadi 8 bit, tiap bit di-XOR dengan keystream.</li>
        <li><b>Seed menentukan segalanya.</b> Seed dan tap yang sama selalu menghasilkan keystream yang sama.</li>
        <li><b>Dekripsi = enkripsi ulang.</b> XOR kedua dengan aliran yang sama mengembalikan teks asal.</li>
      </ul>`);

  const parseTaps = (s) => s.split(",").map((x) => x.trim()).filter((x) => x !== "").map(Number);
  const paintGrid = () => {
    const seed = root.querySelector("#m1-seed").value.trim();
    const taps = parseTaps(root.querySelector("#m1-taps").value);
    root.querySelector("#m1-grid").innerHTML =
      isBinary(seed) ? bitGrid(seed, taps.filter((t) => Number.isInteger(t) && t >= 0 && t < seed.length)) : "";
  };
  root.querySelector("#m1-seed").oninput = paintGrid;
  root.querySelector("#m1-taps").oninput = paintGrid;
  paintGrid();

  const run = (fn) => {
    const out = root.querySelector("#m1-out");
    const trace = root.querySelector("#m1-trace");
    try {
      const r = fn(root.querySelector("#m1-in").value, {
        seed: root.querySelector("#m1-seed").value.trim(),
        taps: parseTaps(root.querySelector("#m1-taps").value)
      });
      out.textContent = r.result === "" ? "(kosong)" : r.result;
      renderStepper(trace, r.steps);
    } catch (err) {
      out.textContent = "Galat: " + err.message;
      trace.innerHTML = `<p class="empty">Perbaiki masukan, lalu jalankan lagi.</p>`;
    }
  };
  root.querySelector("#m1-enc").onclick = () => run(encrypt);
  root.querySelector("#m1-dec").onclick = () => run(decrypt);
  wireCopy(root, "m1-copy", "m1-out");
}
