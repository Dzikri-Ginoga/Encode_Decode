/**
 * Shared UI kit v2. DOM helpers only, no cipher math.
 * Kelas mengacu ke token, tidak ada hex di sini.
 * @module shared/components
 */
import { renderSteps } from "./utils.js";

/**
 * Kartu solid dengan judul dan deskripsi singkat.
 * @param {string} title - judul kartu
 * @param {string} desc - satu kalimat orientasi, boleh kosong
 * @param {string} body - inner HTML
 * @returns {string} section HTML
 */
export function panel(title, desc, body) {
  return `
  <section class="card">
    <h2>${title}</h2>
    ${desc ? `<p class="lead">${desc}</p>` : ""}
    ${body}
  </section>`;
}

/**
 * Baris input berlabel.
 * @param {string} label - label
 * @param {string} input - input HTML
 * @param {string} hint - teks bantu
 * @returns {string} field HTML
 */
export function field(label, input, hint = "") {
  return `
  <label class="f-label">
    <span>${label}</span>
    ${input}
    ${hint ? `<span class="f-hint">${hint}</span>` : ""}
  </label>`;
}

export const textInput = (id, val = "", ph = "") =>
  `<input id="${id}" type="text" value="${val}" placeholder="${ph}" class="f-input">`;

export const textArea = (id, ph = "") =>
  `<textarea id="${id}" rows="3" placeholder="${ph}" class="f-area"></textarea>`;

export const btn = (id, icon, label, primary = true) =>
  `<button id="${id}" class="${primary ? "btn-solid" : "btn-plain"}"><i class="iconoir-${icon}"></i>${label}</button>`;

/**
 * Strip alur ilustratif: Tahap 1 > Tahap 2 > ...
 * @param {Array<[string, string]>} items - pasangan [ikon, label]
 * @returns {string} flow HTML
 */
export function flowStrip(items) {
  return `<ol class="flow">` + items.map(([ic, lb], i) =>
    `${i > 0 ? `<li class="sep" aria-hidden="true">›</li>` : ""}<li><i class="iconoir-${ic}"></i>${lb}</li>`
  ).join("") + `</ol>`;
}

/**
 * Bit grid dengan highlight tap untuk tampilan seed LFSR.
 * @param {string} bits - deretan biner
 * @param {number[]} taps - indeks highlight
 * @returns {string} grid HTML
 */
export function bitGrid(bits, taps = []) {
  return `<div class="flex flex-wrap gap-1.5 mt-2" role="img" aria-label="seed ${bits}">` +
    [...bits].map((b, i) =>
      `<span class="bit-cell ${taps.includes(i) ? "tap" : ""} ${b === "1" ? "on" : ""}" title="posisi ${i}${taps.includes(i) ? " (tap)" : ""}">${b}</span>`
    ).join("") + `</div>`;
}

/**
 * Kabel tombol salin ke elemen keluaran.
 * @param {HTMLElement} scope - root view
 * @param {string} btnId - id tombol
 * @param {string} outId - id keluaran
 * @returns {void}
 */
export function wireCopy(scope, btnId, outId) {
  const b = scope.querySelector("#" + btnId);
  if (!b) return;
  const original = b.innerHTML;
  b.onclick = async () => {
    const t = scope.querySelector("#" + outId)?.textContent ?? "";
    try { await navigator.clipboard.writeText(t); b.innerHTML = `<i class="iconoir-check"></i>Disalin`; }
    catch { b.innerHTML = `<i class="iconoir-warning-triangle"></i>Gagal menyalin`; }
    setTimeout(() => { b.innerHTML = original; }, 1200);
  };
}

/**
 * Stepper di atas array steps dengan kontrol sebelum/berikut.
 * @param {HTMLElement} el - wadah
 * @param {Array<{title: string, detail: string}>} steps - jejak
 * @param {string} emptyNote - teks saat kosong
 * @returns {void}
 */
export function renderStepper(el, steps, emptyNote = "Jalankan dulu untuk melihat langkahnya.") {
  if (!steps.length) { el.innerHTML = `<p class="empty">${emptyNote}</p>`; return; }
  let idx = steps.length - 1;
  const draw = () => {
    el.innerHTML = `
      <div class="stepbar">
        <button id="st-prev" class="btn-plain" aria-label="Langkah sebelumnya"><i class="iconoir-arrow-left"></i></button>
        <span class="pos">Langkah ${idx + 1} / ${steps.length}</span>
        <button id="st-next" class="btn-plain" aria-label="Langkah berikut"><i class="iconoir-arrow-right"></i></button>
        <button id="st-all" class="link">Tampilkan semua</button>
      </div>
      <div class="trace"></div>`;
    const box = el.querySelector(".trace");
    renderSteps(box, [steps[idx]]);
    el.querySelector("#st-prev").onclick = () => { idx = Math.max(0, idx - 1); draw(); };
    el.querySelector("#st-next").onclick = () => { idx = Math.min(steps.length - 1, idx + 1); draw(); };
    el.querySelector("#st-all").onclick = () => {
      renderSteps(box, steps);
      el.querySelector("#st-all").remove();
    };
  };
  draw();
}

/**
 * Kartu placeholder untuk stub milik anggota.
 * @param {string} menu - nama menu
 * @returns {string} HTML
 */
export function placeholder(menu) {
  return panel(menu, "Milik anggota lain.", ``);
}
