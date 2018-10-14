const multisig = require('.').multisig
const bitcoin = require("bitcoinjs-lib")

let input = { txhash: Buffer.from("ed54169243a4852da7d17e420e1d74587205db998d90d7bdab8a18f43574fa6e", 'hex'), vout: 0 }
let output = { address: Buffer.from("2N6dcdEoGqVcqbfVdm9F1Dm8hwCJuhBhwSh", 'hex'), value: 1 }
let tx = multisig.buildTransaction(input, output)
console.log(tx)

let wif = "cVEELeecpaosuL5r4FPnJkLcJk5xJYDiG9R2imuYqSBzo76o5A4C"
let keypair = bitcoin.ECPair.fromWIF(wif, bitcoin.networks.testnet)
let tx2 = multisig.signTransaction(tx, 0, keypair, 'testnet')
console.log(tx2)
