let multisig = require('.').multisig

const pubkey1 = '03501f1e5f1b67d0700e4da24754261eb915bc7d6c8f9f254e00027698518e8c0a'
const pubkey2 = '0277f14d19b6120784af17fc16b3b7fcfd91912bd6a52a080428f1b55c2c38d3bb'
const pubkey3 = '0277f14d19b6120784af17fc16b3b7fcfd91912bd6a52a080428f1b55c2c38d3bb'
console.log(multisig.multisig(pubkey1, pubkey2, pubkey3, "testnet"))
