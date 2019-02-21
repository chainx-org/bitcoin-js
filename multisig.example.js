let multisig = require('.').multisig

//const pubkey1 = '03f72c448a0e59f48d4adef86cba7b278214cece8e56ef32ba1d179e0a8129bdba'
//const pubkey2 = '02a79800dfed17ad4c78c52797aa3449925692bc8c83de469421080f42d27790ee'
//const pubkey3 = '0306117a360e5dbe10e1938a047949c25a86c0b0e08a0a7c1e611b97de6b2917dd'
//const pubkey4 = '03ece1a20b5468b12fd7beda3e62ef6b2f6ad9774489e9aff1c8bc684d87d70780'
//const pubkey5 = '0311252930af8ba766b9c7a6580d8dc4bbf9b0befd17a8ef7fabac275bba77ae40'
//const pubkey6 = '02e34d10113f2dd162e8d8614a4afbb8e2eb14eddf4036042b35d12cf5529056a2'
//const pubkey7 = '0227e54b65612152485a812b8856e92f41f64788858466cc4d8df674939a5538c3'
//const pubkey8 = '020699bf931859cafdacd8ac4d3e055eae7551427487e281e3efba618bdd395f2f'
//const pubkey9 = '02a83c80e371ddf0a29006096765d060190bb607ec015ba6023b40ace582e13b99'
//const pubkey10 = '023e505c48a955e759ce61145dc4a9a7447425290b8483f4e36f05169e7967c86d'
//const pubkey11 = '02e19bdd05ea0a1a4697ff9f5bbbb4544213761579e65e83ef063b7111331a7c52'
//const pubkey12 = '028712a3c5c023fe8527de5b8acb30d143648d0f0a78ef3c9f9fcf35784b1480af'
//const pubkey13 = '027035b5feaa47825a3fa3b506df189aa5f3746010270f59f963faac578f07da71'
//const pubkey14 = '022f2007350e6f66bd2e5fd934a64f08697efcaec465000f5b592e359283849375'
//const pubkey15 = '0371b017350d6880d9fa948bd55e2bf736e24116fca91858927fe6f3836e18c9ff'

//console.log(multisig.multisigmore(pubkey1, pubkey2, pubkey3, pubkey4, pubkey5, pubkey6, pubkey7, pubkey8, pubkey9, pubkey10, pubkey11, pubkey12, pubkey13, pubkey14, pubkey15, "testnet"))


//2N1CPZyyoKj1wFz2Fy4gEHpSCVxx44GtyoY
const pubkey1 = '03f72c448a0e59f48d4adef86cba7b278214cece8e56ef32ba1d179e0a8129bdba'
const pubkey2 = '0306117a360e5dbe10e1938a047949c25a86c0b0e08a0a7c1e611b97de6b2917dd'
const pubkey3 = '0311252930af8ba766b9c7a6580d8dc4bbf9b0befd17a8ef7fabac275bba77ae40'
const pubkey4 = '0227e54b65612152485a812b8856e92f41f64788858466cc4d8df674939a5538c3'
console.log(multisig.multisig34(pubkey1, pubkey2, pubkey3,pubkey4, "testnet"))

