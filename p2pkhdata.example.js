const multisig = require('.').multisig
const bitcoin = require("bitcoinjs-lib")
const OPS = require('bitcoin-ops')

let input = { txhash: Buffer.from("86b73d1dc34487a213e0eeed38be9db5ab9ade1e9be76c8ea42895ec41e23f28", 'hex').reverse(), vout: 2 }
let output3 = { address: Buffer.from("a9145737c1979343920ceea40e7c7d68b264b0effa3e87", 'hex'), value: 129000 }
let output2 = { address: Buffer.from("76a91405b7fdaad86023f724ca6965e0f361229662b68088ac", 'hex'), value: 9700000 }
let output1 = { address: bitcoin.script.compile([OPS.OP_RETURN].concat([Buffer.from("5CjNcbP71KtLLRhcWMXqchzQYAeN6LRPnaneAvUnN2TkR8S7", 'utf8')])), value: 0 }
let tx1 = multisig.buildTransaction2Output(input, output1, output2)
console.log(tx1)
console.log(tx1.toHex())
let tx2 = multisig.buildTransaction3Output(input, output3, output1, output2)
console.log("tx2:" + tx2)
console.log(tx2.toHex())

let wif = "cNyWZXgLLsCEjEhCzBvvVe1bZTGh2FdjYNUCdN4iiR7VYaX7Vm2Q"
let keypair = bitcoin.ECPair.fromWIF(wif, bitcoin.networks.testnet)
let tx3 = multisig.signTransaction(tx2, 0, keypair, 'testnet')
console.log(tx3)
console.log(tx3.toHex())
