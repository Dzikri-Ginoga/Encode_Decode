import { encryptPipeline, decryptPipeline } from "./pipeline.js";
import { panel, field, textInput, textArea, btn, flowStrip, wireCopy, renderStepper } from "../../shared/components.js";

/**
 * Render Menu 5 Super Enkripsi: kolom alat + kolom keluaran.
 * @param {HTMLElement} root - container
 * @returns {void}
 */
export function renderSuper(root) {
  root.innerHTML =
    `<h1 class="display">Super Enkripsi.</h1>` +
    flowStrip([["key", "Klasik 1"], ["key", "Klasik 2"], ["lock", "LFSR"], ["cpu", "Modern 2"]]) +
    `<div class="tool-grid" style="margin-top:var(--space-section)">` +
    panel("Masukkan dan kunci",
      "Kunci untuk seluruh tahap enkripsi berantai.",
      `${field("Teks", textArea("s-in", "Ketik teks biasa."))}
      <div class="grid sm:grid-cols-2 gap-4">
        ${field("Shift Caesar (Klasik 1)", textInput("s-c1", "3"))}
        ${field("Keyword Vigenère (Klasik 2)", textInput("s-c2", "KUNCI"))}
        ${field("Seed LFSR (Modern 1)", textInput("s-seed", "1011"))}
        ${field("Tap LFSR (Modern 1)", textInput("s-taps", "0,2"))}
        <div class="sm:col-span-2">
          ${field("Kunci 10-Bit S-DES (Modern 2)", textInput("s-m2", "1010000010"))}
        </div>
      </div>
      <div class="btn-row">
        ${btn("s-enc", "layers", "Enkripsi berantai")}
        ${btn("s-dec", "refresh", "Dekripsi berantai", false)}
      </div>`) +
    panel("Hasil",
      "",
      `<div class="output font-mono text-sm" id="s-out"><span class="empty">Hasil muncul di sini.</span></div>
      <div class="btn-row">${btn("s-copy", "copy", "Salin", false)}</div>`) +
    `</div>` +
    panel("Jejak gabungan",
      "",
      `<div id="s-trace"><p class="empty">Jalankan dulu untuk melihat langkahnya.</p></div>`);

  const keys = () => ({
    classic1: { shift: Number(root.querySelector("#s-c1")?.value.trim()) || 3 },
    classic2: { keyword: root.querySelector("#s-c2")?.value.trim() || "KUNCI" },
    modern1: {
      seed: root.querySelector("#s-seed").value.trim(),
      taps: root.querySelector("#s-taps").value.split(",").map((x) => x.trim()).filter(Boolean).map(Number)
    },
    modern2: { key: root.querySelector("#s-m2")?.value.trim() || "1010000010" }
  });

  const run = (fn) => {
    const out = root.querySelector("#s-out");
    try {
      const r = fn(root.querySelector("#s-in").value, keys());
      out.textContent = r.result === "" ? "(kosong)" : r.result;
      renderStepper(root.querySelector("#s-trace"), r.steps);
    } catch (err) { 
      out.textContent = "Galat: " + err.message; 
    }
  };

  root.querySelector("#s-enc").onclick = () => run(encryptPipeline);
  root.querySelector("#s-dec").onclick = () => run(decryptPipeline);
  wireCopy(root, "s-copy", "s-out");
}

export const render = renderSuper;