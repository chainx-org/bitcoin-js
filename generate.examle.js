const bitcoin = require('bitcoinjs-lib')
const multisig = require('.').multisig

let key = multisig.generateKey("testnet")

const {address} = bitcoin.payments.p2pkh({pubkey: key.pubkey, network:bitcoin.networks.testnet})
console.log(key)
console.log(address)

