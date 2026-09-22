import { encryptPipeline, decryptPipeline } from "./pipeline.js";
import { panel, field, textInput, textArea, btn, wireCopy, renderStepper } from "../../shared/components.js";

/**
 * Render Super Encryption tab on the shared kit.
 * @param {HTMLElement} root - container
 * @returns {void}
 */
export function renderSuper(root) {
  root.innerHTML =
    panel("Menu 5 - Super Encryption", "layers", `
      <p class="text-sm text-slate-400">Chains Classic1 -&gt; Classic2 -&gt; LFSR -&gt; Modern2. Only the LFSR stage is live.</p>
      ${field("Input", textArea("s-in", "Plaintext for chain encrypt"))}
      <div class="grid sm:grid-cols-2 gap-4">
        ${field("LFSR seed", textInput("s-seed", "1011"))}
        ${field("LFSR taps", textInput("s-taps", "0,2"))}
      </div>
      <div class="flex flex-wrap gap-2 mt-4">
        ${btn("s-enc", "layers", "Encrypt chain")}
        ${btn("s-dec", "refresh", "Decrypt chain", false)}
      </div>`) +
    panel("Output", "terminal", `
      <div class="output font-mono text-sm text-accent" id="s-out">-</div>
      <div class="mt-2">${btn("s-copy", "copy", "Copy", false)}</div>`) +
    panel("Aggregated trace", "list", `<div id="s-trace"></div>`);

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
      out.textContent = r.result === "" ? "(empty)" : r.result;
      renderStepper(root.querySelector("#s-trace"), r.steps);
    } catch (err) { out.textContent = "Error: " + err.message; }
  };
  root.querySelector("#s-enc").onclick = () => run(encryptPipeline);
  root.querySelector("#s-dec").onclick = () => run(decryptPipeline);
  wireCopy(root, "s-copy", "s-out");
}
