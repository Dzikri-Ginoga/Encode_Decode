/**
 * Modern2 S-DES (Simplified Data Encryption Standard) block cipher. Pure math, no DOM.
 * Block size: 8-bit. Key size: 10-bit. 2 Feistel rounds.
 * @module modules/modern2/cipher
 */
import { textToBits, bitsToText, xorBits, isBinary } from "../../shared/utils.js";

// Matriks Permutasi & S-Box S-DES
const P10 = [3, 5, 2, 7, 4, 10, 1, 9, 8, 6];
const P8 = [6, 3, 7, 4, 8, 5, 10, 9];
const IP = [2, 6, 3, 1, 4, 8, 5, 7];
const IP_INV = [4, 1, 3, 5, 7, 2, 8, 6];
const EP = [4, 1, 2, 3, 2, 3, 4, 1];
const P4 = [2, 4, 3, 1];

const S0 = [
  [1, 0, 3, 2],
  [3, 2, 1, 0],
  [0, 2, 1, 3],
  [3, 1, 3, 2]
];

const S1 = [
  [0, 1, 2, 3],
  [2, 0, 1, 3],
  [3, 0, 1, 0],
  [2, 1, 0, 3]
];

/**
 * Lakukan permutasi string biner berdasarkan tabel indeks (1-based).
 */
function permute(bits, table) {
  return table.map((pos) => bits[pos - 1]).join("");
}

/**
 * Circular left shift sejumlah n posisi.
 */
function leftShift(bits, n) {
  return bits.slice(n) + bits.slice(0, n);
}

/**
 * Pembangkitan subkunci K1 dan K2 dari kunci 10-bit.
 */
export function generateSubkeys(key10) {
  if (!isBinary(key10) || key10.length !== 10) {
    throw new Error("Kunci S-DES harus tepat 10 bit biner (contoh: 1010000010).");
  }

  const p10 = permute(key10, P10);
  let l = p10.slice(0, 5);
  let r = p10.slice(5, 10);

  // Round 1 Subkey: LS-1
  l = leftShift(l, 1);
  r = leftShift(r, 1);
  const k1 = permute(l + r, P8);

  // Round 2 Subkey: LS-2 (dari status setelah LS-1)
  l = leftShift(l, 2);
  r = leftShift(r, 2);
  const k2 = permute(l + r, P8);

  return { k1, k2, p10 };
}

/**
 * Fungsi Feistel fK(L, R, K).
 */
function feistel(bits8, subkey) {
  const l = bits8.slice(0, 4);
  const r = bits8.slice(4, 8);

  // Ekspansi Permutasi (4 bit -> 8 bit)
  const ep = permute(r, EP);
  const xored = xorBits(ep, subkey);

  const left4 = xored.slice(0, 4);
  const right4 = xored.slice(4, 8);

  // S-Box S0
  const row0 = parseInt(`${left4[0]}${left4[3]}`, 2);
  const col0 = parseInt(`${left4[1]}${left4[2]}`, 2);
  const val0 = S0[row0][col0].toString(2).padStart(2, "0");

  // S-Box S1
  const row1 = parseInt(`${right4[0]}${right4[3]}`, 2);
  const col1 = parseInt(`${right4[1]}${right4[2]}`, 2);
  const val1 = S1[row1][col1].toString(2).padStart(2, "0");

  // P4
  const p4 = permute(val0 + val1, P4);

  // XOR dengan 4 bit kiri (L)
  const leftXor = xorBits(l, p4);

  return leftXor + r;
}

/**
 * Proses 1 blok 8-bit untuk enkripsi atau dekripsi.
 */
function processBlock8(block8, subkeyA, subkeyB) {
  // 1. Initial Permutation
  const ip = permute(block8, IP);

  // 2. Round 1
  const r1 = feistel(ip, subkeyA);

  // 3. Switch (Tukar L dan R)
  const sw = r1.slice(4, 8) + r1.slice(0, 4);

  // 4. Round 2
  const r2 = feistel(sw, subkeyB);

  // 5. Inverse Initial Permutation
  const out = permute(r2, IP_INV);

  return { ip, r1, sw, r2, out };
}

/**
 * Enkripsi teks menjadi string biner dengan S-DES.
 * @param {string} input - Teks biasa
 * @param {{ key: string }} config - Kunci 10-bit
 */
export function encrypt(input, config) {
  const rawKey = config?.key?.trim() ?? "";
  const { k1, k2, p10 } = generateSubkeys(rawKey);

  const steps = [
    { title: "Pembangkitan Kunci", detail: `Kunci=${rawKey} | P10=${p10} | K1=${k1} | K2=${k2}` },
    { title: "Teks ke Bit", detail: input === "" ? "(masukan kosong)" : textToBits(input) }
  ];

  if (input === "") return { result: "", steps };

  const plainBits = textToBits(input);
  let cipherBits = "";

  for (let i = 0; i < input.length; i++) {
    const block = plainBits.slice(i * 8, i * 8 + 8);
    const trace = processBlock8(block, k1, k2);
    cipherBits += trace.out;

    steps.push({
      title: `Blok ${i + 1} '${input[i]}'`,
      detail: `Input=${block} -> IP=${trace.ip} -> R1=${trace.r1} -> Switch=${trace.sw} -> R2=${trace.r2} -> Output=${trace.out}`
    });
  }

  steps.push({ title: "Hasil Akhir (Cipherteks)", detail: cipherBits });
  return { result: cipherBits, steps };
}

/**
 * Dekripsi string biner menjadi teks dengan S-DES.
 * @param {string} input - Deretan biner sandi (kelipatan 8)
 * @param {{ key: string }} config - Kunci 10-bit
 */
export function decrypt(input, config) {
  const rawKey = config?.key?.trim() ?? "";
  const { k1, k2, p10 } = generateSubkeys(rawKey);

  const steps = [
    { title: "Pembangkitan Kunci", detail: `Kunci=${rawKey} | K1=${k1} | K2=${k2} (Urutan dekripsi: K2 lalu K1)` }
  ];

  if (input === "") return { result: "", steps };
  if (!isBinary(input)) throw new Error("Masukan sandi harus deretan biner.");
  if (input.length % 8 !== 0) throw new Error("Panjang bit sandi harus kelipatan 8.");

  let plainBits = "";
  const totalBlocks = input.length / 8;

  for (let i = 0; i < totalBlocks; i++) {
    const block = input.slice(i * 8, i * 8 + 8);
    // Dekripsi memakai urutan subkunci terbalik: k2 lalu k1
    const trace = processBlock8(block, k2, k1);
    plainBits += trace.out;

    steps.push({
      title: `Dekripsi Blok ${i + 1}`,
      detail: `Cipher=${block} -> IP=${trace.ip} -> R1(K2)=${trace.r1} -> Switch=${trace.sw} -> R2(K1)=${trace.r2} -> Plain=${trace.out}`
    });
  }

  const result = bitsToText(plainBits);
  steps.push({ title: "Bit ke Teks", detail: result === "" ? "(kosong)" : result });
  return { result, steps };
}