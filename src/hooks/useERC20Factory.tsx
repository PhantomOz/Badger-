import { useCallback, useEffect, useState } from "react";
import { isSupportedChain } from "../utils";
import { Addressable, ethers, solidityPacked } from "ethers";
import { getProvider, wssProvider } from "../constants/providers";
import { getFactoryContract } from "../constants/contracts";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { readOnlyProvider } from "../constants/providers";

// import { useToast } from "../components/ui/use-toast";

//Create ERC20 tokens
export const useCreateERC20 = (
  name: string,
  symbol: string,
  initialSupply: Number,
  description: string,
  decimals: Number
) => {
  const { chainId, address } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  //   const { toast } = useToast();

  return useCallback(async () => {
    if (!isSupportedChain(chainId)) return console.error("Wrong network");

    const readWriteProvider = getProvider(walletProvider);
    const signer = readWriteProvider ? await readWriteProvider.getSigner() : null;

    const contract = getFactoryContract(signer);

    try {
      console.log(name);

      const transaction = await contract.createFungibleToken(name, symbol, initialSupply, description, decimals);

      console.log("transaction: ", transaction);
      const receipt = await transaction.wait();

      console.log("receipt: ", receipt);

    } catch (error) {
      console.error("error: ", error);
    }
  }, [chainId, walletProvider]);
};


//Get all ERC20 Tokens
export const useGetAllERC20 = () => {
  const { address } = useWeb3ModalAccount();
  const contract = getFactoryContract(readOnlyProvider);
  const { walletProvider } = useWeb3ModalProvider();
  const readWriteProvider = getProvider(walletProvider);

  const [tokens, setTokens] = useState({
    loading: true,
    data: [],
  });

  const getTokens = () => {
    contract
      .getCreatedFungibleTokenByAddress(address)
      .then((res) => {
        const converted = res.map((token: any) => ({
          name: token.name,
          symbol: token.symbol,
          supply: token.totalSupply,
          description: token.description,
          address: token.contractAdd,
          decimals: token.decimals
        }));
        setTokens({
          loading: false,
          data: converted,
        });
      })
      .catch((err) => {
        console.error("error fetching proposals: ", err);
        setTokens((prev) => ({ ...prev, loading: false }));
      });
  };

  // useEffect(() => {
  //   const fetchTokens = async () => {
  //     const filter = {
  //       address: process.env.NEXT_PUBLIC_FACTORY_ADDRESS,
  //       topics: [ethers.id("FungibleTokenCreated(address,address)")],
  //     };

  //     try {
  //       const events = await readOnlyProvider
  //         .getLogs({
  //           ...filter,
  //           fromBlock: 5726200,
  //         })
  //         .then((events) => {
  //           getTokens();
  //         });
  //     } catch (error) {
  //       console.error("Error fetching logs: ", error);
  //     }

  //     contract.on("FungibleTokenCreated", getTokens);

  //     // Cleanup function
  //     return () => contract.off("FungibleTokenCreated", getTokens);
  //   };

  //   fetchTokens();
  // }, []);

  return tokens;
};



export const useBadgerProtocol = () => {
  const { address } = useWeb3ModalAccount();
  const contract = getFactoryContract(readOnlyProvider);
  const { walletProvider } = useWeb3ModalProvider();
  const readWriteProvider = getProvider(walletProvider);

  const [tokens, setTokens] = useState<{ loading: boolean, data: any }>({
    loading: true,
    data: [],
  });

  const getUserTokens = async () => {
    try {
      const _addresses = await contract.getCreatorAddresses(address);
      console.log(_addresses);
      const _tokens = await Promise.all(_addresses.map(async (_address: Addressable) => {
        const _data = await contract.getContractDetails(_address);
        // console.log(_data);
        return { _creator: _data._creator, _name: _data._name, _abi: _data._abi, _type: _data._type, _sourceCode: _data._sourceCode, _createdAt: _data._createdAt, _contract: _address }
      }));
      console.log(_tokens);
      setTokens({
        loading: false,
        data: _tokens
      })
    } catch (error: any) {
      console.log(error)
    }
  }

  const addContract = async (_contractAddress: string | Addressable, _name: string, _abi: string, _type: number, _sourceCode: string) => {
    _abi = solidityPacked(['string'], [_abi]);
    _sourceCode = solidityPacked(['string'], [_sourceCode]);


    const readWriteProvider = getProvider(walletProvider);
    const signer = readWriteProvider ? await readWriteProvider.getSigner() : null;

    const contract = getFactoryContract(signer);

    try {
      const transaction = await contract.addContract(_contractAddress, _name, _abi, _type, _sourceCode);
      console.log("transaction: ", transaction);
      const receipt = await transaction.wait();

      console.log("receipt: ", receipt);
    } catch (error: any) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchTokens = async () => {
      // const filter = {
      //   address: process.env.NEXT_PUBLIC_FACTORY_ADDRESS,
      //   topics: [ethers.id("NewContractAdded(address,address,uint8)")],
      // };

      try {
        // const events = await readOnlyProvider
        //   .getLogs({
        //     ...filter,
        //     fromBlock: 5726200,
        //   })
        //   .then((events) => {
        await getUserTokens();
        // });
      } catch (error) {
        console.error("Error fetching logs: ", error);
      }

      contract.on("NewContractAdded", getUserTokens);

      // Cleanup function
      return () => contract.off("NewContractAdded", getUserTokens);
    };

    fetchTokens();
  }, []);
  return { addContract, tokens }
}