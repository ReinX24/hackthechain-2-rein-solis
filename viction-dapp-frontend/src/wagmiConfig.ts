import { createConfig, http } from "wagmi";

import {
  coinbaseWallet,
  injected,
  metaMask,
  walletConnect,
} from "@wagmi/connectors";

// 1. Viction Chains
export const victionMainnet = {
  id: 88,
  name: "Viction",
  network: "viction",
  nativeCurrency: { name: "Viction", symbol: "VIC", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.viction.xyz"] },
  },
  blockExplorers: {
    default: { name: "VicScan", url: "https://vicscan.xyz" },
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b397230ee197dce79d049dfbef42",
      blockCreated: 11_907_934,
    },
  },
} as const;

export const victionTestnet = {
  id: 89,
  name: "Viction Testnet",
  network: "viction-testnet",
  nativeCurrency: { name: "Viction", symbol: "VIC", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://89.rpc.thirdweb.com/"] },
  },
  blockExplorers: {
    default: { name: "VicScan Testnet", url: "https://testnet.vicscan.xyz" },
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b397230ee197dce79d049dfbef42",
      blockCreated: 11_907_934,
    },
  },
} as const;

// 2. Create wagmi config
export const wagmiConfig = createConfig({
  chains: [victionTestnet, victionMainnet],
  transports: {
    [victionTestnet.id]: http(),
    [victionMainnet.id]: http(),
  },
  connectors: [
    injected(),
    metaMask(),
    coinbaseWallet({ appName: "My DApp" }),
    walletConnect({
      projectId: "6d0856dcf0e25cc73fa2c41e5518d65d", // <- Replace with your real WC project ID
      showQrModal: true,
    }),
  ],
  ssr: true,
});
