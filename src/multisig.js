const bitcoin = require("bitcoinjs-lib")
const OPS = require('bitcoin-ops')
const bcrypto = bitcoin.crypto
const bscript = bitcoin.script
const TransactionBuilder = bitcoin.TransactionBuilder
const Transaction = bitcoin.Transaction

function generateKey(networkInput) {
    let NETWORK = networkInput === "testnet" ? bitcoin.networks.testnet : bitcoin.networks.bitcoin
    let wif = bitcoin.ECPair.makeRandom({network: NETWORK}).toWIF()
    let keyPair = bitcoin.ECPair.fromWIF(wif, NETWORK)
    return {
        privkey: wif,
        pubkey: keyPair.publicKey
    }
}

function multisigRandom(m,n,networkInput){
    let NETWORK = networkInput === "testnet" ? bitcoin.networks.testnet : bitcoin.networks.bitcoin
    if(m>n){
         return "your first parameter must be less than your second parameter"
    }
    let wifList = []
    let pubList = []
    for(var i=0;i<n;i++){
        let wif = bitcoin.ECPair.makeRandom({network: NETWORK}).toWIF()
        wifList.push(wif)
        let keyPair = bitcoin.ECPair.fromWIF(wif, NETWORK)
        let pubKey = keyPair.publicKey
        let pubKeyHex = pubKey.toString('hex')
        pubList.push(pubKeyHex)
    }
	
    let pubkeys = pubList.map(function (hex) { return Buffer.from(hex, 'hex') })
	
    redeem = bitcoin.payments.p2ms({ pubkeys, m })
    const {address} = bitcoin.payments.p2sh({redeem: redeem})
    let wifListToString = wifList.join()
    return{
        addr: address,
        redeemScript: redeem,
        privateKeys: wifListToString
    }
}

function multisig(pubKey1, pubKey2, pubKey3, networkInput){
    let NETWORK = networkInput === "testnet" ? bitcoin.networks.testnet : bitcoin.networks.bitcoin
    let pubkeys = [
         pubKey1,
         pubKey2,
         pubKey3
    ].map(function (hex) { return Buffer.from(hex, 'hex') })

    redeem = bitcoin.payments.p2ms({ pubkeys, m:2 }) // 2 of 3
    const {address} = bitcoin.payments.p2sh({redeem: redeem})
    return{
        addr: address,
        redeemScript: redeem
    }
}

function buildTransaction(input, output) {
    const tx = new Transaction()
    tx.addInput(input.txhash, input.vout)
    tx.addOutput(output.address, output.value)
    return tx
}

function signTransaction(tx, vin, keyPair, networkInput, redeemScript, hashType) {
    let NETWORK = networkInput === "testnet" ? bitcoin.networks.testnet : bitcoin.networks.bitcoin
    let txb = TransactionBuilder.fromTransaction(tx, NETWORK)
    txb.sign(vin, keyPair, redeemScript, hashType)
    let tx1 = txb.buildIncomplete()
    return tx1
}

module.exports = {
    multisigRandom,
    multisig,
    generateKey,
    buildTransaction,
    signTransaction
}
