import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// import { WagmiConfig } from "wagmi";
import { WagmiProvider } from "wagmi";
// import { wagmiConfig, victionMainnet, victionTestnet } from "./wagmiConfig.ts";
import { wagmiConfig } from "./wagmiConfig.ts";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { createWeb3Modal } from "@web3modal/wagmi/react";

const projectId = "6d0856dcf0e25cc73fa2c41e5518d65d";

const metadata = {
  name: "vrc25-frontend",
  description: "",
  url: "http://localhost:5173",
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

createWeb3Modal({
  wagmiConfig,
  projectId,
  metadata,
  themeMode: "light",
  enableAnalytics: false,
  featuredWalletIds: [],
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
