require("babel-register");
require("@babel/polyfill");

const HDWalletProvider = require("@truffle/hdwallet-provider");

const fs = require("fs");
const path = require("path");

module.exports = {
  contracts_directory: "contracts",
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
    },
    ropsten: {
      provider: () => {
        const privatekey = fs
          .readFileSync(`${path.dirname(__filename)}/.secret`)
          .toString();
        return new HDWalletProvider(
          privatekey,
          // "https://ropsten.infura.io/v3/5f11f9a4e05348b78420d8207bfb75c5"
          // "wss://ropsten.infura.io/ws/v3/34b8cb070feb45619332c8867301bdaa"
          // "https://eth-ropsten.alchemyapi.io/v2/uPrNsttftKyrZIputd80GsfzXar-NAL3"
          "wss://eth-ropsten.alchemyapi.io/v2/uPrNsttftKyrZIputd80GsfzXar-NAL3"
        );
      },
      network_id: 3,
      confirmations: 3,
      websocket: true,
      timeoutBlocks: 50000,
      networkCheckTimeout: 1000000,
      skipDryRun: true,
      // gas: 20000000,
      // gasPrice: 2000000000, // 2 Gwei
    },
    rinkeby: {
      provider: () => {
        const privatekey = fs
          .readFileSync(`${path.dirname(__filename)}/.secret`)
          .toString();
        return new HDWalletProvider(
          privatekey,
          // "https://rinkeby.infura.io/v3/5f11f9a4e05348b78420d8207bfb75c5"
          "wss://rinkeby.infura.io/ws/v3/5f11f9a4e05348b78420d8207bfb75c5"
          // "https://eth-ropsten.alchemyapi.io/v2/uPrNsttftKyrZIputd80GsfzXar-NAL3"
          // "wss://eth-rinkeby.alchemyapi.io/v2/uPrNsttftKyrZIputd80GsfzXar-NAL3"
        );
      },
      network_id: 4,
      // confirmations: 4,
      websocket: true,
      timeoutBlocks: 150000,
      networkCheckTimeout: 1000000,
      skipDryRun: true,
      gas: 10000000,
      gasPrice: 10000000000, // 2 Gwei
    },
    ethmainnet: {
      provider: () => {
        const privatekey = fs
          .readFileSync(`${path.dirname(__filename)}/.secret`)
          .toString();
        return new HDWalletProvider(
          privatekey,
          // "https://mainnet.infura.io/v3/34b8cb070feb45619332c8867301bdaa"
          // "wss://mainnet.infura.io/ws/v3/34b8cb070feb45619332c8867301bdaa"
          // "https://eth-mainnet.alchemyapi.io/v2/ccd5do8Kqn7QHjkrx74pwwlgzo10Rtvh"
          "wss://eth-mainnet.alchemyapi.io/v2/ccd5do8Kqn7QHjkrx74pwwlgzo10Rtvh"
        );
      },
      network_id: 1,
      confirmations: 3,
      websocket: true,
      timeoutBlocks: 50000,
      networkCheckTimeout: 1000000,
      skipDryRun: true,
      // gas: 2000000,
    },
    bsctestnet: {
      provider: () => {
        const privatekey = fs
          .readFileSync(`${path.dirname(__filename)}/.secret`)
          .toString();
        return new HDWalletProvider(
          privatekey,
          "https://data-seed-prebsc-1-s1.binance.org:8545/"
          // "https://data-seed-prebsc-1-s3.binance.org:8545/"
        );
      },
      network_id: 97,
      confirmations: 10,
      timeoutBlocks: 50000,
      networkCheckTimeout: 1000000,
      skipDryRun: true,
      gas: 10000000,
      gasPrice: 10000000000, // 2 Gwei
    },
    bscmainnet: {
      provider: () => {
        const privatekey = fs
          .readFileSync(`${path.dirname(__filename)}/.secret`)
          .toString();
        return new HDWalletProvider(
          privatekey,
          "https://bsc-dataseed.binance.org/"
          // "https://bsc-dataseed4.defibit.io/"
        );
      },
      network_id: 56,
      confirmations: 10,
      timeoutBlocks: 50000,
      networkCheckTimeout: 1000000,
      skipDryRun: true,
      gasPrice: 10000000000,
    },
  },
  compilers: {
    solc: {
      version: "0.8.11",
      parser: "solcjs",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    },
  },
  plugins: ["truffle-plugin-verify","solidity-coverage"],
  api_keys: {
    etherscan: "44JKAW5HAI1ERR4I8WD8JTPP24FA8J6E5D",
    bscscan: "3J3WPPW72ACTIR9XZA3DAQXGKUMA7Z8YRI",
  },
};
