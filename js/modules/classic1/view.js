import { encrypt } from "./cipher.js";
import { renderSteps } from "../../shared/utils.js";
import { panel, field, textArea, btn, placeholder } from "../../shared/components.js";

/**
 * Render Classic1 placeholder tab on the shared kit.
 * @param {HTMLElement} root - container
 * @returns {void}
 */
export function renderClassic1(root) {
  root.innerHTML =
    placeholder("Menu 1 - Classic 1", "Owned by other member.") +
    panel("Tool", "key", `
      ${field("Input", textArea("c1-in", "Plaintext"))}
      <div class="flex gap-2 mt-4">${btn("c1-go", "play", "Run")}</div>`) +
    panel("Output", "terminal", `<div class="output font-mono text-sm" id="c1-out">-</div>`) +
    panel("Step trace", "list", `<div class="trace" id="c1-trace"></div>`);
  root.querySelector("#c1-go").onclick = () => {
    const r = encrypt(root.querySelector("#c1-in").value, {});
    root.querySelector("#c1-out").textContent = r.result;
    renderSteps(root.querySelector("#c1-trace"), r.steps);
  };
}
