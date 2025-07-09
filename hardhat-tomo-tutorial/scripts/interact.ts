import { ethers } from "hardhat";

async function main() {
  // Replace with the actual address of your deployed SimpleStorage contract
  // You get this address from the output of your deploy.ts script
  const contractAddress = "0x2888391eeBa4B39F051D4Fa0A375b8fE04dE0Fa6";

  // Get the ContractFactory for SimpleStorage
  // This needs to match the contract name in your Solidity file
  const SimpleStorage = await ethers.getContractFactory("SimpleStorage");

  // Attach to the deployed contract using its address
  const simpleStorage = await SimpleStorage.attach(contractAddress);

  console.log(
    `Connected to SimpleStorage contract at: ${simpleStorage.target}`
  );

  // --- Calling a view function (retrieve) ---
  console.log("\n--- Calling retrieve() ---");
  const currentFavoriteNumber = await simpleStorage.retrieve();
  console.log(`Current favorite number: ${currentFavoriteNumber.toString()}`);

  // --- Calling a transaction function (store) ---
  console.log("\n--- Calling store(77) ---");
  // Note: Transaction functions require sending gas, so your connected wallet
  // (from the PRIVATE_KEY in .env) must have enough testnet VIC.
  const storeTx = await simpleStorage.store(77);
  await storeTx.wait(); // Wait for the transaction to be mined
  console.log(`store(77) transaction hash: ${storeTx.hash}`);

  // Verify the change by calling retrieve again
  const newFavoriteNumber = await simpleStorage.retrieve();
  console.log(
    `New favorite number after store(77): ${newFavoriteNumber.toString()}`
  );

  // --- Calling another transaction function (addPerson) ---
  console.log("\n--- Calling addPerson('Alice', 123) ---");
  const addPersonTx = await simpleStorage.addPerson("Alice", 123);
  await addPersonTx.wait();
  console.log(`addPerson('Alice', 123) transaction hash: ${addPersonTx.hash}`);

  // Retrieve data for Alice using the mapping
  console.log("\n--- Retrieving Alice's favorite number ---");
  const aliceFavoriteNumber = await simpleStorage.nameToFavoriteNumber("Alice");
  console.log(`Alice's favorite number: ${aliceFavoriteNumber.toString()}`);

  // Retrieve data from the listOfPeople array (e.g., the first person added)
  // Note: Array elements are accessed by index starting from 0
  console.log("\n--- Retrieving first person from listOfPeople ---");
  const firstPerson = await simpleStorage.listOfPeople(0); // Accessing the first element (index 0)
  console.log(
    `First person: Name: ${
      firstPerson.name
    }, Favorite Number: ${firstPerson.favoriteNumber.toString()}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
