import { encrypt } from "./cipher.js";
import { renderSteps } from "../../shared/utils.js";
import { panel, field, textArea, btn, placeholder } from "../../shared/components.js";

/**
 * Render Menu 4 placeholder tab on the shared kit.
 * @param {HTMLElement} root - container
 * @returns {void}
 */
export function renderModern2(root) {
  root.innerHTML =
    placeholder("Menu 4 - Modern 2", "Modul milik anggota lain. Bagian ini menunggu implementasi.") +
    panel("01", "Alat", "cpu", `
      ${field("Masukan", textArea("m2-in", "Teks biasa"))}
      <div class="btn-row">${btn("m2-go", "play", "Jalankan")}</div>`) +
    panel("02", "Keluaran", "terminal", `<div class="output font-mono text-sm" id="m2-out">-</div>`) +
    panel("03", "Jejak langkah", "list", `<div class="trace" id="m2-trace"></div>`);
  root.querySelector("#m2-go").onclick = () => {
    const r = encrypt(root.querySelector("#m2-in").value, {});
    root.querySelector("#m2-out").textContent = r.result;
    renderSteps(root.querySelector("#m2-trace"), r.steps);
  };
}
