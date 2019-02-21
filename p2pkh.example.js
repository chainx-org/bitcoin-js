const multisig = require('.').multisig
const bitcoin = require("bitcoinjs-lib")

let input = { txhash: Buffer.from("a1d4c9f289efe27eb929345642b59aafbc76f428a97e37e9d6ff757f7f24159d", 'hex').reverse(), vout: 1 }
let output = { address: Buffer.from("76a914023dbd259dd15fc43da1a758ea7b2bfaec97893488ac", 'hex'), value: 2000}
//let output = { address: Buffer.from("a914780d4f6c31a403aafca6cd1031e16bae37d63aa787", 'hex'), value: 0 }
let tx = multisig.buildTransaction(input, output)
console.log(tx)
console.log(tx.toHex())

let wif = "cSXAH3eqx7T6RwtgrUhvxpWBoBkNJgnCx5nQVnCPyCRhAEkX2iqL"
let keypair = bitcoin.ECPair.fromWIF(wif, bitcoin.networks.testnet)
let tx2 = multisig.signTransaction(tx, 0, keypair, 'testnet')
console.log(tx2)
console.log(tx2.toHex())
