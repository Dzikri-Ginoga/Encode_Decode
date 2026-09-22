/**
 * Shared UI kit. DOM helpers only, no cipher math.
 * Solid light theme. All views consume this.
 * @module shared/components
 */
import { renderSteps } from "./utils.js";

/**
 * Wrap content in a solid card.
 * @param {string} no - section number, e.g. "01"
 * @param {string} title - heading
 * @param {string} icon - iconoir class suffix
 * @param {string} body - inner HTML
 * @returns {string} section HTML
 */
export function panel(no, title, icon, body) {
  return `
  <section class="card">
    <p class="sec-no">${no}</p>
    <h2><i class="iconoir-${icon}"></i>${title}</h2>
    ${body}
  </section>`;
}

/**
 * Labeled input row.
 * @param {string} label - field label
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
 * Bit grid with tap highlights for LFSR seed display.
 * @param {string} bits - binary string
 * @param {number[]} taps - highlighted indexes
 * @returns {string} grid HTML
 */
export function bitGrid(bits, taps = []) {
  return `<div class="flex flex-wrap gap-1.5 mt-2" role="img" aria-label="seed ${bits}">` +
    [...bits].map((b, i) =>
      `<span class="bit-cell ${taps.includes(i) ? "tap" : ""} ${b === "1" ? "on" : ""}" title="posisi ${i}${taps.includes(i) ? " (tap)" : ""}">${b}</span>`
    ).join("") + `</div>`;
}

/**
 * Copy button wiring for an output element.
 * @param {HTMLElement} scope - view root
 * @param {string} btnId - button id
 * @param {string} outId - output element id
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
 * Stepper over a steps array with prev/next controls.
 * @param {HTMLElement} el - container
 * @param {Array<{title: string, detail: string}>} steps - trace
 * @returns {void}
 */
export function renderStepper(el, steps) {
  let idx = steps.length - 1;
  const draw = () => {
    el.innerHTML = `
      <div class="stepbar">
        <button id="st-prev" class="btn-plain" aria-label="Langkah sebelumnya"><i class="iconoir-arrow-left"></i></button>
        <span class="pos">Langkah ${steps.length ? idx + 1 : 0} / ${steps.length}</span>
        <button id="st-next" class="btn-plain" aria-label="Langkah berikut"><i class="iconoir-arrow-right"></i></button>
        <button id="st-all" class="link">Tampilkan semua</button>
      </div>
      <div class="trace"></div>`;
    const box = el.querySelector(".trace");
    renderSteps(box, steps.length ? [steps[idx]] : []);
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
 * Placeholder card for member-owned stubs.
 * @param {string} menu - menu name
 * @param {string} owner - owner note
 * @returns {string} HTML
 */
export function placeholder(menu, owner) {
  return panel("00", menu, "hammer",
    `<p class="lead"><i class="iconoir-user"></i> ${owner}</p>
     <p class="f-hint">Bagian ini menunggu implementasi pemiliknya. Struktur halaman sudah siap.</p>`);
}
