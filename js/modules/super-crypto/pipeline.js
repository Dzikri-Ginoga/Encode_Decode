/**
 * Super encryption pipeline. Chains classic1 -> classic2 -> modern1 -> modern2.
 * Imports cipher modules only, never DOM.
 * @module modules/super-crypto/pipeline
 */
import { encrypt as c1e, decrypt as c1d } from "../classic1/cipher.js";
import { encrypt as c2e, decrypt as c2d } from "../classic2/cipher.js";
import { encrypt as m1e, decrypt as m1d } from "../modern1/cipher.js";
import { encrypt as m2e, decrypt as m2d } from "../modern2/cipher.js";
import { textToBits, bitsToText } from "../../shared/utils.js";

/**
 * @typedef {object} SuperKey
 * @property {object} classic1 - key for menu 1
 * @property {object} classic2 - key for menu 2
 * @property {object} modern1 - LFSR key { seed, taps }
 * @property {object} modern2 - key for menu 4
 */

/**
 * Run full encrypt chain.
 * @param {string} input - plaintext
 * @param {SuperKey} keys - keys per stage
 * @returns {{ result: string, steps: Array<{title: string, detail: string}> }} final output and aggregated trace
 */
export function encryptPipeline(input, keys) {
  const steps = [];
  let cur = input;
  const stages = [
    ["Classic1", c1e, keys?.classic1],
    ["Classic2", c2e, keys?.classic2],
    ["Modern1 LFSR", m1e, keys?.modern1],
    ["Modern2", m2e, keys?.modern2]
  ];

  stages.forEach(([name, fn, k]) => {
    // Jembatan Konversi: LFSR (Modern1) menghasilkan deretan bit biner.
    // Sebelum masuk S-DES (Modern2), biner diubah ke teks agar tidak terjadi penggelembungan bit (8x expansion).
    if (name === "Modern2" && /^[01]+$/.test(cur) && cur.length % 8 === 0) {
      cur = bitsToText(cur);
    }

    const r = fn(cur, k || {});
    cur = r.result;
    steps.push({ title: `Stage ${name}`, detail: `output=${cur}` });

    if (Array.isArray(r.steps)) {
      r.steps.forEach((s) => steps.push({ title: `${name}: ${s.title}`, detail: s.detail }));
    }
  });

  return { result: cur, steps };
}

/**
 * Run full decrypt chain in reverse.
 * @param {string} input - cipher output
 * @param {SuperKey} keys - keys per stage
 * @returns {{ result: string, steps: Array<{title: string, detail: string}> }} plaintext and aggregated trace
 */
export function decryptPipeline(input, keys) {
  const steps = [];
  let cur = input;
  const stages = [
    ["Modern2", m2d, keys?.modern2],
    ["Modern1 LFSR", m1d, keys?.modern1],
    ["Classic2", c2d, keys?.classic2],
    ["Classic1", c1d, keys?.classic1]
  ];

  stages.forEach(([name, fn, k]) => {
    // Jembatan Konversi: Dekripsi S-DES (Modern2) menghasilkan teks biasa.
    // Sebelum masuk Dekripsi LFSR (Modern1), teks diubah kembali menjadi deretan biner.
    if (name === "Modern1 LFSR" && (!/^[01]+$/.test(cur) || cur.length % 8 !== 0)) {
      cur = textToBits(cur);
    }

    const r = fn(cur, k || {});
    cur = r.result;
    steps.push({ title: `Stage ${name}`, detail: `output=${cur}` });

    if (Array.isArray(r.steps)) {
      r.steps.forEach((s) => steps.push({ title: `${name}: ${s.title}`, detail: s.detail }));
    }
  });

  return { result: cur, steps };
}