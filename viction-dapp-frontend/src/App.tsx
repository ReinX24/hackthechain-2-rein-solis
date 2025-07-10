import React from "react";
import { useAccount, useBalance, useWalletClient } from "wagmi";
import { Web3Button, Web3NetworkSwitch } from "@web3modal/react";
import { ethers } from "ethers"; // Optional, depending on whether you're using viem or ethers
import { parseUnits } from "viem";
// import { useNetwork } from "wagmi";
import { useChainId, useConfig } from "wagmi";

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
  // const { chain } = useNetwork();
  const chainId = useChainId();
  const config = useConfig();
  const chain = config.chains.find((c) => c.id === chainId);

  const { data: client } = useWalletClient();

  const { data: vicBalance } = useBalance({
    address,
    chainId: chain?.id,
  });

  const { data: tokenBalance, refetch: refetchTokenBalance } = useBalance({
    address: isConnected ? address : undefined,
    token: VRC25_CONTRACT_ADDRESS as `0x${string}`,
    chainId: isConnected ? chain?.id : undefined,
  });

  const handleTransfer = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const recipient = formData.get("recipient") as `0x${string}`;
    const amountStr = formData.get("amount") as string;

    if (!isConnected || !address || !chain || !client) {
      alert("Please connect your wallet.");
      return;
    }

    try {
      const signer = new ethers.providers.Web3Provider(
        client.transport,
        "any"
      ).getSigner();

      const tokenContract = new ethers.Contract(
        VRC25_CONTRACT_ADDRESS,
        SimpleVRC25TokenABI,
        signer
      );

      const tokenDecimals = await tokenContract.decimals();
      const amount = parseUnits(amountStr, tokenDecimals);
      const tx = await tokenContract.transfer(recipient, amount);

      console.log("Transaction sent:", tx.hash);
      await tx.wait();
      alert("Transfer successful!");
      refetchTokenBalance();
    } catch (err: any) {
      console.error(err);
      alert("Transfer failed: " + err.message);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Viction DApp Workshop</h1>

      <div style={{ marginBottom: "20px" }}>
        <h2>Wallet Connection</h2>
        <Web3Button />
        {isConnected && (
          <>
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
          </>
        )}
      </div>

      {isConnected && (
        <form onSubmit={handleTransfer}>
          <h2>VRC25 Token Transfer</h2>
          <label>
            Recipient Address:
            <input
              name="recipient"
              required
              style={{ marginLeft: 10, width: "300px" }}
            />
          </label>
          <br />
          <label>
            Amount:
            <input
              name="amount"
              type="number"
              step="any"
              required
              style={{ marginLeft: 10, width: "150px", marginTop: 10 }}
            />
          </label>
          <br />
          <button
            type="submit"
            style={{ marginTop: 15, padding: "10px 20px", cursor: "pointer" }}
          >
            Transfer VRC25 Tokens
          </button>
        </form>
      )}
    </div>
  );
}

export default App;
