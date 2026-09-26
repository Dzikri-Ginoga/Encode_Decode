/**
 * Classic2 Vigenere cipher. Pure math, no DOM.
 * @module modules/classic2/cipher
 */

/**
 * Validasi dan normalisasi kata kunci Vignere
 * mengubah kata kunci menjadi huruf besar dan menghapus karakter non alfabet
 * @param {object} key
 * @param {string}
 */

function normalisasiKunci(key){
  const rawKey = String(key?.keyword ?? "KUNCI");
  const validasiKunci = rawKey.replace(/[^a-zA-Z]/g, "").toUpperCase();

  if(validasiKunci.length == 0){
    throw new Error("Kata kunci harus mengandung minimal satu huruf alfabet (A-Z)")
  }

  return validasiKunci;
}


/**
 * Algoritma Enkripsi Vigenere Cipher
 * @param {string} input - plaintext
 * @param {object} key - cipher key
 * @returns {{ result: string, steps: Array<{title: string, detail: string}> }} ciphertext and trace
 */
export function encrypt(input, key) {
  const keyword = normalisasiKunci(key);

  const steps = [
    { title: "Insisalisasi Enkripsi", detail: `Kata Kunci: '${keyword}' {Panjang: ${keyword.length}}`}
  ];

  if (!input) return { result: "", steps};

  let result = "";
  let keyIdx = 0;
  for (let i = 0; i < input.length; i++){
    const ch = input[i];
    const code = ch.charCodeAt(0);

    const kChar = keyword[keyIdx % keyword.length];
    const k_j = kChar.charCodeAt(0) - 65;

    if (code >= 65 && code <= 90){
      const p_i = code - 65;
      const c_i = (p_i + k_j) % 26;
      const resChar = String.fromCharCode(c_i + 65);
      result += resChar;

      steps.push({
        title: `Karakter ${i + 1} '${ch}' (Kunci: '${kChar}')`, 
        detail: `P = ${p_i} ('${ch}'), K = '${k_j}' ('${kChar}') -> (${p_i} + ${k_j}) mod 26 = ${c_i} -> ${resChar}`
      });

      keyIdx++; 
    }
    else if (code >= 97 && code <= 122){
      const p_i = code - 97;
      const c_i = (p_i + k_j) % 26;
      const resChar = String.fromCharCode(c_i + 97);
      result += resChar;

      steps.push({
        title: `Karakter ${i + 1} '${ch}' (Kunci: '${kChar}')`, 
        detail: `P = ${p_i} ('${ch}'), K = '${k_j}' ('${kChar}') -> (${p_i} + ${k_j}) mod 26 = ${c_i} -> ${resChar}`
      });

      keyIdx++;
    }

    else {
      result += ch;
      steps.push({
        title: `Karakter ${i + 1} '${ch}' bukan termasuk alfabet`,
        detail: `Karakter dilewati tanpa proses kunci`
      });
    }
  }

  steps.push({ title: "Hasil enkripsi", detail: result});
  return { result, steps };

}

/**
 * Algoritma Dekripsi Vigenere Cipher
 * @param {string} input - ciphertext
 * @param {object} key - cipher key
 * @returns {{ result: string, steps: Array<{title: string, detail: string}> }} plaintext and trace
 */
export function decrypt(input, key) {
  const keyword = normalisasiKunci(key);

  const steps = [
    { title: "Insisalisasi Dekripsi", detail: `Kata Kunci: '${keyword}' {Panjang: ${keyword.length}}`}
  ]

  if (!input) return { result: "", steps};
  
  let result = "";
  let keyIdx = 0;

  for (let i = 0; i < input.length; i++){
    const ch = input[i];
    const code = ch.charCodeAt(0);

    const kChar = keyword[keyIdx % keyword.length];
    const k_j = kChar.charCodeAt(0) - 65;

    if (code >= 65 && code <= 90){
      const p_i = code - 65;
      const c_i = ((p_i - k_j) % 26 + 26) % 26;
      const resChar = String.fromCharCode(c_i + 65);
      result += resChar;

      steps.push({
        title: `Karakter ${i + 1} '${ch}' (Kunci: '${kChar}')`, 
        detail: `P = ${p_i} ('${ch}'), K = '${k_j}' ('${kChar}') -> (${p_i} - ${k_j}) mod 26 = ${c_i} -> ${resChar}`
      });

      keyIdx++; 
    }
    else if (code >= 97 && code <= 122){
      const p_i = code - 97;
      const c_i = ((p_i - k_j) % 26 + 26) % 26;
      const resChar = String.fromCharCode(c_i + 97);
      result += resChar;

      steps.push({
        title: `Karakter ${i + 1} '${ch}' (Kunci: '${kChar}')`, 
        detail: `P = ${p_i} ('${ch}'), K = '${k_j}' ('${kChar}') -> (${p_i} - ${k_j}) mod 26 = ${c_i} -> ${resChar}`
      });

      keyIdx++;
    }

    else {
      result += ch;
      steps.push({
        title: `Karakter ${i + 1} '${ch}' bukan termasuk alfabet`,
        detail: `Karakter dilewati tanpa proses kunci`
      });
    }
  }

  steps.push({ title: "Hasil Dekripsi", detail: result});
  return { result, steps };


}
