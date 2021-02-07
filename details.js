const fs = require('fs');
const crypto = require('crypto');

const dictionary = fs.readFileSync('words.txt', 'utf8').split('\r\n');

const getMax = (max, word) => word.length > max ? word.length : max;
const asBits = byte => byte.toString(2).padStart(8,'0');
const asHex = byte => '0x' + byte.toString(16).padStart(2, '0');
const asValue = byte => byte.toString(10).padStart(3);
const NO_MATCH = 'NONE'; // never happends unless logic or words.txt is wrong

const showHeader = text => {
  console.log();
  console.log(`-[ ${text} ]`.padEnd(80, '-'));
  console.log();
}

const maxWordLength = dictionary.reduce(getMax, 0);

const bitCount = 256;
const byteCount = Math.ceil(bitCount / 8);
const wordBitCount = 11;
const wordCount = Math.ceil(bitCount / wordBitCount);
const words = [];

const wallet = crypto.randomBytes(byteCount);
const walletHex = wallet.toString('hex');
const walletBitString = Array.from(wallet).map(asBits).join('');

const showTable = (cells, columnCount) => {
  const count = cells.length;
  const orderLength = count.toString().length;
  const rowCount = Math.ceil(count/columnCount);
  for(let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
    const rowCells = [];
    for(let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
      const index = rowIndex + (rowCount * columnIndex);
      if(index >= count) break;
      const order = (index + 1).toString().padStart(orderLength)
      rowCells.push(`${order}: ${cells[index]}`);
    }
    console.log(rowCells.join('    '));
  }
}
const showTableL2R = (cells, columnCount) => {
  const count = cells.length;
  const orderLength = count.toString().length;
  const rowCount = Math.ceil(count/columnCount);
  for(let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
    const rowCells = [];
    for(let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
      const index = columnIndex + (columnCount * rowIndex);
      if(index >= count) break;
      const order = (index + 1).toString().padStart(orderLength)
      rowCells.push(`${order}: ${cells[index]}`);
    }
    console.log(rowCells.join('    '));
  }
}

showHeader('Private Key');
console.log(walletHex);
console.log();
console.log('bits:', bitCount);
console.log('total wallet count:', Math.pow(2, bitCount).toLocaleString())
console.log();

const walletData = (index) => {
  if(index >= byteCount) return '';
  const byte = wallet[index];
  return [
    asHex(byte),
    asBits(byte),
    asValue(byte)
  ].join(' ');
}

const cells = [];
for(let i = 0; i < byteCount; i++) {
  cells.push(walletData(i));
}
showTable(cells, 3);

showHeader('Words');
console.log('count:', wordCount);
console.log('bits:', wordBitCount);
console.log('dictionary:', Math.pow(2, wordBitCount))
console.log();
const wordValues = [];
const wordData = (index) => {
  if(index >= wordCount) return '';
  let bitStart = index * wordBitCount;
  let bitEnd = bitStart + wordBitCount;
  let bits = walletBitString.substring(bitStart, bitEnd);
  let value;
  let valueString = '';
  let word = '';
  if(bits.length === wordBitCount) {
    value = parseInt(bits, 2);
    word = dictionary[value] || NO_MATCH;
    words[index] = word;
    valueString = value.toString().padStart(4, ' ');
    wordValues.push(value)
  }
  return [
    bits.padEnd(wordBitCount, '.'),
    valueString,
    word.padEnd(maxWordLength, ' ')
  ].join(' ');
}
cells.length = 0;
for(let i = 0; i < wordCount; i++) {
  cells.push(wordData(i));
}
showTable(cells, 2);

showHeader('Checksum');
const hash = crypto.createHash("sha256").update(wallet).digest('hex');
const hashBitCount = wordBitCount - (bitCount % wordBitCount);
console.log('guess chance: ', Math.pow(2, hashBitCount));
console.log(`hash:   0x${hash}`);
const hashStartHex = hash.substring(0, 2);
const hashStartByte = parseInt(hashStartHex, 16);
const hashStartBits = asBits(hashStartByte).substring(0, hashBitCount);
console.log(
  'start: ',
  asHex(hashStartByte),
  hashStartBits.padStart(wordBitCount, '.')
);
const lastWordPartialBits = walletBitString.substring((wordCount - 1) * wordBitCount);
console.log('partial:    ', lastWordPartialBits.padEnd(wordBitCount, '.'));
const lastWordBits = lastWordPartialBits + hashStartBits;
const lastWordValue = parseInt(lastWordBits, 2);
const lastWord = dictionary[lastWordValue];
console.log(
  `word ${wordCount}:`.padEnd(12),
  lastWordBits,
  lastWordValue.toString().padStart(4),
  lastWord
)
words[wordCount -1] = lastWord;

showHeader('BIP39 Mnemonic Code');
console.log(words.join(' '));

showHeader('First Four Letters');
showTableL2R(words.map(word => (word||NO_MATCH).substring(0, 4).padEnd(4)), 4);

console.log();
