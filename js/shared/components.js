/**
 * Shared UI kit v2. DOM helpers only, no cipher math.
 * Classes reference tokens, no hex here.
 * @module shared/components
 */
import { renderSteps } from "./utils.js";

/**
 * Solid card with title and short description.
 * @param {string} title - card title
 * @param {string} desc - one-line orientation, may be empty
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
 * Labeled input row.
 * @param {string} label - label
 * @param {string} input - input HTML
 * @param {string} hint - helper text
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
 * Illustrative flow strip: Step 1 > Step 2 > ...
 * @param {Array<[string, string]>} items - pairs [icon, label]
 * @returns {string} flow HTML
 */
export function flowStrip(items) {
  return `<ol class="flow">` + items.map(([ic, lb], i) =>
    `${i > 0 ? `<li class="sep" aria-hidden="true">›</li>` : ""}<li><i class="iconoir-${ic}"></i>${lb}</li>`
  ).join("") + `</ol>`;
}

/**
 * Bit grid with tap highlight for LFSR seed display.
 * @param {string} bits - binary string
 * @param {number[]} taps - highlight indexes
 * @returns {string} grid HTML
 */
export function bitGrid(bits, taps = []) {
  return `<div class="flex flex-wrap gap-1.5 mt-2" role="img" aria-label="seed ${bits}">` +
    [...bits].map((b, i) =>
      `<span class="bit-cell ${taps.includes(i) ? "tap" : ""} ${b === "1" ? "on" : ""}" title="posisi ${i}${taps.includes(i) ? " (tap)" : ""}">${b}</span>`
    ).join("") + `</div>`;
}

/**
 * Wire copy button to output element.
 * @param {HTMLElement} scope - root view
 * @param {string} btnId - button id
 * @param {string} outId - output id
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
 * Stepper over steps array with prev/next controls.
 * @param {HTMLElement} el - container
 * @param {Array<{title: string, detail: string}>} steps - trace
 * @param {string} emptyNote - text when empty
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
 * Dual-thumb tap range slider. One control, two tap positions.
 * @param {number} lo - first tap position
 * @param {number} hi - second tap position
 * @param {number} max - highest position (seed length - 1)
 * @returns {string} slider HTML
 */
export function dualRange(lo, hi, max) {
  return `<div class="dual-range">` +
    `<div class="dual-track"><div class="dual-fill"></div></div>` +
    `<input type="range" min="0" max="${max}" step="1" value="${lo}" data-thumb="0" aria-label="Tap bawah">` +
    `<input type="range" min="0" max="${max}" step="1" value="${hi}" data-thumb="1" aria-label="Tap atas">` +
    `</div><div class="dual-val font-mono" aria-live="polite">Tap: ${lo}, ${hi}</div>`;
}

/**
 * Placeholder card for member-owned stub.
 * @param {string} menu - menu name
 * @returns {string} HTML
 */
export function placeholder(menu) {
  return panel(menu, "Milik anggota lain.", ``);
}
