import React from "react";
import { useAccount, useNetwork, useBalance } from "wagmi";
// import { Web3Button, Web3NetworkSwitch } from "@web3modal/wagmi/react";
import { Web3Button, Web3NetworkSwitch } from "@web3modal/react";
import { ethers } from "ethers"; // For handling amounts if not using viem's parseUnits
import { parseUnits } from "viem"; // For handling amounts if using viem

// Replace with the ABI of your deployed SimpleVRC25Token contract
const SimpleVRC25TokenABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name_",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol_",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "decimals_",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "initialSupply",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "minFee_",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "issuer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Fee",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "estimateFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "isContract",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "issuer",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "minFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newMinFee",
        type: "uint256",
      },
    ],
    name: "setMinFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

// Replace with the address of your deployed SimpleVRC25Token contract
const VRC25_CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS";

function App() {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { data: vicBalance } = useBalance({
    address: address,
    chainId: chain?.id,
  });
  const { data: tokenBalance, refetch: refetchTokenBalance } = useBalance({
    address: address,
    token: VRC25_CONTRACT_ADDRESS as `0x${string}`,
    chainId: chain?.id,
    enabled:
      isConnected &&
      VRC25_CONTRACT_ADDRESS !== "YOUR_DEPLOYED_CONTRACT_ADDRESS", // Only get balance if connected and contract address is set
  });

  const handleTransfer = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const recipient = formData.get("recipient") as `0x${string}`;
    const amountStr = formData.get("amount") as string;

    if (!isConnected || !address || !chain) {
      alert("Please connect your wallet.");
      return;
    }

    try {
      // In a real app, you'd use wagmi's built-in ways to get provider/signer
      // For this simple example, we'll create them manually
      // const provider = new ethers.providers.JsonRpcProvider(
      //   chain.rpcUrls.default.http
      // );

      const provider = new ethers.providers.JsonRpcProvider(
        chain.rpcUrls.default.http[0] // pick the first URL if it's an array
      );

      // const signer = new ethers.Wallet(
      //   process.env.REACT_APP_PRIVATE_KEY | "",
      //   provider
      // ); // Load private key securely (for development only!)

      const privateKey = process.env.REACT_APP_PRIVATE_KEY;

      if (!privateKey) {
        throw new Error("Private key is missing!");
      }

      const signer = new ethers.Wallet(privateKey, provider);

      const tokenContract = new ethers.Contract(
        VRC25_CONTRACT_ADDRESS,
        SimpleVRC25TokenABI,
        signer
      );
      // Get decimals from the contract
      const tokenDecimals = await tokenContract.decimals();
      const amount = parseUnits(amountStr, tokenDecimals); // Use parseUnits to format amount
      console.log(`Transferring ${amountStr} tokens to ${recipient}...`);
      const tx = await tokenContract.transfer(recipient, amount);
      console.log("Transaction sent:", tx.hash);
      await tx.wait(); // Wait for the transaction to be confirmed
      alert("Transfer successful!");
      refetchTokenBalance(); // Update balance display
    } catch (error) {
      console.error("Transfer failed:", error);
      alert(`Transfer failed: ${(error as Error).message}`);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Viction DApp Workshop</h1>

      <div style={{ marginBottom: "20px" }}>
        <h2>Wallet Connection</h2>
        <Web3Button />
        {isConnected && (
          <div style={{ marginTop: "10px" }}>
            <p>Connected Address: {address}</p>
            <p>
              Network: {chain?.name} (Chain ID: {chain?.id})
            </p>
            <p>
              VIC Balance: {vicBalance?.formatted} {vicBalance?.symbol}
            </p>
            <p>
              VRC25 Token Balance: {tokenBalance?.formatted}{" "}
              {tokenBalance?.symbol}
            </p>
            <Web3NetworkSwitch />
          </div>
        )}
      </div>

      {isConnected && (
        <div style={{ marginBottom: "20px" }}>
          <h2>VRC25 Token Transfer</h2>
          <form onSubmit={handleTransfer}>
            <div style={{ marginBottom: "10px" }}>
              <label htmlFor="recipient">Recipient Address:</label>
              <input
                type="text"
                id="recipient"
                name="recipient"
                required
                style={{ marginLeft: "10px", width: "300px", padding: "5px" }}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label htmlFor="amount">Amount:</label>
              <input
                type="number"
                id="amount"
                name="amount"
                step="any"
                required
                style={{ marginLeft: "10px", width: "150px", padding: "5px" }}
              />
            </div>
            <button
              type="submit"
              style={{ padding: "10px 20px", cursor: "pointer" }}
            >
              Transfer VRC25 Tokens
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
