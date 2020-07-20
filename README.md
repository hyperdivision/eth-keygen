# `eth-keygen`

> Keygen for Ethereum keys and EOA's

## Usage

```js
var keygen = require('eth-keygen')

const account = keygen() // { publicKey, privateKey, address }
```

## API

### `const { publicKey, privateKey, address } = keygen([privateKey], [chainId])`

Generate a new account, or recreate an existing one from `privateKey`, with
optional `chainId`. Returns `Buffer` `publicKey`, sodium `SecureBuffer`
`privateKey` and a checksum encoded `string` `address` (with optional `chainId`
included in the checksum).

## Install

```sh
npm install eth-keygen
```

## License

[ISC](LICENSE)
