// import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

require("dotenv").config();

const config = {
  solidity: {
    version: "0.8.17", // Ensure this matches your contract's pragma
  },
  networks: {
    // for mainnet
    "tomo-mainnet": {
      url: "https://rpc.viction.xyz",
      accounts: [process.env.PRIVATE_KEY],
    },
    // for testnet
    "tomo-testnet": {
      url: "https://rpc-testnet.viction.xyz",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 89, // Viction Testnet Chain ID
      gasPrice: 250000000000, // Explicitly set a gas price (250 Gwei)
      gasLimit: 10_000_000, // Explicitly set a high gas limit to bypass estimation issues
    },
  },
  defaultNetwork: "hardhat",
  paths: {
    sources: "./contracts", // Where your Solidity files are
    tests: "./test", // Where your test files are
    cache: "./cache", // Hardhat's temporary files
    artifacts: "./artifacts", // Compiled contract files
  },
  // --- Add Typechain configuration ---
  // typechain: {
  //   outDir: "typechain-types", // This is the default directory where types will be generated
  //   target: "ethers-v6", // Or "ethers-v5" if you're using ethers@5
  //   alwaysGenerate: true, // Regenerate types on every compile
  //   externalArtifacts: ["artifacts/**/*.json"], // Optional: include artifacts outside of the default Hardhat path
  // },
};

export default config;
