import { createConfig, configureChains, mainnet } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

// 1. Set up Viction networks (Mainnet and Testnet)
export const victionMainnet = {
  id: 88,
  name: 'Viction',
  network: 'viction',
  nativeCurrency: { name: 'Viction', symbol: 'VIC', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc.viction.xyz'] },
    public: { http: ['https://rpc.viction.xyz'] },
  },
  blockExplorers: {
    default: { name: 'VicScan', url: 'https://vicscan.xyz' },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b397230ee197dce79d049dfbef42', // A common contract address
      blockCreated: 11_907_934,
    },
  },
} as const;

export const victionTestnet = {
  id: 89,
  name: 'Viction Testnet',
  network: 'viction-testnet',
  nativeCurrency: { name: 'Viction', symbol: 'VIC', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc-testnet.viction.xyz'] },
    public: { http: ['https://rpc-testnet.viction.xyz'] },
  },
  blockExplorers: {
    default: { name: 'VicScan Testnet', url: 'https://testnet.vicscan.xyz' },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b397230ee197dce79d049dfbef42', // A common contract address
      blockCreated: 11_907_934,
    },
  },
} as const;

// 2. Set up networks and how to get data
const { chains, publicClient, webSocketPublicClient } = configureChains(
 , // Add other networks if needed
  [publicProvider()]
);

// 3. Create wagmi settings
export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors:
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
});