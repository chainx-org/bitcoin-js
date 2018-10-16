const multisig = require('.').multisig
const bitcoin = require("bitcoinjs-lib")

let input = { txhash: Buffer.from("ed54169243a4852da7d17e420e1d74587205db998d90d7bdab8a18f43574fa6e", 'hex'), vout: 0 }
let out = { address: Buffer.from("2N6dcdEoGqVcqbfVdm9F1Dm8hwCJuhBhwSh"), value: 1 }
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
