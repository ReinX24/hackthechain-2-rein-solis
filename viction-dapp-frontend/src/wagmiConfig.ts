import { http, createConfig } from "wagmi";
import { mainnet } from "wagmi/chains";
import {
  coinbaseWallet,
  injected,
  metaMask,
  walletConnect,
} from "wagmi/connectors";

export const victionMainnet = {
  id: 88,
  name: "Viction",
  network: "viction",
  nativeCurrency: {
    name: "Viction",
    symbol: "VIC",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.viction.xyz"],
    },
  },
  blockExplorers: {
    default: {
      name: "VicScan",
      url: "https://vicscan.xyz",
    },
  },
} as const;

export const victionTestnet = {
  id: 89,
  name: "Viction Testnet",
  network: "viction-testnet",
  nativeCurrency: {
    name: "Viction",
    symbol: "VIC",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://rpc-testnet.viction.xyz"],
    },
  },
  blockExplorers: {
    default: {
      name: "VicScan Testnet",
      url: "https://testnet.vicscan.xyz",
    },
  },
} as const;

const chains = [victionMainnet, victionTestnet, mainnet] as const;

const transports = {
  [victionMainnet.id]: http(victionMainnet.rpcUrls.default.http[0]),
  [victionTestnet.id]: http(victionTestnet.rpcUrls.default.http[0]),
  [mainnet.id]: http(),
};

export const wagmiConfig = createConfig({
  chains,
  transports,
  connectors: [
    injected(),
    metaMask(),
    coinbaseWallet({
      appName: "My App",
    }),
    walletConnect({
      projectId: "your_walletconnect_project_id",
      metadata: {
        name: "My App",
        description: "My App Description",
        url: "https://yourapp.com",
        icons: ["https://yourapp.com/logo.png"],
      },
    }),
  ],
  ssr: true, // optional
});
