import { ethers } from "hardhat";
import * as readlineSync from "readline-sync"; // Import readline-sync
// import { SimpleStorage } from "../typechain-types";

async function main() {
  // --- Configuration ---
  // Replace with the actual address of your deployed SimpleStorage contract
  const contractAddress = "0x2888391eeBa4B39F051D4Fa0A375b8fE04dE0Fa6"; // Your deployed SimpleStorage contract address

  // --- Get Contract Instance ---
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  // Cast the attached contract to its specific Typechain type
  const simpleStorage = SimpleStorageFactory.attach(
    contractAddress
  );

  console.log(
    `Connected to SimpleStorage contract at: ${simpleStorage.target}`
  );

  // --- Get Current Favorite Number (Optional - for context) ---
  try {
    const currentFavoriteNumber = await simpleStorage.retrieve();
    console.log(`\n--- Current State ---`);
    console.log(
      `Current favorite number on chain: ${currentFavoriteNumber.toString()}`
    );
  } catch (error) {
    console.warn(
      "Could not retrieve current favorite number (contract might be new or network issue). Proceeding..."
    );
  }

  // --- Prompt User for New Number ---
  let newNumberInput: string;
  let newFavoriteNumber: number;

  while (true) {
    newNumberInput = readlineSync.question(
      "Enter the new favorite number (integer): "
    );
    newFavoriteNumber = parseInt(newNumberInput, 10); // Parse as base 10 integer

    if (isNaN(newFavoriteNumber)) {
      console.log("Invalid input. Please enter a valid integer.");
    } else {
      break; // Exit loop if input is a valid number
    }
  }

  console.log(`You entered: ${newFavoriteNumber}`);
  const confirm = readlineSync.question(
    `Confirm update favorite number to ${newFavoriteNumber}? (yes/no): `
  );

  if (confirm.toLowerCase() !== "yes") {
    console.log("Update cancelled by user.");
    return; // Exit the script
  }

  // --- Send Transaction to Update Favorite Number ---
  console.log(`\n--- Sending Transaction ---`);
  console.log(`Updating favorite number to: ${newFavoriteNumber}`);
  console.log(`Please wait for the transaction to be mined...`);

  try {
    // Note: Transaction functions require sending gas.
    // The wallet associated with your PRIVATE_KEY in .env must have enough testnet VIC.
    const storeTx = await simpleStorage.store(newFavoriteNumber);
    console.log(`Transaction submitted! Hash: ${storeTx.hash}`);

    // Wait for the transaction to be mined and confirmed
    const receipt = await storeTx.wait();
    console.log(
      `Transaction successfully mined in block ${receipt?.blockNumber}!`
    );
    console.log(`Gas used: ${receipt?.gasUsed.toString()}`);

    // --- Verify the Change ---
    console.log(`\n--- Verification ---`);
    const updatedFavoriteNumber = await simpleStorage.retrieve();
    console.log(
      `Favorite number after update: ${updatedFavoriteNumber.toString()}`
    );
  } catch (error) {
    console.error("\n!!! Transaction Failed !!!");
    console.error("Error details:", error);
    if (error instanceof Error) {
      if (error.message.includes("insufficient funds")) {
        console.error(
          "Reason: Insufficient funds in your wallet to cover gas fees."
        );
        console.error(
          "Please ensure the account associated with your PRIVATE_KEY has enough VIC testnet tokens."
        );
      } else if (error.message.includes("user rejected transaction")) {
        console.error(
          "Reason: Transaction was rejected by the user (MetaMask or similar wallet interaction)."
        );
      } else if (error.message.includes("gas required exceeds allowance")) {
        console.error(
          "Reason: Transaction likely reverted on-chain (e.g., due to a Solidity `require` or `revert`)."
        );
      } else {
        console.error(
          "Possible reasons: Network issue, contract error, or other unexpected problem."
        );
      }
    }
  }
}

// --- Error Handling ---
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
