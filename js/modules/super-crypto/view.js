import { encryptPipeline, decryptPipeline } from "./pipeline.js";
import { panel, field, textInput, textArea, btn, wireCopy, renderStepper } from "../../shared/components.js";

/**
 * Render Menu 5 Super Enkripsi on the shared kit.
 * @param {HTMLElement} root - container
 * @returns {void}
 */
export function renderSuper(root) {
  root.innerHTML =
    panel("01", "Menu 5 - Super Enkripsi", "layers", `
      <p class="lead">Merangkai Klasik 1 - Klasik 2 - LFSR - Modern 2. Tahap yang aktif saat ini hanya LFSR.</p>
      ${field("Masukan", textArea("s-in", "Teks biasa untuk enkripsi berantai"))}
      <div class="grid sm:grid-cols-2 gap-4">
        ${field("Seed LFSR", textInput("s-seed", "1011"))}
        ${field("Tap LFSR", textInput("s-taps", "0,2"))}
      </div>
      <div class="btn-row">
        ${btn("s-enc", "layers", "Enkripsi berantai")}
        ${btn("s-dec", "refresh", "Dekripsi berantai", false)}
      </div>`) +
    panel("02", "Keluaran", "terminal", `
      <div class="output font-mono text-sm" id="s-out">-</div>
      <div class="btn-row">${btn("s-copy", "copy", "Salin", false)}</div>`) +
    panel("03", "Jejak gabungan", "list", `<div id="s-trace"></div>`);

  const keys = () => ({
    classic1: {}, classic2: {}, modern2: {},
    modern1: {
      seed: root.querySelector("#s-seed").value.trim(),
      taps: root.querySelector("#s-taps").value.split(",").map((x) => x.trim()).filter(Boolean).map(Number)
    }
  });
  const run = (fn) => {
    const out = root.querySelector("#s-out");
    try {
      const r = fn(root.querySelector("#s-in").value, keys());
      out.textContent = r.result === "" ? "(kosong)" : r.result;
      renderStepper(root.querySelector("#s-trace"), r.steps);
    } catch (err) { out.textContent = "Galat: " + err.message; }
  };
  root.querySelector("#s-enc").onclick = () => run(encryptPipeline);
  root.querySelector("#s-dec").onclick = () => run(decryptPipeline);
  wireCopy(root, "s-copy", "s-out");
}
