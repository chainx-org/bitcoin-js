const bitcoin = require("bitcoinjs-lib")
const OPS = require('bitcoin-ops')
const bcrypto = bitcoin.crypto
const bscript = bitcoin.script


function generateKey(networkInput) {
	let NETWORK = networkInput === "testnet" ? bitcoin.networks.testnet : bitcoin.networks.bitcoin
    let wif = bitcoin.ECPair.makeRandom({network: NETWORK}).toWIF()
    let keyPair = bitcoin.ECPair.fromWIF(wif, NETWORK)
    return {
        privkey: wif,
        pubkey: keyPair.publicKey.toString('hex')
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
		redeemScript: redeem.output.toString('hex'),
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
		redeemScript: redeem.output.toString('hex')
	}
}

module.exports = {
    multisigRandom,
    multisig,
    generateKey
}