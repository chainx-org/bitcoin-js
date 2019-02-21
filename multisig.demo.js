const multisig = require('.').multisig
const bitcoin = require("bitcoinjs-lib")
const Transaction = bitcoin.Transaction
const OPS = require('bitcoin-ops')


let input1 = { txhash: Buffer.from("86b73d1dc34487a213e0eeed38be9db5ab9ade1e9be76c8ea42895ec41e23f28", 'hex').reverse(), vout: 0}
//let input2 = { txhash: Buffer.from("fc7d636955034e3a76738e7c6ec92bfcaf7098adcc54f883b78daa58a5bdb54c", 'hex').reverse(), vout: 1}
//let input3 = { txhash: Buffer.from("38fca3d1ab611f8a99d517a44c4170f10709a10214c96c3a78e06ade824dbd82", 'hex').reverse(), vout: 1 }

let out1 = { address: Buffer.from("76a914a5155d5636db0a9b8314460812f5105d84a5ae3d88ac", 'hex'), value: 5000 }
let out2 = { address: Buffer.from("a9145737c1979343920ceea40e7c7d68b264b0effa3e87", 'hex'), value: 54000 }
//let out2 = { address: Buffer.from("a9140a124f630617d2d3dc738956044bc34d4ca8271d87", 'hex'), value: 1000 }
//let out2 = { address: Buffer.from("a914e0525b7918043451dc57c5f5b0bbdc26af20886787", 'hex'), value: 0 }
//let out3 = { address: bitcoin.script.compile([OPS.OP_RETURN].concat([Buffer.from("ChainX:5CSff76SK7qcWYq5MpvoHDVRrjWFwpxurwUu6Bqw25hKPQiy:certname:66", 'utf8')])), value: 0 }
//let tx = multisig.buildTransaction2Output(input, out1, out3)
//let tx = multisig.buildTransaction3Output(input, out3, out1, out2)
//let tx = multisig.buildTransaction2I2O(input1, input2, out1, out2)
//let tx = multisig.buildTransaction(input1, out1)
//let tx = multisig.buildTransaction2I1O(input1, input2, out1)
//console.log(tx.toHex())
let tx = multisig.buildTransaction2Output(input1, out1, out2)
//let tx = multisig.buildTransaction(input, out1)
//let rawtx = "0200000002d71093c50957f455a7633ae1a530b685498695640c81be28eac6928effb683dd0100000000ffffffff95d1432466d25e2e7608eeeab4941679aed6a391579661873f053114b1a75ced0100000000ffffffff0100d0ed902e0000001976a914023dbd259dd15fc43da1a758ea7b2bfaec97893488ac00000000"
//const tx = new Transaction()
//let tx = Transaction.fromHex(rawtx)

console.log(tx)
console.log(tx.toHex())

//2N1CPZyyoKj1wFz2Fy4gEHpSCVxx44GtyoY
let wif1 = "cUSb9aWh7UVwpYPZnj1EX35ng5b8ZQ5GT6MdH66jmiUdtJ5drw33"
let wif2 = "cNM1Q55yj6PWbgvEbUkMG9pW8ZoXhgcyKJv5Lz2eacpudJmjp1hG"
let wif3 = "cSXAH3eqx7T6RwtgrUhvxpWBoBkNJgnCx5nQVnCPyCRhAEkX2iqL"
let wif4 = "cSXvChvzizEv4CkC1rQ94VEjjHWhRsUJaPxTZsUUMV97sncmTvQa"

//j
//let wif3 = "cSUjiocHzUJWYn1j4dTNJP5FxPNfstJM4CHMgk7vTz2hHENJ2WgC"
//F
//let wif2 = "cTB8tginFz5Xg7Rh7mMjhMGXz67MvmXNXMtARyPY65QKaMgpmHGN"
//E
//let wif1 = "cSXAH3eqx7T6RwtgrUhvxpWBoBkNJgnCx5nQVnCPyCRhAEkX2iqL"

//trust_tee
//j
//let wif1 = "cSUjiocHzUJWYn1j4dTNJP5FxPNfstJM4CHMgk7vTz2hHENJ2WgC"
//F
//let wif2 = "cTB8tginFz5Xg7Rh7mMjhMGXz67MvmXNXMtARyPY65QKaMgpmHGN"
//E
//let wif3 = "cSXAH3eqx7T6RwtgrUhvxpWBoBkNJgnCx5nQVnCPyCRhAEkX2iqL"


let keypair1 = bitcoin.ECPair.fromWIF(wif1, bitcoin.networks.testnet)
let keypair2 = bitcoin.ECPair.fromWIF(wif2, bitcoin.networks.testnet)
let keypair3 = bitcoin.ECPair.fromWIF(wif3, bitcoin.networks.testnet)
let keypair4 = bitcoin.ECPair.fromWIF(wif4, bitcoin.networks.testnet)
let pubkey1 = keypair1.publicKey
let pubkey2 = keypair2.publicKey
let pubkey3 = keypair3.publicKey
let pubkey4 = keypair4.publicKey

let o = multisig.multisig34(pubkey1, pubkey2, pubkey3,pubkey4, "testnet")
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

let tx3 = multisig.multiSignTransaction(tx2, 0, keypair3, 'testnet', redeem)
console.log(tx3)
console.log(bitcoin.script.toASM(tx3.ins[0].script))
console.log("tx3:" + tx3.toHex())

