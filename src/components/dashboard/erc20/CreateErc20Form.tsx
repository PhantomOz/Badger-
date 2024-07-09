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
import CheckBox from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { compile, verifyContract } from "@/context";
import deploy from "@/context/deploy";
import InputComp from "@/components/ui/inputcomp";
import CheckBoxComp from "@/components/ui/checkboxcomp";
import Section from "@/components/ui/section";
import RadioComp from "@/components/ui/radiocomp";

interface erc20InputValues {
  name: string,
  symbol: string,
  premint: number,
  decimal: number,
  description: string,
  mintable: boolean | string | CheckedState,
  burnable: boolean | string | CheckedState,
  pausable: boolean | string | CheckedState,
  permit: boolean | string | CheckedState,
  flashmint: boolean | string | CheckedState,
  votes: boolean | string | CheckedState,
  access: boolean | string,
  upgradeable: boolean | string
}
const CreateErc20Form = ({ onSubmit }: { onSubmit?: () => void }) => {
  const { walletProvider } = useWeb3ModalProvider();

  const readWriteProvider = getProvider(walletProvider);

  const [loading, setLoading] = useState(false);

  const [inputValues, setInputValues] = useState<erc20InputValues>({
    name: "MyToken",
    symbol: "MTK",
    premint: 0,
    decimal: 18,
    description: '',
    mintable: false,
    burnable: false,
    pausable: false,
    permit: false,
    flashmint: false,
    votes: false,
    access: false,
    upgradeable: false
  });

  const [contract, setContract] = useState("");


  useEffect(() => {
    setContract(generateCode(inputValues));
  }, [inputValues]);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    console.log(name, value);
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleCheckChange = (name: string, value: boolean | string) => {
    if (name === 'mintable' || name === 'pausable') {
      setInputValues({ ...inputValues, [name]: value, access: 'ownable' });
    } else {
      setInputValues({ ...inputValues, [name]: value });
    }
  }

  async function createToken() {
    setLoading(true)
    const signer = readWriteProvider ? await readWriteProvider.getSigner() : null;

    // const signer = await readWriteProvider.getSigner();

    // const contract = getFactoryContract(signer);
    try {
      // const transaction = await contract.createFungibleToken(
      //   inputValues.name,
      //   inputValues.symbol,
      //   inputValues.premint,
      //   inputValues.description,
      //   inputValues.decimal
      // );

      // console.log("transaction: ", transaction);
      // const receipt = await transaction.wait();

      // console.log("receipt: ", receipt);
      // if (receipt.status === 1 && onSubmit) {
      //   onSubmit();
      // }
      const compiledContract = await compile(contract, inputValues.name);
      const contractAddress = await deploy(JSON.parse(compiledContract), signer);
      await verifyContract(contractAddress, contract, JSON.parse(compiledContract).contractName, '')
      setLoading(false)
    } catch (error) {
      console.error("error: ", error);
      setLoading(false)
    }
  }
  // console.log(response);

  return (
    <DialogContent className="sm:max-w-[425px] md:max-w-[90%]">
      <DialogHeader>
        <DialogTitle>Create Token</DialogTitle>
        <DialogDescription>
          {/* Make changes to your profile here. Click save when you are done. */}
          Parameters the contract specifies to be passed in during deployment.
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-row items-stretch gap-2 ">
        <div className=" py-4 mx-5 max-h-[500px] overflow-y-auto h-fit">
          <InputComp label="name" handleOnchange={handleInputChange} value={inputValues.name} />
          <InputComp label="symbol" handleOnchange={handleInputChange} value={inputValues.symbol} />
          <InputComp label="description" handleOnchange={handleInputChange} value={inputValues.description} />
          <InputComp label="premint" handleOnchange={handleInputChange} value={inputValues.premint} />
          <InputComp label="decimal" handleOnchange={handleInputChange} value={inputValues.decimal} />

          <Section title="features">
            <CheckBoxComp label="mintable" handleOnchange={handleCheckChange} value={inputValues.mintable} />
            <CheckBoxComp label="burnable" handleOnchange={handleCheckChange} value={inputValues.burnable} />
            <CheckBoxComp label="permit" handleOnchange={handleCheckChange} value={inputValues.permit} />
            <CheckBoxComp label="pausable" handleOnchange={handleCheckChange} value={inputValues.pausable} />
            <CheckBoxComp label="flashmint" handleOnchange={handleCheckChange} value={inputValues.flashmint} />
          </Section>

          <Section title="votes" checkbox={true} value={inputValues.votes} label="votes" handleOnchange={handleCheckChange}>
            <RadioContainer value={inputValues.votes as string} onValueChange={(e) => handleCheckChange('votes', e)} className="flex flex-col gap-2.5">
              <RadioComp label="Block Number" value="Block Number" />
              <RadioComp label="Time Stamp" value="Time Stamp" />
            </RadioContainer>
          </Section>

          <Section title="access control" checkbox={true} label="access" value={inputValues.access} handleOnchange={handleCheckChange} disabled={inputValues.mintable as boolean || inputValues.pausable as boolean || inputValues.upgradeable === "uups"}>
            <RadioContainer value={inputValues.access as string} onValueChange={(e) => handleCheckChange('access', e)} className="flex flex-col gap-2.5">
              <RadioComp label="Ownable" value="ownable" />
              <RadioComp label="Roles" value="roles" />
              <RadioComp label="Managed" value="managed" />
            </RadioContainer>
          </Section>

          <Section title="upgradability" checkbox={true} value={inputValues.upgradeable} label="upgradeable" handleOnchange={handleCheckChange}>
            <RadioContainer value={inputValues.upgradeable as string} onValueChange={(e) => handleCheckChange('upgradeable', e)} className="flex flex-col gap-2.5">
              <RadioComp label="Transparent" value="transparent" />
              <RadioComp label="UUPS" value="uups" />
            </RadioContainer>
          </Section>

        </div>
        {/* Display Codes Here */}
        <div className="w-[100%] relative max-h-[500px]">
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
