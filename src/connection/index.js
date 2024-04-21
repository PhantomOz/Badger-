"use client";

import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";
import { Inter, Montserrat } from "next/font/google";

export const SUPPORTED_CHAIN = 8082;

export const BASE_SHARDEUM_ID = 84532;
export const SHARDEUM_ID = 8082;
export const OPTIMISM_SHARDEUM_ID = 11155420;
const montserrat = Montserrat({ subsets: ["latin"] });

const Shardeum = {
  chainId: SHARDEUM_ID,
  name: "Shardeum Sphinx 1.X",
  currency: "SHM",
  explorerUrl: "https://explorer-sphinx.shardeum.org/",
  rpcUrl: process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL,
};

const metadata = {
  name: "Badger for Shardeum",
  description: "No code token creation",
  url: "https://mywebsite.com",
  icons: ["https://avatars.mywebsite.com/"],
};

// const ethersConfig = defaultConfig({
//     metadata
//   })

// 5. Create a Web3Modal instance
createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [Shardeum],
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  enableAnalytics: false, // Optional - defaults
  themeVariables: {
    "--w3m-accent": "#006AFF",
    "--w3m-border-radius-master": "",
    "--w3m-font-size-master": "16",
  },
});

export function Web3Modal({ children }) {
  return children;
}
