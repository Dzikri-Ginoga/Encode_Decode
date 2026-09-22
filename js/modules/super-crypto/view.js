import { encryptPipeline, decryptPipeline } from "./pipeline.js";
import { panel, field, textInput, textArea, btn, flowStrip, wireCopy, renderStepper } from "../../shared/components.js";

/**
 * Render Menu 5 Super Enkripsi: kolom alat + kolom keluaran.
 * @param {HTMLElement} root - container
 * @returns {void}
 */
export function renderSuper(root) {
  root.innerHTML =
    `<h1 class="display">Empat sandi, satu alur.</h1>
     <p class="lead" style="margin-bottom:var(--space-section)">Keluaran tiap tahap menjadi masukan tahap berikut. Jejaknya digabung berurutan.</p>` +
    flowStrip([["key", "Klasik 1"], ["key", "Klasik 2"], ["lock", "LFSR"], ["cpu", "Modern 2"]]) +
    `<div class="tool-grid" style="margin-top:var(--space-section)">` +
    panel("Masukkan dan kunci",
      "Hanya tahap LFSR yang aktif saat ini.",
      `${field("Teks", textArea("s-in", "Ketik teks biasa."))}
      <div class="grid sm:grid-cols-2 gap-4">
        ${field("Seed LFSR", textInput("s-seed", "1011"))}
        ${field("Tap LFSR", textInput("s-taps", "0,2"))}
      </div>
      <div class="btn-row">
        ${btn("s-enc", "layers", "Enkripsi berantai")}
        ${btn("s-dec", "refresh", "Dekripsi berantai", false)}
      </div>`) +
    panel("Hasil",
      "Keluaran tahap terakhir.",
      `<div class="output font-mono text-sm" id="s-out"><span class="empty">Hasil muncul di sini.</span></div>
      <div class="btn-row">${btn("s-copy", "copy", "Salin", false)}</div>`) +
    `</div>` +
    panel("Jejak gabungan",
      "Per tahap, berurutan.",
      `<div id="s-trace"><p class="empty">Jalankan dulu untuk melihat langkahnya.</p></div>`);

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
