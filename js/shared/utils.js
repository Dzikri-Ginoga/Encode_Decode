/**
 * Shared bit, hex, and text helpers. Pure functions, no DOM.
 * @module shared/utils
 */

/**
 * Convert ASCII text to bit string (8 bits per char).
 * @param {string} text - input text
 * @returns {string} bit string of 0/1 chars
 */
export function textToBits(text) {
  return [...text].map((c) => c.charCodeAt(0).toString(2).padStart(8, "0")).join("");
}

/**
 * Convert bit string to ASCII text. Length must be multiple of 8.
 * @param {string} bits - bit string
 * @returns {string} decoded text
 */
export function bitsToText(bits) {
  if (bits.length === 0) return "";
  if (bits.length % 8 !== 0) throw new Error("Bit length must be multiple of 8.");
  let out = "";
  for (let i = 0; i < bits.length; i += 8) {
    out += String.fromCharCode(parseInt(bits.slice(i, i + 8), 2));
  }
  return out;
}

/**
 * XOR two equal-length bit strings.
 * @param {string} a - first bit string
 * @param {string} b - second bit string
 * @returns {string} XOR result
 */
export function xorBits(a, b) {
  if (a.length !== b.length) throw new Error("XOR inputs must have equal length.");
  let out = "";
  for (let i = 0; i < a.length; i++) {
    out += a[i] === b[i] ? "0" : "1";
  }
  return out;
}

/**
 * Validate binary string.
 * @param {string} s - candidate string
 * @returns {boolean} true if only 0/1 and non-empty
 */
export function isBinary(s) {
  return /^[01]+$/.test(s);
}

/**
 * Render step trace into a container.
 * @param {HTMLElement} el - trace container
 * @param {Array<{title: string, detail: string}>} steps - trace steps
 * @returns {void}
 */
export function renderSteps(el, steps) {
  el.innerHTML = "";
  steps.forEach((s) => {
    const div = document.createElement("div");
    div.className = "trace-item";
    const h = document.createElement("h4");
    h.textContent = s.title;
    const p = document.createElement("p");
    p.textContent = s.detail;
    div.append(h, p);
    el.append(div);
  });
}
