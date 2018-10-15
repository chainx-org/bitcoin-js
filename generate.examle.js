const bitcoin = require('bitcoinjs-lib')
const multisig = require('.').multisig

let key = multisig.generateKey("testnet")

const {address} = bitcoin.payments.p2pkh({pubkey: key.pubkey})
console.log(key)
console.log("address:" + address)
