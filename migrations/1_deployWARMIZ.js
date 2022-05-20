const { accounts, contract } = require("@openzeppelin/test-environment");

const WARMIZ = artifacts.require("WARMIZ");

const fetch = require("node-fetch");
const { execSync } = require("child_process");
const web3Utils = require("web3-utils");

const [owner, user1] = accounts;

const queryGasPrice = async () => {
  return new Promise((resolve, reject) => {
    fetch("https://ethgasstation.info/json/ethgasAPI.json", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        const gasPriceData = Number(json.fast) / 10; // Gwei

        console.log(`Queried gas price: ${gasPriceData} Gwei`);
        resolve(Number(gasPriceData) * 10 ** 9);

        // Only for test
        // resolve(2000000000);
      })
      .catch((err) => {
        console.log(err);
        resolve(null);
      });
  });
};

const networkIdName = {
  1: "ethmainnet",
  3: "ropsten",
  4: "rinkeby",
  97: "bsctestnet",
  56: "bscmainnet",
};

const verifyCmd = (contractName, contractAddr, networkName) => {
  return `npx truffle run verify ${contractName}@${contractAddr} --network ${networkName}`;
};

// Verify and publish to etherscan
const execVerifyCmd = (contractName, contractAddr, networkName) => {
  // Ganache case
  if (!networkName) {
    return;
  }

  let RETRIES = 5;

  try {
    execSync(verifyCmd(contractName, contractAddr, networkName));
  } catch (err) {
    while (RETRIES > 0) {
      RETRIES--;
      try {
        execSync(verifyCmd(contractName, contractAddr, networkName));
        return;
      } catch (err2) {}
    }

    console.log(
      `Cannot publish contractName:${contractName}, contractAddr:${contractAddr} `
    );
    console.log("Error:", err);
  }
};

module.exports = function (deployer, network, accounts) {
  deployer.then(async () => {
    const networkId = await web3.eth.net.getId();
    const networkName = networkIdName[networkId];

    const deployerAccount = accounts[0];

    const oriBalance = await web3.eth.getBalance(deployerAccount);

    console.log(`WARMIZ token deployment started at ${new Date()}`);

    console.log(
      `Deployer account: ${deployerAccount}, balance: ${web3.utils.fromWei(
        oriBalance
      )} ETH`
    );

    let opts = {
      from: deployerAccount,
    };

    if (networkName === "ethmainnet") {
      const gasPrice = await queryGasPrice();

      opts = {
        ...opts,
        gasPrice,
      };
    }

    // Deploy MACAddon Contract
    const WARMIZContract = await deployer.deploy(
      WARMIZ,
      "0x334C8D25Be4D146983d56E6C5fe456c2197c9824", 
      "0x334C8D25Be4D146983d56E6C5fe456c2197c9824",
      opts
    );

    // Verify and publish to etherscan
    execVerifyCmd("WARMIZ", WARMIZContract.address, networkName);
    console.log(`WARMIZ deployment ended at ${new Date()}`);

  });
};
