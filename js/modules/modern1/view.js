import { encrypt, decrypt } from "./cipher.js";
import { isBinary } from "../../shared/utils.js";
import { panel, field, textInput, textArea, btn, bitGrid, wireCopy, renderStepper } from "../../shared/components.js";

/**
 * Render Menu 3 LFSR tab on the shared kit.
 * @param {HTMLElement} root - container
 * @returns {void}
 */
export function renderModern1(root) {
  root.innerHTML =
    panel("01", "Menu 3 - Aliran LFSR", "lock", `
      <p class="lead">LFSR Fibonacci, geser ke kanan, umpan balik dari XOR seluruh tap (indeks 0 dari kiri). Contoh: seed <span class="font-mono">1011</span>, tap <span class="font-mono">0,2</span>.</p>
      ${field("Masukan", textArea("m1-in", "Teks biasa untuk enkripsi, deretan bit untuk dekripsi"))}
      <div class="grid sm:grid-cols-2 gap-4">
        ${field("Seed (biner)", textInput("m1-seed", "1011"), "Panjang 2-32 bit, tidak boleh nol semua.")}
        ${field("Tap (pisahkan koma)", textInput("m1-taps", "0,2"), "Indeks 0 dari kiri.")}
      </div>
      <div id="m1-grid"></div>
      <div class="btn-row">
        ${btn("m1-enc", "lock", "Enkripsi")}
        ${btn("m1-dec", "unlock", "Dekripsi", false)}
      </div>`) +
    panel("02", "Keluaran", "terminal", `
      <div class="output font-mono text-sm" id="m1-out">-</div>
      <div class="btn-row">${btn("m1-copy", "copy", "Salin", false)}</div>`) +
    panel("03", "Jejak langkah", "list", `<div id="m1-trace"></div>`) +
    panel("04", "Tentang sandi ini", "book", `
      <p class="lead">Setiap karakter diubah menjadi 8 bit. LFSR mengeluarkan satu bit keystream dari sel paling kanan, lalu bergeser dan mengisi sel kiri dengan XOR dari sel-sel tap. Bit sandi = bit biasa XOR keystream. Dekripsi mengulang aliran yang sama, jadi seed dan tap yang sama mengembalikan teks asal.</p>`);

  const parseTaps = (s) => s.split(",").map((x) => x.trim()).filter((x) => x !== "").map(Number);
  const paintGrid = () => {
    const seed = root.querySelector("#m1-seed").value.trim();
    const taps = parseTaps(root.querySelector("#m1-taps").value);
    root.querySelector("#m1-grid").innerHTML =
      isBinary(seed) ? bitGrid(seed, taps.filter((t) => Number.isInteger(t) && t >= 0 && t < seed.length)) : "";
  };
  root.querySelector("#m1-seed").oninput = paintGrid;
  root.querySelector("#m1-taps").oninput = paintGrid;
  paintGrid();

  const run = (fn) => {
    const out = root.querySelector("#m1-out");
    const trace = root.querySelector("#m1-trace");
    try {
      const r = fn(root.querySelector("#m1-in").value, {
        seed: root.querySelector("#m1-seed").value.trim(),
        taps: parseTaps(root.querySelector("#m1-taps").value)
      });
      out.textContent = r.result === "" ? "(kosong)" : r.result;
      renderStepper(trace, r.steps);
    } catch (err) {
      out.textContent = "Galat: " + err.message;
      trace.innerHTML = "";
    }
  };
  root.querySelector("#m1-enc").onclick = () => run(encrypt);
  root.querySelector("#m1-dec").onclick = () => run(decrypt);
  wireCopy(root, "m1-copy", "m1-out");
}
