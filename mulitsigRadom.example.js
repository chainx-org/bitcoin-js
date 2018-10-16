const multisig = require('.').multisig

let out = multisig.multisigRandom(2, 3, "testnet")
console.log(out)

console.log("redeem script: " + out.redeemScript.output.toString('hex'))


