// src/index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// wagmi + web3modal
import { WagmiConfig } from "wagmi";
import { createWeb3Modal } from "@web3modal/wagmi/react";

// wagmi config & chains
import { wagmiConfig } from "./wagmiConfig.ts";

// ✅ Import React Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Your WalletConnect project ID (replace with actual one)
const projectId = "YOUR_WALLETCONNECT_PROJECT_ID";

// 1. Create the QueryClient instance
const queryClient = new QueryClient();

// 2. Init Web3Modal
createWeb3Modal({
  wagmiConfig,
  projectId,
  enableAnalytics: true,
  themeMode: "light",
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiConfig>
  </React.StrictMode>
);
