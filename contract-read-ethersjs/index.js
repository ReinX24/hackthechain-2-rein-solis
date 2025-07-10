require("dotenv").config();
const { ethers } = require("ethers");

async function readVRC25Data() {
  // Your Viction Testnet RPC URL from .env
  const rpcUrl = process.env.VIC_TESTNET_RPC_URL;
  const provider = new ethers.JsonRpcProvider(rpcUrl);

  // The address of your deployed SimpleVRC25Token contract from Day 2
  const contractAddress = "0x7B23d1a3aDF2301A4D642Caf7A70ea3C37585eeB";

  // A small part of the contract's ABI (Application Binary Interface)
  // This tells ethers.js what functions the contract has
  const minABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function decimals() view returns (uint8)",
    "function balanceOf(address account) view returns (uint256)",
    "function issuer() view returns (address)",
    "function minFee() view returns (uint256)",
    "function estimateFee(uint256 value) view returns (uint256)",
  ];

  const tokenContract = new ethers.Contract(contractAddress, minABI, provider);

  console.log("--- Reading VRC25 Token Data ---");

  try {
    const name = await tokenContract.name();
    console.log(`Token Name: ${name}`);

    const symbol = await tokenContract.symbol();
    console.log(`Token Symbol: ${symbol}`);

    const decimals = await tokenContract.decimals();
    console.log(`Token Decimals: ${decimals}`);

    const issuerAddress = await tokenContract.issuer();
    console.log(`Token Issuer: ${issuerAddress}`);

    const minFee = await tokenContract.minFee();
    console.log(`Minimum Fee (raw): ${minFee.toString()}`);
    console.log(
      `Minimum Fee (formatted): ${ethers.formatUnits(minFee, decimals)}`
    );

    // Replace with a wallet address to check its token balance (e.g., your MetaMask address)
    const accountAddress = "0xDDbc43e18869653d8F2ED8349853CA3961A83ce8";
    const balance = await tokenContract.balanceOf(accountAddress);
    console.log(`Balance of ${accountAddress} (raw): ${balance.toString()}`);
    console.log(
      `Balance of ${accountAddress} (formatted): ${ethers.formatUnits(
        balance,
        decimals
      )}`
    );

    // Estimate fee for sending 1 token
    const valueToEstimate = ethers.parseUnits("1", decimals);
    const estimatedFee = await tokenContract.estimateFee(valueToEstimate);
    console.log(
      `Estimated Fee for 1 token transfer (raw): ${estimatedFee.toString()}`
    );
    console.log(
      `Estimated Fee for 1 token transfer (formatted): ${ethers.formatUnits(
        estimatedFee,
        decimals
      )}`
    );
  } catch (error) {
    console.error("Error reading contract data:", error);
  }
}

readVRC25Data();
