import { encrypt } from "./cipher.js";
import { renderSteps } from "../../shared/utils.js";
import { panel, field, textArea, btn, placeholder } from "../../shared/components.js";

/**
 * Render Modern2 placeholder tab on the shared kit.
 * @param {HTMLElement} root - container
 * @returns {void}
 */
export function renderModern2(root) {
  root.innerHTML =
    placeholder("Menu 4 - Modern 2", "Owned by other member.") +
    panel("Tool", "cpu", `
      ${field("Input", textArea("m2-in", "Plaintext"))}
      <div class="flex gap-2 mt-4">${btn("m2-go", "play", "Run")}</div>`) +
    panel("Output", "terminal", `<div class="output font-mono text-sm" id="m2-out">-</div>`) +
    panel("Step trace", "list", `<div class="trace" id="m2-trace"></div>`);
  root.querySelector("#m2-go").onclick = () => {
    const r = encrypt(root.querySelector("#m2-in").value, {});
    root.querySelector("#m2-out").textContent = r.result;
    renderSteps(root.querySelector("#m2-trace"), r.steps);
  };
}
