const multisig = require('.').multisig
const bitcoin = require("bitcoinjs-lib")
const OPS = require('bitcoin-ops')

let input = { txhash: Buffer.from("3b40c8ded8f2d9e1580b7718d8e5a17d008bb5dd2e5ca8bbd175bdcfc8119a67", 'hex').reverse(), vout: 0 }
let output1 = { address: Buffer.from("76a914a5155d5636db0a9b8314460812f5105d84a5ae3d88ac", 'hex'), value: 10 }
let output2 = { address: bitcoin.script.compile([OPS.OP_RETURN].concat([Buffer.from("22222222222222222222222", 'utf8')])), value: 0 }
let tx = multisig.buildTransaction2Output(input, output1, output2)
console.log(tx)
console.log(tx.toHex())

let wif = "cR4w2k1TvRKefjB6nNxxFWcFUPtFSxNDs4vFuvvEHrhDGsAc4aDX"
let keypair = bitcoin.ECPair.fromWIF(wif, bitcoin.networks.testnet)
let tx2 = multisig.signTransaction(tx, 0, keypair, 'testnet')
console.log(tx2)
console.log(tx2.toHex())
