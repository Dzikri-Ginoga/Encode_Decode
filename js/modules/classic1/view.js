import { encrypt } from "./cipher.js";
import { renderSteps } from "../../shared/utils.js";
import { panel, field, textArea, btn, placeholder } from "../../shared/components.js";

/**
 * Render Menu 1 placeholder tab on the shared kit.
 * @param {HTMLElement} root - container
 * @returns {void}
 */
export function renderClassic1(root) {
  root.innerHTML =
    placeholder("Menu 1 - Klasik 1", "Modul milik anggota lain. Bagian ini menunggu implementasi.") +
    panel("01", "Alat", "key", `
      ${field("Masukan", textArea("c1-in", "Teks biasa"))}
      <div class="btn-row">${btn("c1-go", "play", "Jalankan")}</div>`) +
    panel("02", "Keluaran", "terminal", `<div class="output font-mono text-sm" id="c1-out">-</div>`) +
    panel("03", "Jejak langkah", "list", `<div class="trace" id="c1-trace"></div>`);
  root.querySelector("#c1-go").onclick = () => {
    const r = encrypt(root.querySelector("#c1-in").value, {});
    root.querySelector("#c1-out").textContent = r.result;
    renderSteps(root.querySelector("#c1-trace"), r.steps);
  };
}
