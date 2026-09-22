import { encrypt, decrypt } from "./cipher.js";
import { renderSteps } from "../../shared/utils.js";

/**
 * Render Classic1 placeholder tab.
 * @param {HTMLElement} root - container
 * @returns {void}
 */
export function renderClassic1(root) {
  root.innerHTML = `
    <section class="panel"><h2>Menu 1 - Classic 1</h2>
    <p class="note">Owned by other member. Stub only.</p>
    <textarea id="c1-in" rows="3"></textarea>
    <div class="row"><button class="action" id="c1-go">Run</button></div></section>
    <section class="panel"><h3>Output</h3><div class="output" id="c1-out">-</div></section>
    <section class="panel"><h3>Step trace</h3><div class="trace" id="c1-trace"></div></section>
  `;
  root.querySelector("#c1-go").onclick = () => {
    const r = encrypt(root.querySelector("#c1-in").value, {});
    root.querySelector("#c1-out").textContent = r.result;
    renderSteps(root.querySelector("#c1-trace"), r.steps);
  };
}
