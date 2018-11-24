let multisig = require('.').multisig

const pubkey1 = '02e34d10113f2dd162e8d8614a4afbb8e2eb14eddf4036042b35d12cf5529056a2'
const pubkey2 = '0311252930af8ba766b9c7a6580d8dc4bbf9b0befd17a8ef7fabac275bba77ae40'
const pubkey3 = '03ece1a20b5468b12fd7beda3e62ef6b2f6ad9774489e9aff1c8bc684d87d70780'
console.log(multisig.multisig(pubkey1, pubkey2, pubkey3, "testnet"))
