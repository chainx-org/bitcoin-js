const multisig = require('.').multisig
const bitcoin = require("bitcoinjs-lib")
const OPS = require('bitcoin-ops')

let input = { txhash: Buffer.from("88f381241fec52c43f68bf29f66a340e2459b5b91d7582870e2c842e63169121", 'hex').reverse(), vout: 0 }
let output = { address: bitcoin.script.compile([OPS.OP_RETURN].concat([Buffer.from("123434a", 'utf8')])), value: 0 }
let tx = multisig.buildTransaction(input, output)
console.log(tx)
console.log(tx.toHex())

let wif = "cQSam21Eb4vV6oc6dmpiQvrtcTLBZ2QmfLhhbhziRqDqH9oLViS5"
let keypair = bitcoin.ECPair.fromWIF(wif, bitcoin.networks.testnet)
let tx2 = multisig.signTransaction(tx, 0, keypair, 'testnet')
console.log(tx2)
console.log(tx2.toHex())
