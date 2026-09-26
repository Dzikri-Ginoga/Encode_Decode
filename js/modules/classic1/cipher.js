/**
 * Classic1 Caesar cipher. Pure math, no DOM.
 * @module modules/classic1/cipher
 */

/**
 * Validasi dan normalisasi shift Caesar.
 * @param {object} key - { shift: number|string }
 * @returns {number} shift yang valid (0-25)
 */

function normalisasiShift(key){
  const s = Number(key?.shift ?? 3);
  if(isNaN(s)) throw new Error("Kunci harus berupa angka. ");
  const validasiShift = ((s % 26) + 26 ) % 26;
  return validasiShift;
}

/**
 * Algoritma Enkripsi Caesar Cipher
 * @param {string} input - input plain text
 * @param {object} key - kunci untuk enkripsi
 * @returns {{result: string, steps: Array<{title: string, detail: string}}}
 */

export function encrypt(input, key){
  const shift = normalisasiShift(key);

  const steps = [
    { title: "Inisialisasi Enkripsi", detail: `Kunci pergeseran: ${shift}`}
  ];

  if(!input) return { result: "", steps };

  let result = "";
  for (let i = 0; i < input.length; i++){
    const ch = input[i];
    const code = ch.charCodeAt(0);

    // Pengecekan huruf KAPITAL (A-Z)
    if (code >= 65 && code <= 90){
      const p_i = code - 65;
      const c_i = (p_i + shift) % 26;
      const resChar = String.fromCharCode(c_i + 65);
      result += resChar;

      steps.push({
        title: `Karakter ${i + 1} '${ch}'`,
        detail: `(${p_i} + ${shift}) mod 26 = ${c_i} -> '${resChar}'`
      });     
    }

    // Pengecekan huruf KECIL (a-z)
    else if(code >= 97 && code <= 122){
      const p_i = code - 97;
      const c_i = (p_i + shift) % 26;
      const resChar = String.fromCharCode(c_i + 97);
      result += resChar;

      steps.push({
        title: `Karakter ${i + 1} '${ch}'`,
        detail: `(${p_i} + ${shift}) mod 26 = ${c_i} -> '${resChar}'`
      });
    }
    // Karakter selain huruf seperti spasi, tanda baca dan angka
    else {
      result += ch;
      steps.push({
        title: `Karakter ${i + 1} '${ch}'`,
        detail: `Karakter bukan huruf alphabet`
      });
    }
  }

  steps.push({title: "Hasil Enkripsi", detail: result});
  return {result, steps};
}


/**
 * Algoritma Dekripsi Caesar Cipher
 * @param {string} input - ciphertext
 * @param {object} key - cipher key
 * @returns {{ result: string, steps: Array<{title: string, detail: string}> }} plaintext and trace
 */
export function decrypt(input, key) {
  const shift = normalisasiShift(key);

  const steps = [
    { title: "Inisialisasi Dekripsi", detail: `Kunci pergeseran: ${shift}`}
  ];

  if(!input) return {result: "", steps};

  let result = "";
  for (let i = 0; i < input.length; i++) {
    const ch = input[i];
    const code = ch.charCodeAt(0);

    if (code >= 65 && code <= 90){
      const p_i = code - 65;
      const c_i = ((p_i - shift) % 26 + 26) % 26;
      const resChar = String.fromCharCode(c_i + 65);
      result += resChar;

      steps.push({
        title: `Karakter ${i + 1} '${ch}'`,
        detail: `(${p_i} - ${shift}) mod 26 = ${c_i} -> '${resChar}'`
      });     
    }

    else if(code >= 97 && code <= 122){
      const p_i = code - 97;
      const c_i = ((p_i - shift) % 26 + 26) % 26;
      const resChar = String.fromCharCode(c_i + 97);
      result += resChar;

      steps.push({
        title: `Karakter ${i + 1} '${ch}'`,
        detail: `(${p_i} - ${shift}) mod 26 = ${c_i} -> '${resChar}'`
      });
    }

    else {
      result += ch;
      steps.push({
        title: `Karakter ${i + 1} '${ch}'`,
        detail: `Karakter bukan huruf alphabet`
      });
    }
  }

  steps.push({ title: "Hasil Dekripsi", detail: result });
  return { result, steps };
  
}
