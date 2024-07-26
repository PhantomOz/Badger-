"use client";

import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";

export const SCROLL_SEPOLIA_ID = 534351;
export const SHARDEUM_ID = 8082;
export const AMOY_ID = 80002;
export const SUPPORTED_CHAIN = 11155111;
const Shardeum = {
  chainId: SHARDEUM_ID,
  name: "Shardeum Sphinx 1.X",
  currency: "SHM",
  explorerUrl: "https://explorer-sphinx.shardeum.org/",
  rpcUrl: process.env.NEXT_PUBLIC_AMOY_RPC_URL,
};

const sepolia = {
  chainId: 11155111,
  name: "Sepolia",
  currency: "ETH",
  explorerUrl: "https://sepolia.etherscan.io",
  rpcUrl: "https://1rpc.io/sepolia",
};

const Scroll = {
  chainId: SCROLL_SEPOLIA_ID,
  name: "Scroll",
  currency: "ETH",
  explorerUrl: "https://sepolia.scrollscan.com/",
  rpcUrl: process.env.NEXT_PUBLIC_AMOY_RPC_URL,
};

const Amoy = {
  chainId: AMOY_ID,
  name: "Polygon Amoy",
  currency: "MATIC",
  explorerUrl: "https://amoy.polygonscan.com/",
  rpcUrl: process.env.NEXT_PUBLIC_AMOY_RPC_URL,
};

const metadata = {
  name: "Badger for Shardeum",
  description: "No code token and nft deployment and interaction",
  url: "https://mywebsite.com",
  icons: ["https://avatars.mywebsite.com/"],
};

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [sepolia],
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  enableAnalytics: false, // Optional - defaults
  themeVariables: {
    "--w3m-accent": "#006AFF",
    "--w3m-border-radius-master": "",
    "--w3m-font-size-master": "16",
  },
  defaultChain: 11155111,
});

export function Web3Modal({ children }) {
  return children;
}
