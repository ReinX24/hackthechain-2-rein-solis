import { ethers } from "hardhat";
// import { SimpleStorage } from "../typechain-types";

async function main() {
  // Replace with the actual address of your deployed SimpleStorage contract
  const contractAddress = "0x2888391eeBa4B39F051D4Fa0A375b8fE04dE0Fa6"; // Your deployed SimpleStorage contract address

  // Get the ContractFactory for SimpleStorage
  const SimpleStorage = await ethers.getContractFactory("SimpleStorage");

  // Attach to the deployed contract using its address
  const simpleStorage = SimpleStorage.attach(contractAddress);

  // const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  // Cast the attached contract to its specific Typechain type
  // const simpleStorage = SimpleStorageFactory.attach(
  //   contractAddress
  // ) as SimpleStorage;

  console.log(
    `Connected to SimpleStorage contract at: ${simpleStorage.target}`
  );

  // --- Retrieve the current favorite number ---
  console.log("\n--- Retrieving Current Favorite Number ---");
  try {
    const currentFavoriteNumber = await simpleStorage.retrieve();
    console.log(`Current favorite number: ${currentFavoriteNumber.toString()}`);
  } catch (error) {
    console.error("Error retrieving favorite number:", error);
  }

  // --- Retrieve all stored users from listOfPeople array without modifying the .sol file ---
  console.log("\n--- Retrieving All Stored Users (listOfPeople) ---");
  let i = 0;
  let foundPeople = 0;
  while (true) {
    try {
      const person = await simpleStorage.listOfPeople(i);
      // If we reach here, a person was successfully retrieved
      console.log(
        `Person at index ${i}: Name: ${
          person.name
        }, Favorite Number: ${person.favoriteNumber.toString()}`
      );
      foundPeople++;
      i++; // Increment index for the next iteration
    } catch (error: any) {
      // Check for the specific 'BAD_DATA' error code or related messages
      if (
        error.code === "BAD_DATA" ||
        error.code === "CALL_EXCEPTION" ||
        error.message.includes("could not decode result data")
      ) {
        console.log(`No more persons found after index ${i - 1}.`);
        console.log(`Total persons retrieved: ${foundPeople}.`);
        break; // Exit the loop
      } else {
        // Log any other unexpected errors and then break
        console.error(
          `An unexpected error occurred while fetching person at index ${i}:`,
          error
        );
        break;
      }
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
