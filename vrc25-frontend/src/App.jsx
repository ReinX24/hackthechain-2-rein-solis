import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { VRC25_ABI } from "./abi";
import firebaseApp from "./firebase";

const CONTRACT_ADDRESS = "0x7B23d1a3aDF2301A4D642Caf7A70ea3C37585eeB"; // Replace this!

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);

  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [decimals, setDecimals] = useState(18);
  const [balance, setBalance] = useState("");

  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  const [spender, setSpender] = useState("");
  const [approveAmount, setApproveAmount] = useState("");

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [transferFromAmount, setTransferFromAmount] = useState("");

  const [ownerAddr, setOwnerAddr] = useState("");
  const [spenderAddr, setSpenderAddr] = useState("");
  const [allowanceResult, setAllowanceResult] = useState("");

  const [minFee, setMinFee] = useState("");
  const [newMinFee, setNewMinFee] = useState("");

  const [chainId, setChainId] = useState("");
  const [networkName, setNetworkName] = useState("");

  const connectWallet = async () => {
    const prov = new ethers.BrowserProvider(window.ethereum);
    const signer = await prov.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, VRC25_ABI, signer);
    const address = await signer.getAddress();
    const decimals = await contract.decimals();

    const name = await contract.name();
    const symbol = await contract.symbol();
    const balance = await contract.balanceOf(address);
    const fee = await contract.minFee();
    const network = await prov.getNetwork(); // Get network details

    setProvider(prov);
    setSigner(signer);
    setContract(contract);
    setAccount(address);
    setDecimals(decimals);
    setName(name);
    setSymbol(symbol);
    setBalance(ethers.formatUnits(balance, decimals));
    setMinFee(ethers.formatUnits(fee, decimals));
    setChainId(network.chainId);
    setNetworkName(network.name);
  };

  const refreshBalance = async () => {
    const balance = await contract.balanceOf(account);
    setBalance(ethers.formatUnits(balance, decimals));
  };

  const sendTokens = async () => {
    const amt = ethers.parseUnits(amount, decimals);
    const fee = await contract.estimateFee(amt);
    const tx = await contract.transfer(recipient, amt);
    await tx.wait();
    await refreshBalance();
    alert("Transfer completed");
  };

  const approveTokens = async () => {
    const amt = ethers.parseUnits(approveAmount, decimals);
    const tx = await contract.approve(spender, amt);
    await tx.wait();
    alert("Approved");
  };

  const transferFromTokens = async () => {
    const amt = ethers.parseUnits(transferFromAmount, decimals);
    const tx = await contract.transferFrom(from, to, amt);
    await tx.wait();
    alert("transferFrom completed");
  };

  const checkAllowance = async () => {
    const allowance = await contract.allowance(ownerAddr, spenderAddr);
    setAllowanceResult(ethers.formatUnits(allowance, decimals));
  };

  const updateMinFee = async () => {
    const fee = ethers.parseUnits(newMinFee, decimals);
    const tx = await contract.setMinFee(fee);
    await tx.wait();
    alert("Min fee updated");
    const updated = await contract.minFee();
    setMinFee(ethers.formatUnits(updated, decimals));
  };

  return (
    <div style={{ padding: 30, fontFamily: "sans-serif" }}>
      <h1>VRC25 Token Interface</h1>
      {!account ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <>
          <p>
            <strong>Account:</strong> {account}
          </p>
          <p>
            <strong>Token:</strong> {name} ({symbol})
          </p>
          <p>
            <strong>Token Balance:</strong> {balance} {symbol}
          </p>
          <p>
            <strong>Min Fee:</strong> {minFee} {symbol}
          </p>
          <p>
            <strong>Network:</strong> {networkName} (Chain ID: {chainId})
          </p>

          <hr />

          <h2>Transfer</h2>
          <input
            placeholder="Recipient"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
          <input
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button onClick={sendTokens}>Transfer</button>

          <hr />

          {/* <h2>Approve</h2>
          <input
            placeholder="Spender address"
            value={spender}
            onChange={(e) => setSpender(e.target.value)}
          />
          <input
            placeholder="Amount to approve"
            value={approveAmount}
            onChange={(e) => setApproveAmount(e.target.value)}
          />
          <button onClick={approveTokens}>Approve</button>

          <hr /> */}

          {/* <h2>Transfer From</h2>
          <input
            placeholder="From address"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
          <input
            placeholder="To address"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
          <input
            placeholder="Amount"
            value={transferFromAmount}
            onChange={(e) => setTransferFromAmount(e.target.value)}
          />
          <button onClick={transferFromTokens}>Transfer From</button>

          <hr /> */}

          {/* <h2>Check Allowance</h2>
          <input
            placeholder="Owner"
            value={ownerAddr}
            onChange={(e) => setOwnerAddr(e.target.value)}
          />
          <input
            placeholder="Spender"
            value={spenderAddr}
            onChange={(e) => setSpenderAddr(e.target.value)}
          />
          <button onClick={checkAllowance}>Check</button>
          <p>Allowance: {allowanceResult}</p>

          <hr /> */}

          <h2>Set Min Fee (Owner Only)</h2>
          <input
            placeholder="New min fee"
            value={newMinFee}
            onChange={(e) => setNewMinFee(e.target.value)}
          />
          <button onClick={updateMinFee}>Set Fee</button>
        </>
      )}
    </div>
  );
}

export default App;
