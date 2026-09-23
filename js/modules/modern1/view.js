import { encrypt, decrypt } from "./cipher.js";
import { isBinary } from "../../shared/utils.js";
import { panel, field, textInput, textArea, btn, bitGrid, flowStrip, wireCopy, renderStepper, dualRange } from "../../shared/components.js";

/**
 * Render Menu 3 LFSR: kolom alat + kolom keluaran, jejak penuh di bawah.
 * @param {HTMLElement} root - container
 * @returns {void}
 */
export function renderModern1(root) {
  root.innerHTML =
    `<h1 class="display">Stream Cipher + LFSR</h1>` +
    flowStrip([["text", "Teks"], ["binary", "Bit"], ["key", "Keystream"], ["lock", "Sandi"]]) +
    `<div class="tool-grid" style="margin-top:var(--space-section)">` +
    panel("Masukkan dan kunci",
      "",
      `${field("Teks", textArea("m1-in", "Teks biasa, atau deretan bit untuk dekripsi."))}
      <div class="grid sm:grid-cols-2 gap-4">
        ${field("Seed", textInput("m1-seed", "1011"), "Biner 2-32 bit, jangan nol semua.")}
        <div class="f-label"><span>Tap</span><div id="m1-taps"></div><span class="f-hint">Geser dua tap, 0 dari kiri.</span></div>
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

  let taps = [0, 2];
  const maxTap = () => {
    const seed = root.querySelector("#m1-seed").value.trim();
    return isBinary(seed) ? seed.length - 1 : 0;
  };
  const clampTap = (t, mx) => Math.min(Math.max(0, t | 0), mx);
  const currentTaps = () => {
    const mx = maxTap();
    return [...new Set(taps.map((t) => clampTap(t, mx)))].sort((a, b) => a - b);
  };
  const paintGrid = () => {
    const seed = root.querySelector("#m1-seed").value.trim();
    root.querySelector("#m1-grid").innerHTML =
      isBinary(seed) ? bitGrid(seed, currentTaps()) : "";
  };
  const syncDual = () => {
    const box = root.querySelector("#m1-taps");
    const mx = maxTap() || 1;
    const [a, b] = taps;
    const fill = box.querySelector(".dual-fill");
    if (fill) {
      fill.style.left = (Math.min(a, b) / mx * 100) + "%";
      fill.style.width = (Math.abs(b - a) / mx * 100) + "%";
    }
    const val = box.querySelector(".dual-val");
    if (val) val.textContent = `Tap: ${currentTaps().join(", ")}`;
    paintGrid();
  };
  const paintTaps = () => {
    const seed = root.querySelector("#m1-seed").value.trim();
    const box = root.querySelector("#m1-taps");
    if (!isBinary(seed)) { box.innerHTML = ""; paintGrid(); return; }
    const mx = Math.max(seed.length - 1, 0);
    taps = [clampTap(taps[0], mx), clampTap(taps[1] ?? taps[0], mx)];
    box.innerHTML = dualRange(taps[0], taps[1], mx);
    box.querySelectorAll('input[type="range"]').forEach((el) => el.oninput = () => {
      taps[Number(el.dataset.thumb)] = Number(el.value);
      syncDual();
    });
    syncDual();
  };
  root.querySelector("#m1-seed").oninput = paintTaps;
  paintTaps();

  const run = (fn) => {
    const out = root.querySelector("#m1-out");
    const trace = root.querySelector("#m1-trace");
    try {
      const r = fn(root.querySelector("#m1-in").value, {
        seed: root.querySelector("#m1-seed").value.trim(),
        taps: currentTaps()
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
