require('babel-register')
require('babel-polyfill')

require('dotenv').config()


const HDWalletProvider = require('@truffle/hdwallet-provider');
const privateKey = process.env.PRIVATE_KEY


module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    kovan: {
      provider: function () {
        return new HDWalletProvider(
          [privateKey],
          'https://kovan.infura.io/v3/a87d44fc387d4366b9768712ecc92032'
        )
      },
      network_id: 42
    },
    binance: {
      provider: function () {
        return new HDWalletProvider(
          [privateKey],
          'https://data-seed-prebsc-1-s1.binance.org:8545'
        )
      },
      network_id: 0x61
    },
  },
  contracts_directory: './blockchain/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      version: "0.6.6",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
