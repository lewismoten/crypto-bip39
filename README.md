crypto-bip39

This is a small experiment to understand how cryptographic wallet private keys for cryptocurrency can be generated and use a BIP39 Mnemonic code as a backup key.

# Notes

Proof of concept. Code is intentionally messy.

# Instructions

Just run `npm start`. It will generate a private key from the crypto library and display its BIP39 mnemonic code on the console.

## Output
`mother answer list soon coconut song crucial interest eye oyster message neck pumpkin menu home release sun glow notice parent pink horse such want`

## Detailed Output

To see generated private keys and detailed information, run details.
`npm run details`

```
-[ Private Key ]----------------------------------------------------------------

90213609e7a2cf9e4d1bad5133ce2fc9dadb165b45a9d94c7a5bd01a50dbb61f

bits: 256
total wallet count: 115,792,089,237,316,200,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000

 1: 0x90 10010000 144    12: 0x51 01010001  81    23: 0xd9 11011001 217
 2: 0x21 00100001  33    13: 0x33 00110011  51    24: 0x4c 01001100  76
 3: 0x36 00110110  54    14: 0xce 11001110 206    25: 0x7a 01111010 122
 4: 0x09 00001001   9    15: 0x2f 00101111  47    26: 0x5b 01011011  91
 5: 0xe7 11100111 231    16: 0xc9 11001001 201    27: 0xd0 11010000 208
 6: 0xa2 10100010 162    17: 0xda 11011010 218    28: 0x1a 00011010  26
 7: 0xcf 11001111 207    18: 0xdb 11011011 219    29: 0x50 01010000  80
 8: 0x9e 10011110 158    19: 0x16 00010110  22    30: 0xdb 11011011 219
 9: 0x4d 01001101  77    20: 0x5b 01011011  91    31: 0xb6 10110110 182
10: 0x1b 00011011  27    21: 0x45 01000101  69    32: 0x1f 00011111  31
11: 0xad 10101101 173    22: 0xa9 10101001 169

-[ Words ]----------------------------------------------------------------------

count: 24
bits: 11
dictionary: 2048

 1: 10010000001 1153 mother      13: 10101101101 1389 pumpkin
 2: 00001001101   77 answer      14: 10001011001 1113 menu
 3: 10000010011 1043 list        15: 01101101000  872 home
 4: 11001111010 1658 soon        16: 10110101001 1449 release
 5: 00101100111  359 coconut     17: 11011001010 1738 sun
 6: 11001111001 1657 song        18: 01100011110  798 glow
 7: 00110100011  419 crucial     19: 10010110111 1207 notice
 8: 01110101101  941 interest    20: 10100000001 1281 parent
 9: 01010001001  649 eye         21: 10100101000 1320 pink
10: 10011110011 1267 oyster      22: 01101101110  878 horse
11: 10001011111 1119 message     23: 11011000011 1731 such
12: 10010011101 1181 neck        24: 111........

-[ Checksum ]-------------------------------------------------------------------

guess chance:  256
hash:   0xb7701fa09f2431538435c69a4c3d03b4edde8d5d058ad07fc4570caeb87dd9d8
start:  0xb7 ...10110111
partial:     111........
word 24:     11110110111 1975 want

-[ BIP39 Mnemonic Code ]--------------------------------------------------------

mother answer list soon coconut song crucial interest eye oyster message neck pumpkin menu home release sun glow notice parent pink horse such want

-[ First Four Letters ]---------------------------------------------------------

 1: moth     2: answ     3: list     4: soon
 5: coco     6: song     7: cruc     8: inte
 9: eye     10: oyst    11: mess    12: neck
13: pump    14: menu    15: home    16: rele
17: sun     18: glow    19: noti    20: pare
21: pink    22: hors    23: such    24: want

```

# Security Warning
- Generating a private key on your computer is not considered to be secure.
- The provided example key has been posted in a public repository and should not be used.
