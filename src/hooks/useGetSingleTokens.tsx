import { useCallback, useEffect, useState } from "react";
import { useGetAllERC20 } from "./useERC20Factory";
import { getFungibleContract } from "../constants/contracts";
import { getProvider } from "@/constants/providers";
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react";

// Get single ERC20 Token
export const useGetSingleERC20 = (tokenAddress: string) => {
  const { loading, data } = useGetAllERC20();

  const getTokenByAddress = useCallback(
    (tokenAddress: string) => {
      const token = data.find((token: any) => token.address === tokenAddress);
      return token;
    },
    [data]
  );

  const [selectedToken, setSelectedToken] = useState<any>(null);

  useEffect(() => {
    if (data.length > 0) {
      const token = getTokenByAddress(tokenAddress);
      setSelectedToken(token);
    }
  }, [data, getTokenByAddress]);

  return selectedToken;
};

// Hanle ERC20 interaction

export const GetBalanceOf = (tokenAddress: string) => {
  const [balance, setBalance] = useState<number | undefined>(undefined);
  const { address } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const readWriteProvider = getProvider(walletProvider);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const signer = await readWriteProvider.getSigner();
        const contract = getFungibleContract(signer, tokenAddress);
        const balance = await contract.balanceOf(address);
        setBalance(balance);
      } catch (error) {
        console.error('Error fetching balance:', error);
        // Optionally handle the error or set a default balance
      }
    };

    fetchData();
  }, [tokenAddress, address]);

  return balance;
};

// export const GetBalanceOf = (tokenAddress: string) => {
//   const [balance, setBalance] = useState<number | undefined>(undefined);
//   const { address } = useWeb3ModalAccount();
//   const { walletProvider } = useWeb3ModalProvider();
//   const readWriteProvider = getProvider(walletProvider);
  
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const signer = await readWriteProvider.getSigner();
//         const contract = getFungibleContract(signer, tokenAddress);
//         const balance = await contract.balanceOf(address);
//         setBalance(balance);
//       } catch (error) {
//         console.error('Error fetching balance:', error);
//         // Optionally handle the error or set a default balance
//       }
//     };

//     fetchData();
//   }, [readWriteProvider, tokenAddress, address]);

//   return balance;
// };

