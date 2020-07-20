var keygen = require('.')

const account = keygen() // { publicKey, privateKey, address }
console.log(account)
