import { decrypt, encrypt } from "./cipher.js";
import { panel, field, textInput, textArea, btn, wireCopy, renderStepper } from "../../shared/components.js";

/**
 * Render Menu 2: Vigenere Cipher.
 * @param {HTMLElement} root - container
 * @returns {void}
 */
export function renderClassic2(root) {
  let mode = "encrypt"; // "encrypt" | "decrypt"

  root.innerHTML =
    `<h1 class="display">Vigenère Cipher.</h1>` +
    `<div class="tool-grid" style="margin-top:var(--space-section)">` +
    panel("Operasi & Kunci",
      "Pilih mode operasi dan tentukan kata kunci polialfabetik.",
      `<div class="flex gap-2 p-1 bg-[var(--surface-page)] border border-[var(--border-line)] rounded-[var(--radius-sm)] mb-4" role="tablist">
         <button type="button" id="c2-mode-enc" class="flex-1 py-2 px-3 text-sm font-semibold rounded-[var(--radius-sm)] flex items-center justify-center gap-2 transition-all bg-[var(--surface-card)] text-[var(--text-strong)] shadow-sm border border-[var(--border-line)]" role="tab" aria-selected="true">
           <i class="iconoir-lock"></i> Enkripsi
         </button>
         <button type="button" id="c2-mode-dec" class="flex-1 py-2 px-3 text-sm font-medium rounded-[var(--radius-sm)] flex items-center justify-center gap-2 transition-all text-[var(--text-muted)] hover:text-[var(--text-strong)] border border-transparent" role="tab" aria-selected="false">
           <i class="iconoir-unlock"></i> Dekripsi
         </button>
       </div>
       <label class="f-label">
         <span id="c2-in-label">Plaintext (Teks Asli)</span>
         <textarea id="c2-in" rows="3" placeholder="Ketik plaintext yang ingin dienkripsi..." class="f-area"></textarea>
       </label>
       <div class="grid sm:grid-cols-2 gap-4">
         ${field("Kata Kunci", textInput("c2-key", "KUNCI"), "Huruf alfabet A-Z (huruf besar/kecil otomatis disesuaikan).")}
         <div class="f-label">
           <span>Info Kata Kunci</span>
           <div class="p-2.5 bg-[var(--surface-page)] border border-[var(--border-line)] rounded-[var(--radius-sm)] flex items-center justify-between font-mono text-sm">
             <span id="c2-key-preview" class="font-bold text-[var(--action-accent)]">KUNCI</span>
             <span id="c2-key-len" class="text-xs text-[var(--text-muted)]">5 huruf</span>
           </div>
           <span class="f-hint">Kata kunci yang aktif digunakan.</span>
         </div>
       </div>
       <div class="btn-row">
         <button id="c2-run" class="btn-solid"><i class="iconoir-lock"></i><span>Jalankan Enkripsi</span></button>
         <button id="c2-swap" class="btn-plain" type="button" title="Gunakan hasil sebagai masukan"><i class="iconoir-refresh"></i>Gunakan Hasil</button>
       </div>`) +
    panel("Hasil",
      "",
      `<div class="output font-mono text-sm" id="c2-out"><span class="empty">Hasil muncul di sini.</span></div>
       <div class="btn-row">${btn("c2-copy", "copy", "Salin", false)}</div>`) +
    `</div>` +
    panel("Visualisasi Langkah",
      "",
      `<div id="c2-trace"><p class="empty">Jalankan dulu untuk melihat visualisasi langkah.</p></div>`);

  const btnEnc = root.querySelector("#c2-mode-enc");
  const btnDec = root.querySelector("#c2-mode-dec");
  const inLabel = root.querySelector("#c2-in-label");
  const inputEl = root.querySelector("#c2-in");
  const keyInput = root.querySelector("#c2-key");
  const runBtn = root.querySelector("#c2-run");
  const keyPreview = root.querySelector("#c2-key-preview");
  const keyLen = root.querySelector("#c2-key-len");

  // Pembaruan pratinjau kata kunci saat diketik
  const updateKeyInfo = () => {
    const clean = keyInput.value.replace(/[^a-zA-Z]/g, "").toUpperCase();
    if (clean.length > 0) {
      keyPreview.textContent = clean;
      keyLen.textContent = `${clean.length} huruf`;
    } else {
      keyPreview.textContent = "(tidak valid)";
      keyLen.textContent = "0 huruf";
    }
  };

  const setMode = (newMode) => {
    mode = newMode;
    const isEnc = mode === "encrypt";

    btnEnc.className = isEnc
      ? "flex-1 py-2 px-3 text-sm font-semibold rounded-[var(--radius-sm)] flex items-center justify-center gap-2 transition-all bg-[var(--surface-card)] text-[var(--text-strong)] shadow-sm border border-[var(--border-line)]"
      : "flex-1 py-2 px-3 text-sm font-medium rounded-[var(--radius-sm)] flex items-center justify-center gap-2 transition-all text-[var(--text-muted)] hover:text-[var(--text-strong)] border border-transparent";
    btnEnc.setAttribute("aria-selected", String(isEnc));

    btnDec.className = !isEnc
      ? "flex-1 py-2 px-3 text-sm font-semibold rounded-[var(--radius-sm)] flex items-center justify-center gap-2 transition-all bg-[var(--surface-card)] text-[var(--text-strong)] shadow-sm border border-[var(--border-line)]"
      : "flex-1 py-2 px-3 text-sm font-medium rounded-[var(--radius-sm)] flex items-center justify-center gap-2 transition-all text-[var(--text-muted)] hover:text-[var(--text-strong)] border border-transparent";
    btnDec.setAttribute("aria-selected", String(!isEnc));

    inLabel.textContent = isEnc ? "Plaintext (Teks Asli)" : "Ciphertext (Teks Sandi)";
    inputEl.placeholder = isEnc
      ? "Ketik plaintext yang ingin dienkripsi..."
      : "Ketik ciphertext yang ingin didekripsi...";

    runBtn.querySelector("i").className = isEnc ? "iconoir-lock" : "iconoir-unlock";
    runBtn.querySelector("span").textContent = isEnc ? "Jalankan Enkripsi" : "Jalankan Dekripsi";
  };

  btnEnc.onclick = () => setMode("encrypt");
  btnDec.onclick = () => setMode("decrypt");
  keyInput.oninput = updateKeyInfo;

  const run = () => {
    const out = root.querySelector("#c2-out");
    const trace = root.querySelector("#c2-trace");
    const fn = mode === "encrypt" ? encrypt : decrypt;

    try {
      const text = inputEl.value;
      const keyword = keyInput.value;
      const r = fn(text, { keyword });
      out.textContent = r.result === "" ? "(kosong)" : r.result;
      renderStepper(trace, r.steps);
    } catch (err) {
      out.textContent = "Galat: " + err.message;
      trace.innerHTML = `<p class="empty">Perbaiki masukan, lalu jalankan lagi.</p>`;
    }
  };

  runBtn.onclick = run;

  // Tombol tukar hasil menjadi masukan baru
  root.querySelector("#c2-swap").onclick = () => {
    const outText = root.querySelector("#c2-out").textContent;
    if (outText && outText !== "(kosong)" && !outText.startsWith("Galat:")) {
      inputEl.value = outText;
      setMode(mode === "encrypt" ? "decrypt" : "encrypt");
    }
  };

  wireCopy(root, "c2-copy", "c2-out");
  updateKeyInfo();
}
