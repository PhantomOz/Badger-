import { useCallback, useEffect, useState } from "react";
import { isSupportedChain } from "../utils";
import { isAddress } from "ethers";
import { getProvider } from "../constants/providers";
import { getFactoryContract } from "../constants/contracts";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { readOnlyProvider } from "../constants/providers";

// import { useToast } from "../components/ui/use-toast";

//Create ERC20 tokens
export const useCreateERC20 = (address: any) => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  //   const { toast } = useToast();

  return useCallback(async () => {
    if (!isSupportedChain(chainId)) return console.error("Wrong network");
    if (!isAddress(address)) return console.error("Invalid address");
    const readWriteProvider = getProvider(walletProvider);
    const signer = await readWriteProvider.getSigner();

    const contract = getFactoryContract(signer);

    try {
      const estimatedGas = await contract.giveRightToVote.estimateGas(address);
      contract.getAllFungibleToken();
    } catch (error) {
      console.error("error: ", error);
    }
  }, [address, chainId, walletProvider]);
};

//Get all ERC20 Tokens
export const useGetAllERC20 = () => {
  const [tokens, setTokens] = useState({
    loading: true,
    data: [],
  });

  useEffect(() => {
    const contract = getFactoryContract(readOnlyProvider);

    contract
      .getCreatedFungibleTokenByAddress()
      .then((res) => {
        setTokens({
          loading: false,
          data: res,
        });
      })
      .catch((err) => {
        console.error("error fetching proposals: ", err);
        setTokens((prev) => ({ ...prev, loading: false }));
      });
  }, []);

  return tokens;
};
