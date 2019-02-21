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
	
    redeem = bitcoin.payments.p2ms({ pubkeys, m , network: NETWORK})
    const {address} = bitcoin.payments.p2sh({redeem: redeem, network: NETWORK})
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

    redeem = bitcoin.payments.p2ms({ pubkeys, m:2, network: NETWORK }) // 2 of 3
	const {address} = bitcoin.payments.p2sh({redeem: redeem, network: NETWORK})
	return{
        addr: address,
        redeemScript: redeem
    }
}

function multisigmore(pubKey1, pubKey2, pubKey3, pubKey4, pubKey5, pubKey6, pubKey7, pubKey8, pubKey9, pubKey10, pubKey11, pubKey12, pubKey13, pubKey14, pubKey15, networkInput){
    let NETWORK = networkInput === "testnet" ? bitcoin.networks.testnet : bitcoin.networks.bitcoin
    let pubkeys = [
         pubKey1,
         pubKey2,
         pubKey3,
         pubKey4,
         pubKey5,
         pubKey6,
         pubKey7,
         pubKey8,
         pubKey9,
         pubKey10,
         pubKey11,
         pubKey12,
         pubKey13,
         pubKey14,
         pubKey15
    ].map(function (hex) { return Buffer.from(hex, 'hex') })

    redeem = bitcoin.payments.p2ms({ pubkeys, m:11, network: NETWORK }) // 2 of 3
	console.log(redeem)
	const {address} = bitcoin.payments.p2sh({redeem: redeem, network: NETWORK})
	return{
        addr: address,
        redeemScript: redeem
    }
}

function multisig34(pubKey1, pubKey2, pubKey3, pubKey4, networkInput){
    let NETWORK = networkInput === "testnet" ? bitcoin.networks.testnet : bitcoin.networks.bitcoin
    let pubkeys = [
         pubKey1,
         pubKey2,
         pubKey3,
         pubKey4,
    ].map(function (hex) { return Buffer.from(hex, 'hex') })

    redeem = bitcoin.payments.p2ms({ pubkeys, m:3, network: NETWORK }) // 2 of 3
	console.log(redeem)
	const {address} = bitcoin.payments.p2sh({redeem: redeem, network: NETWORK})
	return{
        addr: address,
        redeemScript: redeem
    }
}

function multisig97(pubKey1, pubKey2, pubKey3, pubKey4, pubKey5, pubKey6, pubKey7, pubKey8, pubKey9, networkInput){
    let NETWORK = networkInput === "testnet" ? bitcoin.networks.testnet : bitcoin.networks.bitcoin
    let pubkeys = [
         pubKey1,
         pubKey2,
         pubKey3,
         pubKey4,
         pubKey5,
         pubKey6,
         pubKey7,
         pubKey8,
         pubKey9
    ].map(function (hex) { return Buffer.from(hex, 'hex') })

    redeem = bitcoin.payments.p2ms({ pubkeys, m:7, network: NETWORK }) // 2 of 3
	console.log(redeem)
	const {address} = bitcoin.payments.p2sh({redeem: redeem, network: NETWORK})
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

function buildTransaction2Output(input, output1, output2) {
    const tx = new Transaction()
    tx.addInput(input.txhash, input.vout)
    tx.addOutput(output1.address, output1.value)
    tx.addOutput(output2.address, output2.value)
    return tx
}

    

function buildTransaction2I2O(input1, input2, output1, output2) {
    const tx = new Transaction()
	//const txb = new bitcoin.TransactionBuilder()
    tx.addInput(input1.txhash, input1.vout)
	tx.addInput(input2.txhash, input2.vout)
    tx.addOutput(output1.address, output1.value)
    tx.addOutput(output2.address, output2.value)
    return tx
}
function buildTransaction2I1O(input1, input2, output) {
    const tx = new Transaction()
    tx.addInput(input1.txhash, input1.vout)
	tx.addInput(input2.txhash, input2.vout)
    tx.addOutput(output.address, output.value)

    return tx
}


function buildTransaction3Output(input, output1, output2, output3) {
    const tx = new Transaction()
    tx.addInput(input.txhash, input.vout)
    tx.addOutput(output1.address, output1.value)
    tx.addOutput(output2.address, output2.value)
    tx.addOutput(output3.address, output3.value)
    return tx
}

function signTransaction(tx, vin, keyPair, networkInput, redeemScript, hashType) {
    let NETWORK = networkInput === "testnet" ? bitcoin.networks.testnet : bitcoin.networks.bitcoin
    let txb = TransactionBuilder.fromTransaction(tx, NETWORK)
   txb.sign(vin, keyPair, redeemScript, hashType)
    let tx1 = txb.buildIncomplete()
    return tx1
}

function multiSignTransaction(tx, vin, keyPair, networkInput, redeemScript, hashType) {
    let NETWORK = networkInput === "testnet" ? bitcoin.networks.testnet : bitcoin.networks.bitcoin
    let txb = TransactionBuilder.fromTransaction(tx, NETWORK)
    txb.sign(vin, keyPair, redeemScript, hashType)
    let tx1 = txb.build()
    return tx1
}


module.exports = {
    multisigRandom,
    multisig,
	multisigmore,
	multisig34,
	multisig97,
    generateKey,
    buildTransaction,
    buildTransaction2Output,
	buildTransaction2I2O,
	buildTransaction2I1O,
    buildTransaction3Output,
    signTransaction,
    multiSignTransaction    
}
