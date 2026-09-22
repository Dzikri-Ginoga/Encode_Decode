import { encrypt, decrypt } from "./cipher.js";
import { renderSteps } from "../../shared/utils.js";

/**
 * Render Modern1 LFSR tab.
 * @param {HTMLElement} root - container
 * @returns {void}
 */
export function renderModern1(root) {
  root.innerHTML = `
    <section class="panel">
      <h2>Menu 3 - LFSR Stream Cipher</h2>
      <p class="note">Key: binary seed (not all zeros) + taps as 0-based indexes from left. Example: seed 1011, taps 0,2.</p>
      <label>Input</label>
      <textarea id="m1-in" rows="3" placeholder="Plaintext for encrypt, cipher bits for decrypt"></textarea>
      <label>Seed (binary)</label>
      <input id="m1-seed" type="text" value="1011">
      <label>Taps (comma separated)</label>
      <input id="m1-taps" type="text" value="0,2">
      <div class="row">
        <button class="action" id="m1-enc">Encrypt</button>
        <button class="action" id="m1-dec">Decrypt</button>
      </div>
    </section>
    <section class="panel"><h3>Output</h3><div class="output" id="m1-out">-</div></section>
    <section class="panel"><h3>Step trace</h3><div class="trace" id="m1-trace"></div></section>
  `;
  const parseTaps = (s) => s.split(",").map((x) => x.trim()).filter((x) => x !== "").map(Number);
  const run = (fn) => {
    const out = root.querySelector("#m1-out");
    const trace = root.querySelector("#m1-trace");
    try {
      const r = fn(
        root.querySelector("#m1-in").value,
        { seed: root.querySelector("#m1-seed").value.trim(), taps: parseTaps(root.querySelector("#m1-taps").value) }
      );
      out.textContent = r.result === "" ? "(empty)" : r.result;
      renderSteps(trace, r.steps);
    } catch (err) {
      out.textContent = "Error: " + err.message;
      trace.innerHTML = "";
    }
  };
  root.querySelector("#m1-enc").onclick = () => run(encrypt);
  root.querySelector("#m1-dec").onclick = () => run(decrypt);
}
