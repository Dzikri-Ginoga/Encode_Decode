import { encrypt } from "./cipher.js";
import { renderSteps } from "../../shared/utils.js";
import { panel, field, textArea, btn, placeholder } from "../../shared/components.js";

/**
 * Render Classic2 placeholder tab on the shared kit.
 * @param {HTMLElement} root - container
 * @returns {void}
 */
export function renderClassic2(root) {
  root.innerHTML =
    placeholder("Menu 2 - Classic 2", "Owned by other member.") +
    panel("Tool", "key", `
      ${field("Input", textArea("c2-in", "Plaintext"))}
      <div class="flex gap-2 mt-4">${btn("c2-go", "play", "Run")}</div>`) +
    panel("Output", "terminal", `<div class="output font-mono text-sm" id="c2-out">-</div>`) +
    panel("Step trace", "list", `<div class="trace" id="c2-trace"></div>`);
  root.querySelector("#c2-go").onclick = () => {
    const r = encrypt(root.querySelector("#c2-in").value, {});
    root.querySelector("#c2-out").textContent = r.result;
    renderSteps(root.querySelector("#c2-trace"), r.steps);
  };
}
