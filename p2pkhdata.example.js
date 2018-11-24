const multisig = require('.').multisig
const bitcoin = require("bitcoinjs-lib")
const OPS = require('bitcoin-ops')

let input = { txhash: Buffer.from("d260c6e63fdfc3c87e5271d66efbf4de53c81c99942cc58354a327c26e7734db", 'hex').reverse(), vout: 2 }
let output1 = { address: Buffer.from("a914ab9283d2321d782a7917bdcab24e092855800ef587", 'hex'), value: 12000 }
let output2 = { address: Buffer.from("76a91405b7fdaad86023f724ca6965e0f361229662b68088ac", 'hex'), value: 9967000 }
let output3 = { address: bitcoin.script.compile([OPS.OP_RETURN].concat([Buffer.from("xiaomi:5CSff76SK7qcWYq5MpvoHDVRrjWFwpxurwUu6Bqw25hKPQiy", 'utf8')])), value: 0 }
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
