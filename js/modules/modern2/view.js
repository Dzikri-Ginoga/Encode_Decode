import { encrypt } from "./cipher.js";
import { panel, field, textArea, btn, placeholder } from "../../shared/components.js";

/**
 * Render Menu 4 placeholder.
 * @param {HTMLElement} root - container
 * @returns {void}
 */
export function renderModern2(root) {
  root.innerHTML =
    `<h1 class="display">Modern 2.</h1>
     <p class="lead" style="margin-bottom:var(--space-section)">Ruang anggota lain. Kerangka siap, cipher menyusul.</p>` +
    placeholder("Menunggu cipher") +
    panel("Alat",
      "Jalankan untuk melihat kontrak modul.",
      `${field("Teks", textArea("m2-in", "Ketik teks biasa."))}
      <div class="btn-row">${btn("m2-go", "play", "Jalankan")}</div>`) +
    panel("Hasil", "", `<div class="output font-mono text-sm" id="m2-out"><span class="empty">Hasil muncul di sini.</span></div>`);
  root.querySelector("#m2-go").onclick = () => {
    const r = encrypt(root.querySelector("#m2-in").value, {});
    root.querySelector("#m2-out").textContent = r.result === "" ? "(kosong)" : r.result;
  };
}
