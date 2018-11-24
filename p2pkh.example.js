const multisig = require('.').multisig
const bitcoin = require("bitcoinjs-lib")

let input = { txhash: Buffer.from("97eff152f057504f87fad6f63f9583851568b91afd501ac5b05a94d1bac9585b", 'hex').reverse(), vout: 1 }
let output1 = { address: Buffer.from("a914780d4f6c31a403aafca6cd1031e16bae37d63aa787", 'hex'), value: 10000000 }
let output2 = { address: Buffer.from("a914780d4f6c31a403aafca6cd1031e16bae37d63aa787", 'hex'), value: 10000000 }
let tx = multisig.buildTransaction(input, output)
console.log(tx)
console.log(tx.toHex())

let wif = "cR4w2k1TvRKefjB6nNxxFWcFUPtFSxNDs4vFuvvEHrhDGsAc4aDX"
let keypair = bitcoin.ECPair.fromWIF(wif, bitcoin.networks.testnet)
let tx2 = multisig.signTransaction(tx, 0, keypair, 'testnet')
console.log(tx2)
console.log(tx2.toHex())
