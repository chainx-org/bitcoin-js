const multisig = require('.').multisig
const bitcoin = require("bitcoinjs-lib")

let input = { txhash: Buffer.from("22d68ba894f990b416003f38638063a105dc3ebd1874b25f43bd0637569c8f9f", 'hex').reverse(), vout: 0 }
let output = { address: Buffer.from("76a914cfd6b18ff3c883d0fb26244a695e89279e673e5a88ac", 'hex'), value: 10000000 }
let tx = multisig.buildTransaction(input, output)
console.log(tx)
console.log(tx.toHex())

let wif = "cSJq7j96rdKSpYDcy1eAKGb2ZiLrhEhn27GbYAeBJEppQ3ZuiTiq"
let keypair = bitcoin.ECPair.fromWIF(wif, bitcoin.networks.testnet)
let tx2 = multisig.signTransaction(tx, 0, keypair, 'testnet')
console.log(tx2)
console.log(tx2.toHex())
