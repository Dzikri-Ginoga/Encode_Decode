import { encryptPipeline, decryptPipeline } from "./pipeline.js";
import { renderSteps } from "../../shared/utils.js";

/**
 * Render Super Encryption tab.
 * @param {HTMLElement} root - container
 * @returns {void}
 */
export function renderSuper(root) {
  root.innerHTML = `
    <section class="panel"><h2>Menu 5 - Super Encryption</h2>
    <p class="note">Chains Classic1 -&gt; Classic2 -&gt; LFSR -&gt; Modern2. Only LFSR stage is live.</p>
    <label>Input</label><textarea id="s-in" rows="3"></textarea>
    <label>LFSR seed</label><input id="s-seed" type="text" value="1011">
    <label>LFSR taps</label><input id="s-taps" type="text" value="0,2">
    <div class="row"><button class="action" id="s-enc">Encrypt chain</button>
    <button class="action" id="s-dec">Decrypt chain</button></div></section>
    <section class="panel"><h3>Output</h3><div class="output" id="s-out">-</div></section>
    <section class="panel"><h3>Aggregated trace</h3><div class="trace" id="s-trace"></div></section>
  `;
  const keys = () => ({
    classic1: {}, classic2: {}, modern2: {},
    modern1: {
      seed: root.querySelector("#s-seed").value.trim(),
      taps: root.querySelector("#s-taps").value.split(",").map((x) => x.trim()).filter(Boolean).map(Number)
    }
  });
  const run = (fn) => {
    try {
      const r = fn(root.querySelector("#s-in").value, keys());
      root.querySelector("#s-out").textContent = r.result === "" ? "(empty)" : r.result;
      renderSteps(root.querySelector("#s-trace"), r.steps);
    } catch (err) {
      root.querySelector("#s-out").textContent = "Error: " + err.message;
    }
  };
  root.querySelector("#s-enc").onclick = () => run(encryptPipeline);
  root.querySelector("#s-dec").onclick = () => run(decryptPipeline);
}
