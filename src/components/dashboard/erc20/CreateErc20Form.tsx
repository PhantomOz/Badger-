import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CodeBlock, dracula } from 'react-code-blocks';

import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { getProvider } from "@/constants/providers";
import { getFactoryContract } from "@/constants/contracts";
import { generateCode } from "@/utils";
import RadioContainer from "@/components/ui/radio";
import RadioItem from "@/components/ui/radioitem";

const CreateErc20Form = ({ onSubmit }: { onSubmit?: () => void }) => {
  const { walletProvider } = useWeb3ModalProvider();

  const readWriteProvider = getProvider(walletProvider);

  const [loading, setLoading] = useState(false);

  const [inputValues, setInputValues] = useState({
    name: "MyToken",
    symbol: "MTK",
    premint: 0,
    decimal: 18,
    mintable: false,
    burnable: false,
    pausable: false,
    permit: false,
    'flash minting': true,
  });

  const [contract, setContract] = useState("");


  useEffect(() => {
    setContract(generateCode(inputValues));
  }, [inputValues]);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  async function createToken() {
    setLoading(true)
    const signer = readWriteProvider ? await readWriteProvider.getSigner() : null;

    // const signer = await readWriteProvider.getSigner();

    const contract = getFactoryContract(signer);
    try {
      const transaction = await contract.createFungibleToken(
        inputValues.name,
        inputValues.symbol,
        inputValues.premint,
        // inputValues.description,
        inputValues.decimal
      );

      console.log("transaction: ", transaction);
      const receipt = await transaction.wait();

      console.log("receipt: ", receipt);
      if (receipt.status === 1 && onSubmit) {
        onSubmit();
      }
      setLoading(false)

    } catch (error) {
      console.error("error: ", error);
    }
  }
  // console.log(response);

  return (
    <DialogContent className="sm:max-w-[425px] md:max-w-[100%]">
      <DialogHeader>
        <DialogTitle>Create Token</DialogTitle>
        <DialogDescription>
          {/* Make changes to your profile here. Click save when you are done. */}
          Parameters the contract specifies to be passed in during deployment.
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-row items-stretch gap-2 overflow-y-auto">
        <div className=" py-4">
          <div className="mb-5 items-center gap-4">
            <Label htmlFor="name" className=" text-right">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              onChange={handleInputChange}
              className="mt-2"
              value={inputValues.name}
            />
          </div>
          <div className="mb-5 items-center gap-4">
            <Label htmlFor="symbol" className="text-right">
              Symbol
            </Label>
            <Input
              id="symbol"
              name="symbol"
              onChange={handleInputChange}
              className="mt-2"
              value={inputValues.symbol}
            />
          </div>
          <div className="mb-5 items-center gap-4">
            <Label htmlFor="symbol" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              name="description"
              onChange={handleInputChange}
              className="mt-2"
            />
          </div>

          <div className="mb-5 items-center gap-4">
            <Label htmlFor="symbol" className="text-right">
              Supply
            </Label>
            <Input
              id="supply"
              name="premint"
              onChange={handleInputChange}
              className="mt-2"
              value={inputValues.premint}
            />
          </div>

          <div className="mb-5 items-center gap-4">
            <Label htmlFor="symbol" className="text-right">
              Decimal
            </Label>
            <Input
              id="decimal"
              name="decimal"
              value={inputValues.decimal}
              onChange={handleInputChange}
              className="mt-2"
            />
          </div>
          <hr className="h-5" />
          <p>Features</p>
          <RadioContainer className="flex flex-col gap-2.5">
            <div className="flex items-center">
              <RadioItem value="Block Number" id='r1' />
              <Label htmlFor="r1">Block Number</Label>
            </div>
          </RadioContainer>
        </div>
        {/* Display Codes Here */}
        <div className="w-[100%] relative">
          <CodeBlock
            text={contract}
            language={'solidity'}
            showLineNumbers={false}
            theme={dracula}
            customStyle={{ height: '100%', position: 'absolute', left: '0', top: '0', width: '100%' }}
          />
        </div>
      </div>

      <DialogFooter>
        <Button
          type="submit"
          onClick={() => {
            createToken();
          }}
          disabled={loading}
        >
          {loading ? "Loading..." : "Deploy"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default CreateErc20Form;
