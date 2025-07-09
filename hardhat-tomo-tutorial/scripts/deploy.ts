import { ethers } from "hardhat";

async function main() {
  // Removed the explicit gasLimit here.
  // Hardhat will now use the gasLimit configured in hardhat.config.js
  // or its own estimation, which is generally safer.
  const myToken = await ethers.deployContract("MyToken"); // Assuming MyToken is the contract you want to deploy
  const simpleStorage = await ethers.deployContract("SimpleStorage");

  await myToken.waitForDeployment();
  await simpleStorage.waitForDeployment();

  console.log("Token Contract Deployed at " + myToken.target);
  console.log("Simple Storage Contract Deployed at " + simpleStorage.target);

  const veriDoc = await ethers.deployContract("VeriDoc");

  await veriDoc.waitForDeployment(); // For ethers v6

  console.log("VeriDoc deployed to:", veriDoc.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
