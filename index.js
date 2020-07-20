const assert = require('nanoassert')
const hash = require('sha3-wasm').keccak256
const curve = require('secp256k1-native')
const sodium = require('sodium-native')
const checksum = require('eth-checksum')

const signCtx = curve.secp256k1_context_create(curve.secp256k1_context_SIGN)
module.exports = function keygen (privateKey, chainId) {
  assert(privateKey == null ? true : privateKey.byteLength === 32, 'privateKey must be 32 bytes')
  assert(chainId == null ? true : chainId === chainId >>> 0, 'chainId must be uint32')
  if (privateKey == null) {
    privateKey = sodium.sodium_malloc(32)
    do {
      sodium.randombytes_buf(privateKey)
    } while (!curve.secp256k1_ec_seckey_verify(signCtx, privateKey))
  }

  const k = Buffer.alloc(curve.secp256k1_PUBKEYBYTES)
  curve.secp256k1_ec_pubkey_create(signCtx, k, privateKey)

  const publicKey = Buffer.alloc(65)
  curve.secp256k1_ec_pubkey_serialize(signCtx, publicKey, k, curve.secp256k1_ec_UNCOMPRESSED)

  const digest = hash().update(publicKey.slice(1)).digest()
  const address = checksum.encode(digest.slice(-20), chainId)

  return { privateKey, publicKey, address }
}
