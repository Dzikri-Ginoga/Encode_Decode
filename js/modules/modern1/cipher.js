/**
 * Modern1 LFSR stream cipher. Pure math, no DOM.
 * Fibonacci LFSR, shift-right, MSB feedback = XOR of tap positions.
 * Tap indexes are 0-based from the left (MSB = index 0).
 * @module modules/modern1/cipher
 */
import { textToBits, bitsToText, xorBits, isBinary } from "../../shared/utils.js";

/**
 * @typedef {object} LfsrKey
 * @property {string} seed - binary string, e.g. "1011"
 * @property {number[]} taps - tap indexes, 0-based from left
 */

/**
 * Validate LFSR key.
 * @param {LfsrKey} key - LFSR key
 * @returns {{ n: number, seedArr: number[], taps: number[] }} normalized key
 */
function validateKey(key) {
  const seed = key?.seed ?? "";
  const taps = key?.taps ?? [];
  if (!isBinary(seed)) throw new Error("Seed harus deretan biner yang tidak kosong.");
  if (/^0+$/.test(seed)) throw new Error("Seed tidak boleh nol semua.");
  if (seed.length < 2 || seed.length > 32) throw new Error("Panjang seed harus 2-32 bit.");
  if (!Array.isArray(taps) || taps.length === 0) throw new Error("Tap harus array yang tidak kosong.");
  const n = seed.length;
  const norm = [...new Set(taps)].map((t) => Number(t)).sort((a, b) => a - b);
  if (norm.some((t) => !Number.isInteger(t) || t < 0 || t >= n)) {
    throw new Error(`Setiap tap harus bilangan bulat 0-${n - 1}.`);
  }
  return { n, seedArr: [...seed].map(Number), taps: norm };
}

/**
 * Generate keystream bits with Fibonacci LFSR.
 * Output bit is the rightmost state bit per step.
 * @param {number[]} seedArr - initial state
 * @param {number[]} taps - tap positions
 * @param {number} count - bits to generate
 * @returns {{ stream: string, states: string[] }} keystream and state log
 */
function keystream(seedArr, taps, count) {
  let state = [...seedArr];
  let out = "";
  const states = [];
  for (let i = 0; i < count; i++) {
    states.push(state.join(""));
    out += String(state[state.length - 1]);
    const fb = taps.reduce((acc, t) => acc ^ state[t], 0);
    state = [fb, ...state.slice(0, state.length - 1)];
  }
  return { stream: out, states };
}

/**
 * Encrypt text to bit string via LFSR XOR.
 * @param {string} input - plaintext
 * @param {LfsrKey} key - LFSR key
 * @returns {{ result: string, steps: Array<{title: string, detail: string}> }} cipher bits and trace
 */
export function encrypt(input, key) {
  const { n, seedArr, taps } = validateKey(key);
  const steps = [
    { title: "Inisialisasi", detail: `seed=${seedArr.join("")} tap=[${taps.join(",")}] lebar=${n}` },
    { title: "Teks ke bit", detail: input === "" ? "(masukan kosong)" : textToBits(input) }
  ];
  if (input === "") return { result: "", steps };
  const plainBits = textToBits(input);
  const { stream, states } = keystream(seedArr, taps, plainBits.length);
  steps.push({ title: "Keystream", detail: stream });
  for (let i = 0; i < input.length; i++) {
    const pb = plainBits.slice(i * 8, i * 8 + 8);
    const kb = stream.slice(i * 8, i * 8 + 8);
    const cb = xorBits(pb, kb);
    steps.push({
      title: `Karakter ${i + 1} '${input[i]}'`,
      detail: `plain=${pb} key=${kb} cipher=${cb} lfsr=${states[i * 8]}`
    });
  }
  const result = xorBits(plainBits, stream);
  steps.push({ title: "Hasil", detail: result });
  return { result, steps };
}

/**
 * Decrypt bit string to text via LFSR XOR.
 * @param {string} input - cipher bits (multiple of 8)
 * @param {LfsrKey} key - LFSR key
 * @returns {{ result: string, steps: Array<{title: string, detail: string}> }} plaintext and trace
 */
export function decrypt(input, key) {
  const { n, seedArr, taps } = validateKey(key);
  const steps = [
    { title: "Inisialisasi", detail: `seed=${seedArr.join("")} tap=[${taps.join(",")}] lebar=${n}` }
  ];
  if (input === "") return { result: "", steps };
  if (!isBinary(input)) throw new Error("Masukan sandi harus deretan biner.");
  if (input.length % 8 !== 0) throw new Error("Panjang bit sandi harus kelipatan 8.");
  const { stream } = keystream(seedArr, taps, input.length);
  steps.push({ title: "Keystream", detail: stream });
  const plainBits = xorBits(input, stream);
  steps.push({ title: "XOR", detail: `cipher=${input} key=${stream} plain=${plainBits}` });
  const result = bitsToText(plainBits);
  steps.push({ title: "Bit ke teks", detail: result === "" ? "(kosong)" : result });
  return { result, steps };
}
