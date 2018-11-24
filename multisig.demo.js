const multisig = require('.').multisig
const bitcoin = require("bitcoinjs-lib")

let input = { txhash: Buffer.from("1886329ff59e5709aff3f2fd3d3260d63b8fabc90cb9ac8769dca0f42b7d1ab4", 'hex').reverse(), vout: 1 }
let out1 = { address: Buffer.from("76a914246744d25d2a5ae7bf020f9b49877874b2ed4a8f88ac", 'hex'), value: 2000 }
let out2 = { address: Buffer.from("a914780d4f6c31a403aafca6cd1031e16bae37d63aa787", 'hex'), value: 6000 }
 
let tx = multisig.buildTransaction2Output(input, out1, out2)
//let tx = multisig.buildTransaction(input, out1)
console.log(tx)
console.log(tx.toHex())
let wif1 = "cUSb9aWh7UVwpYPZnj1EX35ng5b8ZQ5GT6MdH66jmiUdtJ5drw33"
let wif2 = "cR4w2k1TvRKefjB6nNxxFWcFUPtFSxNDs4vFuvvEHrhDGsAc4aDX"
let wif3 = "cNM1Q55yj6PWbgvEbUkMG9pW8ZoXhgcyKJv5Lz2eacpudJmjp1hG"
let keypair1 = bitcoin.ECPair.fromWIF(wif1, bitcoin.networks.testnet)
let keypair2 = bitcoin.ECPair.fromWIF(wif2, bitcoin.networks.testnet)
let keypair3 = bitcoin.ECPair.fromWIF(wif3, bitcoin.networks.testnet)
let pubkey1 = keypair1.publicKey
let pubkey2 = keypair2.publicKey
let pubkey3 = keypair3.publicKey
let o = multisig.multisig(pubkey3, pubkey2, pubkey1, "testnet")
console.log(o)
console.log("out:" + o.redeemScript.output.toString('hex'))
let redeem = o.redeemScript.output
console.log("tx:" + tx.toHex())
let tx1 = multisig.multiSignTransaction(tx, 0, keypair1, 'testnet', redeem)
console.log(tx1)
console.log(bitcoin.script.toASM(tx1.ins[0].script))
console.log("tx1:" + tx1.toHex())
let tx2 = multisig.multiSignTransaction(tx1, 0, keypair2, 'testnet', redeem)
console.log(tx2)
console.log(bitcoin.script.toASM(tx2.ins[0].script))
console.log("tx2:" + tx2.toHex())
