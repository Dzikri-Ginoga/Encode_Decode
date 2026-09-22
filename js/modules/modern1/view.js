import { encrypt, decrypt } from "./cipher.js";
import { isBinary } from "../../shared/utils.js";
import { panel, field, textInput, textArea, btn, bitGrid, wireCopy, renderStepper } from "../../shared/components.js";

/**
 * Render Modern1 LFSR tab on the shared kit.
 * @param {HTMLElement} root - container
 * @returns {void}
 */
export function renderModern1(root) {
  root.innerHTML =
    panel("Menu 3 - LFSR Stream Cipher", "lock", `
      <p class="text-sm text-slate-400">Fibonacci LFSR, shift-right, MSB feedback = XOR of taps (0-based from left). Example: seed <span class="font-mono text-accent">1011</span>, taps <span class="font-mono text-accent">0,2</span>.</p>
      ${field("Input", textArea("m1-in", "Plaintext for encrypt, cipher bits for decrypt"))}
      <div class="grid sm:grid-cols-2 gap-4">
        ${field("Seed (binary)", textInput("m1-seed", "1011"), "2-32 bits, not all zeros.")}
        ${field("Taps (comma separated)", textInput("m1-taps", "0,2"), "0-based from left.")}
      </div>
      <div id="m1-grid"></div>
      <div class="flex flex-wrap gap-2 mt-4">
        ${btn("m1-enc", "lock", "Encrypt")}
        ${btn("m1-dec", "unlock", "Decrypt", false)}
      </div>`) +
    panel("Output", "terminal", `
      <div class="output font-mono text-sm text-accent" id="m1-out">-</div>
      <div class="mt-2">${btn("m1-copy", "copy", "Copy", false)}</div>`) +
    panel("Step trace", "list", `<div id="m1-trace"></div>`) +
    panel("About this cipher", "book", `
      <p class="text-sm text-slate-400">Each plaintext char becomes 8 bits. The LFSR emits one keystream bit per step from its rightmost cell, then shifts right and feeds back the XOR of tap cells into the left. Cipher bit = plain XOR key. Decryption repeats the same stream, so the same seed and taps recover the text.</p>`);

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
      out.textContent = r.result === "" ? "(empty)" : r.result;
      renderStepper(trace, r.steps);
    } catch (err) {
      out.textContent = "Error: " + err.message;
      trace.innerHTML = "";
    }
  };
  root.querySelector("#m1-enc").onclick = () => run(encrypt);
  root.querySelector("#m1-dec").onclick = () => run(decrypt);
  wireCopy(root, "m1-copy", "m1-out");
}
