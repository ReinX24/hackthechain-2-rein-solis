require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // Load environment variables from.env file

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28", // Viction works with Solidity up to version 0.8.17 [34, 35]
  networks: {
    victionTestnet: {
      url: process.env.VIC_TESTNET_RPC_URL,
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      chainId: 89, // Viction Testnet Chain ID [32, 39, 35, 37]
    },
    // You can also set up Hardhat Network for local testing
    hardhat: {
      // Default Hardhat Network settings
    },
  },
  paths: {
    sources: "./contracts", // Where your Solidity files are
    tests: "./test", // Where your test files are
    cache: "./cache", // Hardhat's temporary files
    artifacts: "./artifacts", // Compiled contract files
  },
};
