import { ethers } from "ethers";

// read only provider pointing to sepolia. It allows read only access to the sepolia blockchain
export const readOnlyProvider = new ethers.JsonRpcProvider(
  "https://ethereum-sepolia.blockpi.network/v1/rpc/public"
);

// export const optimismReadOnlyProvider = new ethers.JsonRpcProvider(
//     process.env.NEXT_PUBLIC_OPT_RPC_URL
// );
export const wssProvider = new ethers.WebSocketProvider(
  "wss://ethereum-sepolia-rpc.publicnode.com"
);

// read/write provider, that allows you to read data and also sign transaction on whatever chain it's pointing to
export const getProvider = (provider) => {
  if (provider) {
    return new ethers.BrowserProvider(provider);
  }
};
