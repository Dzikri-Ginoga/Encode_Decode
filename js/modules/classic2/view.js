import { encrypt } from "./cipher.js";
import { panel, field, textArea, btn, placeholder } from "../../shared/components.js";

/**
 * Render Menu 2 placeholder.
 * @param {HTMLElement} root - container
 * @returns {void}
 */
export function renderClassic2(root) {
  root.innerHTML =
    `<h1 class="display">Klasik 2.</h1>` +
    placeholder("Menunggu cipher") +
    panel("Alat",
      "",
      `${field("Teks", textArea("c2-in", "Ketik teks biasa."))}
      <div class="btn-row">${btn("c2-go", "play", "Jalankan")}</div>`) +
    panel("Hasil", "", `<div class="output font-mono text-sm" id="c2-out"><span class="empty">Hasil muncul di sini.</span></div>`);
  root.querySelector("#c2-go").onclick = () => {
    const r = encrypt(root.querySelector("#c2-in").value, {});
    root.querySelector("#c2-out").textContent = r.result === "" ? "(kosong)" : r.result;
  };
}
