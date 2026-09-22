import { encrypt } from "./cipher.js";
import { renderSteps } from "../../shared/utils.js";

/**
 * Render Modern2 placeholder tab.
 * @param {HTMLElement} root - container
 * @returns {void}
 */
export function renderModern2(root) {
  root.innerHTML = `
    <section class="panel"><h2>Menu 4 - Modern 2</h2>
    <p class="note">Owned by other member. Stub only.</p>
    <textarea id="m2-in" rows="3"></textarea>
    <div class="row"><button class="action" id="m2-go">Run</button></div></section>
    <section class="panel"><h3>Output</h3><div class="output" id="m2-out">-</div></section>
    <section class="panel"><h3>Step trace</h3><div class="trace" id="m2-trace"></div></section>
  `;
  root.querySelector("#m2-go").onclick = () => {
    const r = encrypt(root.querySelector("#m2-in").value, {});
    root.querySelector("#m2-out").textContent = r.result;
    renderSteps(root.querySelector("#m2-trace"), r.steps);
  };
}
