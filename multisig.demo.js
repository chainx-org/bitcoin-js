const multisig = require('.').multisig
const bitcoin = require("bitcoinjs-lib")

let input = { txhash: Buffer.from("8fa889c7b1411bcb8a565ad588ef5313f23b9661521dac3cc183cfeb870ef1e1", 'hex').reverse(), vout: 0 }
let out = { address: Buffer.from("76a914cfd6b18ff3c883d0fb26244a695e89279e673e5a88ac"), value: 100 }
let tx = multisig.buildTransaction(input, out)
console.log(tx)

let wif1 = "cVEELeecpaosuL5r4FPnJkLcJk5xJYDiG9R2imuYqSBzo76o5A4C"
let wif2 = "cQNxnqXe5VVJFg1kRPoEUEcfsdNxM9R86vcjCU5j2EX8Ejk8EHfg"
let wif3 = "cTcsx18PxhPyNmVMZWmjt7mZepxfvTiM6kyYvkHJNAsZJFakBMzx"
let keypair1 = bitcoin.ECPair.fromWIF(wif1, bitcoin.networks.testnet)
let keypair2 = bitcoin.ECPair.fromWIF(wif2, bitcoin.networks.testnet)
let keypair3 = bitcoin.ECPair.fromWIF(wif3, bitcoin.networks.testnet)
let pubkey1 = keypair1.publicKey
let pubkey2 = keypair2.publicKey
let pubkey3 = keypair3.publicKey
let o = multisig.multisig(pubkey1, pubkey2, pubkey3, "testnet")
console.log(o)
console.log("out:" + o.redeemScript.output.toString('hex'))
let redeem = o.redeemScript.output
console.log("tx:" + tx.toHex())
let tx1 = multisig.signTransaction(tx, 0, keypair1, 'testnet', redeem)
console.log(tx1)
console.log("tx1:" + tx1.toHex())
let tx2 = multisig.signTransaction(tx1, 0, keypair2, 'testnet', redeem)
console.log(tx2)
console.log("tx2:" + tx2.toHex())
