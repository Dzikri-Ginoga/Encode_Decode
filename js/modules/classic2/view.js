import { encrypt } from "./cipher.js";
import { renderSteps } from "../../shared/utils.js";
import { panel, field, textArea, btn, placeholder } from "../../shared/components.js";

/**
 * Render Menu 2 placeholder tab on the shared kit.
 * @param {HTMLElement} root - container
 * @returns {void}
 */
export function renderClassic2(root) {
  root.innerHTML =
    placeholder("Menu 2 - Klasik 2", "Modul milik anggota lain. Bagian ini menunggu implementasi.") +
    panel("01", "Alat", "key", `
      ${field("Masukan", textArea("c2-in", "Teks biasa"))}
      <div class="btn-row">${btn("c2-go", "play", "Jalankan")}</div>`) +
    panel("02", "Keluaran", "terminal", `<div class="output font-mono text-sm" id="c2-out">-</div>`) +
    panel("03", "Jejak langkah", "list", `<div class="trace" id="c2-trace"></div>`);
  root.querySelector("#c2-go").onclick = () => {
    const r = encrypt(root.querySelector("#c2-in").value, {});
    root.querySelector("#c2-out").textContent = r.result;
    renderSteps(root.querySelector("#c2-trace"), r.steps);
  };
}
