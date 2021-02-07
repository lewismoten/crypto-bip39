const fs = require('fs');
const crypto = require('crypto');

const PRIVATE_KEY_BITS = 256;
const PRIVATE_KEY_BYTES = Math.ceil(PRIVATE_KEY_BITS / 8);
const WORD_BITS = 11;
const WORD_COUNT = Math.ceil(PRIVATE_KEY_BITS / WORD_BITS);

const dictionary = fs.readFileSync('words.txt', 'utf8').split('\r\n');

const asBits = byte => byte.toString(2).padStart(8, '0')
const bytesToBits = bytes => Array.from(bytes).map(asBits).join('');

const wordMapper = bits => (blank, index) => {
  const start = index * WORD_BITS;
  const wordBits = bits.substring(start, start + WORD_BITS);
  const value = parseInt(wordBits, 2);
  return dictionary[value];
}

const privateKey = crypto.randomBytes(PRIVATE_KEY_BYTES);
const hash = crypto.createHash("sha256").update(privateKey).digest();
const bits = bytesToBits(privateKey) + bytesToBits(hash);
const words = new Array(WORD_COUNT).fill('').map(wordMapper(bits));

console.log(words.join(' '));
