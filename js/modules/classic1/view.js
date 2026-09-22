import { encrypt } from "./cipher.js";
import { renderSteps } from "../../shared/utils.js";
import { panel, field, textArea, btn, placeholder } from "../../shared/components.js";

/**
 * Render Menu 1 placeholder.
 * @param {HTMLElement} root - container
 * @returns {void}
 */
export function renderClassic1(root) {
  root.innerHTML =
    `<h1 class="display">Klasik 1.</h1>` +
    placeholder("Menunggu cipher") +
    panel("Alat",
      "",
      `${field("Teks", textArea("c1-in", "Ketik teks biasa."))}
      <div class="btn-row">${btn("c1-go", "play", "Jalankan")}</div>`) +
    panel("Hasil", "", `<div class="output font-mono text-sm" id="c1-out"><span class="empty">Hasil muncul di sini.</span></div>`);
  root.querySelector("#c1-go").onclick = () => {
    const r = encrypt(root.querySelector("#c1-in").value, {});
    root.querySelector("#c1-out").textContent = r.result === "" ? "(kosong)" : r.result;
  };
}
