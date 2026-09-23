import { decrypt, encrypt } from "./cipher.js";
import { renderSteps } from "../../shared/utils.js";
import { panel, field, textInput, textArea, btn, wireCopy, renderStepper } from "../../shared/components.js";

/**
 * Render Menu 1 placeholder.
 * @param {HTMLElement} root - container
 * @returns {void}
 */
export function renderClassic1(root) {
  let mode = "encrypt"; // "encrypt" | "decrypt"

  root.innerHTML =
    `<h1 class="display">Caesar Cipher.</h1>` +
    `<div class="tool-grid" style="margin-top:var(--space-section)">` +
    panel("Operasi & Kunci",
      "Pilih mode operasi dan tentukan pergeseran alfabet.",
      `<div class="flex gap-2 p-1 bg-[var(--surface-page)] border border-[var(--border-line)] rounded-[var(--radius-sm)] mb-4" role="tablist">
         <button type="button" id="c1-mode-enc" class="flex-1 py-2 px-3 text-sm font-semibold rounded-[var(--radius-sm)] flex items-center justify-center gap-2 transition-all bg-[var(--surface-card)] text-[var(--text-strong)] shadow-sm border border-[var(--border-line)]" role="tab" aria-selected="true">
           <i class="iconoir-lock"></i> Enkripsi
         </button>
         <button type="button" id="c1-mode-dec" class="flex-1 py-2 px-3 text-sm font-medium rounded-[var(--radius-sm)] flex items-center justify-center gap-2 transition-all text-[var(--text-muted)] hover:text-[var(--text-strong)] border border-transparent" role="tab" aria-selected="false">
           <i class="iconoir-unlock"></i> Dekripsi
         </button>
       </div>
       <label class="f-label">
         <span id="c1-in-label">Plaintext (Teks Asli)</span>
         <textarea id="c1-in" rows="3" placeholder="Ketik plaintext yang ingin dienkripsi..." class="f-area"></textarea>
       </label>
       <div class="grid sm:grid-cols-2 gap-4">
         ${field("Nilai Kunci (Shift)", textInput("c1-shift", "3"), "Angka pergeseran alfabet (misal: 3 untuk ROT3).")}
         <div class="f-label">
           <span>Pergeseran Alfabet</span>
           <div class="p-2.5 bg-[var(--surface-page)] border border-[var(--border-line)] rounded-[var(--radius-sm)] flex items-center gap-2 font-mono text-base font-bold text-[var(--action-accent)]">
             <span>A &rarr;</span>
             <span id="c1-preview-char">D</span>
           </div>
           <span class="f-hint">Hasil pergeseran huruf A dengan kunci saat ini.</span>
         </div>
       </div>
       <div class="btn-row">
         <button id="c1-run" class="btn-solid"><i class="iconoir-lock"></i><span>Jalankan Enkripsi</span></button>
         <button id="c1-swap" class="btn-plain" type="button" title="Gunakan hasil sebagai masukan"><i class="iconoir-refresh"></i>Gunakan Hasil</button>
       </div>`) +
    panel("Hasil",
      "",
      `<div class="output font-mono text-sm" id="c1-out"><span class="empty">Hasil muncul di sini.</span></div>
       <div class="btn-row">${btn("c1-copy", "copy", "Salin", false)}</div>`) +
    `</div>` +
    panel("Visualisasi Langkah",
      "",
      `<div id="c1-trace"><p class="empty">Jalankan dulu untuk melihat visualisasi langkah.</p></div>`);

  const btnEnc = root.querySelector("#c1-mode-enc");
  const btnDec = root.querySelector("#c1-mode-dec");
  const inLabel = root.querySelector("#c1-in-label");
  const inputEl = root.querySelector("#c1-in");
  const runBtn = root.querySelector("#c1-run");

  const setMode = (newMode) => {
    mode = newMode;
    const isEnc = mode === "encrypt";

    // Update style tombol mode
    btnEnc.className = isEnc
      ? "flex-1 py-2 px-3 text-sm font-semibold rounded-[var(--radius-sm)] flex items-center justify-center gap-2 transition-all bg-[var(--surface-card)] text-[var(--text-strong)] shadow-sm border border-[var(--border-line)]"
      : "flex-1 py-2 px-3 text-sm font-medium rounded-[var(--radius-sm)] flex items-center justify-center gap-2 transition-all text-[var(--text-muted)] hover:text-[var(--text-strong)] border border-transparent";
    btnEnc.setAttribute("aria-selected", String(isEnc));

    btnDec.className = !isEnc
      ? "flex-1 py-2 px-3 text-sm font-semibold rounded-[var(--radius-sm)] flex items-center justify-center gap-2 transition-all bg-[var(--surface-card)] text-[var(--text-strong)] shadow-sm border border-[var(--border-line)]"
      : "flex-1 py-2 px-3 text-sm font-medium rounded-[var(--radius-sm)] flex items-center justify-center gap-2 transition-all text-[var(--text-muted)] hover:text-[var(--text-strong)] border border-transparent";
    btnDec.setAttribute("aria-selected", String(!isEnc));

    // Update label, placeholder, dan tombol aksi
    inLabel.textContent = isEnc ? "Plaintext (Teks Asli)" : "Ciphertext (Teks Sandi)";
    inputEl.placeholder = isEnc
      ? "Ketik plaintext yang ingin dienkripsi..."
      : "Ketik ciphertext yang ingin didekripsi...";

    runBtn.querySelector("i").className = isEnc ? "iconoir-lock" : "iconoir-unlock";
    runBtn.querySelector("span").textContent = isEnc ? "Jalankan Enkripsi" : "Jalankan Dekripsi";
    updatePreview();
  };

  const updatePreview = () => {
    try {
      const shift = root.querySelector("#c1-shift").value;
      const fn = mode === "encrypt" ? encrypt : decrypt;
      root.querySelector("#c1-preview-char").textContent = fn("A", { shift }).result || "A";
    } catch {
      root.querySelector("#c1-preview-char").textContent = "?";
    }
  };

  btnEnc.onclick = () => setMode("encrypt");
  btnDec.onclick = () => setMode("decrypt");
  root.querySelector("#c1-shift").oninput = updatePreview;

  const run = () => {
    const out = root.querySelector("#c1-out");
    const trace = root.querySelector("#c1-trace");
    const fn = mode === "encrypt" ? encrypt : decrypt;

    try {
      const text = inputEl.value;
      const shift = root.querySelector("#c1-shift").value;
      const r = fn(text, { shift });
      out.textContent = r.result === "" ? "(kosong)" : r.result;
      renderStepper(trace, r.steps);
    } catch (err) {
      out.textContent = "Galat: " + err.message;
      trace.innerHTML = `<p class="empty">Perbaiki masukan, lalu jalankan lagi.</p>`;
    }
  };

  runBtn.onclick = run;

  // Tombol praktis: pakai hasil enkripsi/dekripsi sebagai teks masukan baru
  root.querySelector("#c1-swap").onclick = () => {
    const outText = root.querySelector("#c1-out").textContent;
    if (outText && outText !== "(kosong)" && !outText.startsWith("Galat:")) {
      inputEl.value = outText;
      setMode(mode === "encrypt" ? "decrypt" : "encrypt");
    }
  };

  wireCopy(root, "c1-copy", "c1-out");
  updatePreview();
}
