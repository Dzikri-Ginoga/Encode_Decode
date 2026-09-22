/**
 * Shared UI kit. DOM helpers only, no cipher math.
 * Tailwind classes + Iconoir icons. All views consume this.
 * @module shared/components
 */
import { renderSteps } from "./utils.js";

/**
 * Wrap content in a glass panel section.
 * @param {string} title - panel heading
 * @param {string} icon - iconoir class suffix, e.g. "lock"
 * @param {string} body - inner HTML
 * @returns {string} section HTML
 */
export function panel(title, icon, body) {
  return `
  <section class="rounded-2xl border border-white/10 bg-panel/80 backdrop-blur p-5 mb-5 shadow-xl shadow-black/30">
    <h2 class="text-lg font-bold flex items-center gap-2 mb-1"><i class="iconoir-${icon} text-accent"></i>${title}</h2>
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
  <label class="block mt-4">
    <span class="text-xs uppercase tracking-wider text-slate-400">${label}</span>
    ${input}
    ${hint ? `<span class="block text-xs text-slate-500 mt-1">${hint}</span>` : ""}
  </label>`;
}

export const textInput = (id, val = "", ph = "") =>
  `<input id="${id}" type="text" value="${val}" placeholder="${ph}"
    class="mt-1 w-full rounded-lg bg-abyss border border-white/10 px-3 py-2 font-mono text-sm focus:outline-none focus:border-accent">`;

export const textArea = (id, ph = "") =>
  `<textarea id="${id}" rows="3" placeholder="${ph}"
    class="mt-1 w-full rounded-lg bg-abyss border border-white/10 px-3 py-2 font-mono text-sm focus:outline-none focus:border-accent"></textarea>`;

export const btn = (id, icon, label, primary = true) =>
  `<button id="${id}" class="${primary
    ? "bg-accent text-slate-950 font-bold"
    : "bg-white/5 text-slate-200 border border-white/10"} rounded-lg px-4 py-2 text-sm flex items-center gap-2 hover:opacity-90 active:scale-95 transition">
    <i class="iconoir-${icon}"></i>${label}</button>`;

/**
 * Bit grid with tap highlights for LFSR seed display.
 * @param {string} bits - binary string
 * @param {number[]} taps - highlighted indexes
 * @returns {string} grid HTML
 */
export function bitGrid(bits, taps = []) {
  return `<div class="flex flex-wrap gap-1.5 mt-2" role="img" aria-label="seed ${bits}">` +
    [...bits].map((b, i) =>
      `<span class="bit-cell ${taps.includes(i) ? "tap" : ""} ${b === "1" ? "on" : ""}" title="pos ${i}${taps.includes(i) ? " (tap)" : ""}">${b}</span>`
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
  b.onclick = async () => {
    const t = scope.querySelector("#" + outId)?.textContent ?? "";
    try { await navigator.clipboard.writeText(t); b.innerHTML = `<i class="iconoir-check"></i>Copied`; }
    catch { b.innerHTML = `<i class="iconoir-warning-triangle"></i>Copy failed`; }
    setTimeout(() => { b.innerHTML = `<i class="iconoir-copy"></i>Copy`; }, 1200);
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
      <div class="flex items-center gap-2 mb-3">
        <button id="st-prev" class="rounded-lg bg-white/5 border border-white/10 px-3 py-1.5 text-sm hover:border-accent"><i class="iconoir-arrow-left"></i></button>
        <span class="text-xs text-slate-400 font-mono">step ${steps.length ? idx + 1 : 0} / ${steps.length}</span>
        <button id="st-next" class="rounded-lg bg-white/5 border border-white/10 px-3 py-1.5 text-sm hover:border-accent"><i class="iconoir-arrow-right"></i></button>
        <button id="st-all" class="ml-auto text-xs text-slate-400 underline">show all</button>
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
  return panel(menu, "hammer",
    `<p class="text-sm text-slate-400 flex items-center gap-2"><i class="iconoir-user"></i>${owner}</p>
     <p class="text-xs text-slate-500 mt-2">Stub implements the module contract so the shell keeps working. Owner replaces cipher.js and view Tool section.</p>`);
}
