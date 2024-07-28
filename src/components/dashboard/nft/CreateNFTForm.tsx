import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CodeBlock, dracula } from "react-code-blocks";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { getProvider } from "@/constants/providers";
import { generateErc721Code, validateInputs } from "@/utils";
import { compile, verifyContract } from "@/context";
import deploy from "@/context/deploy";
import InputComp from "@/components/ui/inputcomp";
import CheckBoxComp from "@/components/ui/checkboxcomp";
import Section from "@/components/ui/section";
import RadioComp from "@/components/ui/radiocomp";
import { useBadgerProtocol } from "@/hooks/useBadgerProtocol";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { StatusComponent } from "../shared/StatusModal";
import RadioContainer from "@/components/ui/radio";

interface Erc721InputValues {
  name: string;
  symbol: string;
  description: string;
  baseUri: string;
  mintable: boolean;
  autoIncrementIds: boolean;
  burnable: boolean;
  pausable: boolean;
  enumerable: boolean;
  uriStorage: boolean;
  votes: boolean | string;
  access: boolean | string;
  upgradeable: boolean | string;
}

const CreateNftForm = ({ onSubmit }: { onSubmit?: () => void }) => {
  const { walletProvider } = useWeb3ModalProvider();
  const { address } = useWeb3ModalAccount();
  const readWriteProvider = getProvider(walletProvider);
  const { addContract } = useBadgerProtocol();

  const [loading, setLoading] = useState(false);
  const [developerMode, setDeveloperMode] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [compiling, setCompiling] = useState(false);
  const [deploying, setDeploying] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const [inputValues, setInputValues] = useState<Erc721InputValues>({
    name: "MyNFT",
    symbol: "MNFT",
    description: "",
    baseUri: "",
    mintable: true,
    autoIncrementIds: true,
    burnable: false,
    pausable: false,
    enumerable: false,
    uriStorage: false,
    votes: false,
    access: false,
    upgradeable: false,
  });

  const [contractArguments, setContractArguments] = useState<any>({
    ownable: {
      initialOwner: address,
    },
    roles: {
      defaultAdmin: address,
      pauser: address,
      minter: address,
      upgrader: address,
    },
    managed: {
      initialAuthority: address,
    },
  });

  const [contract, setContract] = useState("");

  useEffect(() => {
    setContract(generateErc721Code(inputValues));
  }, [inputValues]);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleCheckChange = (name: string, value: boolean | string) => {
    if (
      (name === "mintable" || name === "pausable" || value === "uups") &&
      inputValues.access === false
    ) {
      setInputValues({ ...inputValues, [name]: value, access: "ownable" });
    } else {
      setInputValues({ ...inputValues, [name]: value });
    }
  };

  const handleContractArgumentChange = (event: any) => {
    const { name, value } = event.target;
    setContractArguments({
      ...contractArguments,
      [inputValues.access as string]: {
        ...contractArguments[inputValues.access as string],
        [name]: value,
      },
    });
  };

  const generateContractArgs = (): string[] => {
    if (inputValues.access === "ownable" && !inputValues.upgradeable) {
      return [contractArguments[inputValues.access as string].initialOwner];
    }
    if (inputValues.access === "managed" && !inputValues.upgradeable) {
      return [contractArguments[inputValues.access as string].initialAuthority];
    }
    if (inputValues.access === "roles" && !inputValues.upgradeable) {
      const args = [];
      args.push(contractArguments[inputValues.access as string].defaultAdmin);
      inputValues.pausable &&
        args.push(contractArguments[inputValues.access as string].pauser);
      inputValues.mintable &&
        args.push(contractArguments[inputValues.access as string].minter);
      inputValues.upgradeable === "uups" &&
        args.push(contractArguments[inputValues.access as string].upgrader);
      return args;
    }
    return [];
  };

  async function createNFT() {
    setLoading(true);
    setOpenStatusModal(true);
    const signer = readWriteProvider
      ? await readWriteProvider.getSigner()
      : null;
    try {
      const args = generateContractArgs();
      const { compiling, result } = await compile(contract, inputValues.name);

      setCompiling(compiling);

      const { deploying, contractAddress } = await deploy(
        JSON.parse(result),
        signer,
        args
      );
      setDeploying(deploying);
      await addContract(
        contractAddress,
        inputValues.name,
        JSON.stringify(JSON.parse(result).abi),
        0,
        contract
      );
      const { verifying } = await verifyContract(
        contractAddress,
        contract,
        JSON.parse(result).contractName,
        args
      );
      setVerifying(verifying);
      setLoading(false);
      setOpenStatusModal(false);
    } catch (error) {
      console.error("error: ", error);
      setLoading(false);
      setOpenStatusModal(false);
    }
  }

  const error = validateInputs(inputValues, contractArguments);

  return (
    <>
      <DialogContent
        className={`${
          developerMode ? "sm:max-w-[425px] md:max-w-[90%]" : "full"
        }`}
      >
        <DialogHeader>
          <DialogTitle>Create NFT Collection</DialogTitle>
          <DialogDescription>
            Set the parameters for your ERC721 token.
          </DialogDescription>
        </DialogHeader>
        <div
          className={`${
            developerMode ? "flex flex-row items-stretch gap-2" : ""
          }`}
        >
          <div className="py-4 mx-5 max-h-[500px] overflow-y-auto h-fit">
            <InputComp
              label="name"
              handleOnchange={handleInputChange}
              value={inputValues.name}
            />
            <InputComp
              label="symbol"
              handleOnchange={handleInputChange}
              value={inputValues.symbol}
            />
            <InputComp
              label="description"
              handleOnchange={handleInputChange}
              value={inputValues.description}
            />
            <InputComp
              label="baseUri"
              handleOnchange={handleInputChange}
              value={inputValues.baseUri}
            />

            <Section title="features">
              <CheckBoxComp
                label="mintable"
                handleOnchange={handleCheckChange}
                value={inputValues.mintable}
              />
              <CheckBoxComp
                label="autoIncrementIds"
                handleOnchange={handleCheckChange}
                value={inputValues.autoIncrementIds}
              />
              <CheckBoxComp
                label="burnable"
                handleOnchange={handleCheckChange}
                value={inputValues.burnable}
              />
              <CheckBoxComp
                label="pausable"
                handleOnchange={handleCheckChange}
                value={inputValues.pausable}
              />
              <CheckBoxComp
                label="enumerable"
                handleOnchange={handleCheckChange}
                value={inputValues.enumerable}
              />
              <CheckBoxComp
                label="uriStorage"
                handleOnchange={handleCheckChange}
                value={inputValues.uriStorage}
              />
            </Section>

            <Section title="Advanced Options">
              <CheckBoxComp
                label="Show Advanced Options"
                handleOnchange={() => {
                  setShowAdvanced(!showAdvanced);
                }}
                value={showAdvanced}
              />
              <div className={`${showAdvanced ? "block" : "hidden"}`}>
                <Section
                  title="votes"
                  checkbox={true}
                  value={inputValues.votes}
                  label="votes"
                  handleOnchange={handleCheckChange}
                >
                  <RadioContainer
                    value={inputValues.votes as string}
                    onValueChange={(e) => handleCheckChange("votes", e)}
                    className="flex flex-col gap-2.5"
                  >
                    <RadioComp label="Block Number" value="Block Number" />
                    <RadioComp label="Time Stamp" value="Time Stamp" />
                  </RadioContainer>
                </Section>

                <Section
                  title="access control"
                  checkbox={true}
                  label="access"
                  value={inputValues.access}
                  handleOnchange={handleCheckChange}
                  disabled={
                    (inputValues.mintable as boolean) ||
                    (inputValues.pausable as boolean) ||
                    inputValues.upgradeable === "uups"
                  }
                >
                  <RadioContainer
                    value={inputValues.access as string}
                    onValueChange={(e) => handleCheckChange("access", e)}
                    className="flex flex-col gap-2.5"
                  >
                    <RadioComp label="Ownable" value="ownable" />
                    {inputValues.access === "ownable" && (
                      <InputComp
                        label="initialOwner"
                        handleOnchange={handleContractArgumentChange}
                        value={contractArguments.ownable.initialOwner}
                      />
                    )}
                    <RadioComp label="Roles" value="roles" />
                    {inputValues.access === "roles" && (
                      <>
                        <InputComp
                          label="defaultAdmin"
                          handleOnchange={handleContractArgumentChange}
                          value={contractArguments.roles.defaultAdmin}
                        />
                        {inputValues.pausable && (
                          <InputComp
                            label="pauser"
                            handleOnchange={handleContractArgumentChange}
                            value={contractArguments.roles.pauser}
                          />
                        )}
                        {inputValues.mintable && (
                          <InputComp
                            label="minter"
                            handleOnchange={handleContractArgumentChange}
                            value={contractArguments.roles.minter}
                          />
                        )}
                        {inputValues.upgradeable === "uups" && (
                          <InputComp
                            label="upgrader"
                            handleOnchange={handleContractArgumentChange}
                            value={contractArguments.roles.upgrader}
                          />
                        )}
                      </>
                    )}
                    <RadioComp label="Managed" value="managed" />
                    {inputValues.access === "managed" && (
                      <InputComp
                        label="initialAuthority"
                        handleOnchange={handleContractArgumentChange}
                        value={contractArguments.managed.initialAuthority}
                      />
                    )}
                  </RadioContainer>
                </Section>

                <Section
                  title="upgradability"
                  checkbox={true}
                  value={inputValues.upgradeable}
                  label="upgradeable"
                  handleOnchange={handleCheckChange}
                >
                  <RadioContainer
                    value={inputValues.upgradeable as string}
                    onValueChange={(e) => handleCheckChange("upgradeable", e)}
                    className="flex flex-col gap-2.5"
                  >
                    <RadioComp label="Transparent" value="transparent" />
                    <RadioComp label="UUPS" value="uups" />
                  </RadioContainer>
                </Section>
              </div>
            </Section>
          </div>
          {developerMode && (
            <div className="w-[75%] relative max-h-[500px]">
              <CodeBlock
                text={contract}
                language={"solidity"}
                showLineNumbers={false}
                theme={dracula}
                customStyle={{
                  height: "100%",
                  position: "absolute",
                  left: "0",
                  top: "0",
                  width: "100%",
                }}
              />
            </div>
          )}
        </div>

        <DialogFooter className="w-full flex flex-row sm:justify-between items-center">
          <div className="flex flex-row items-center">
            <Switch
              id="developer-mode"
              checked={developerMode}
              onCheckedChange={setDeveloperMode}
              className="mr-3"
            />
            <Label htmlFor="developer-mode" className="text-xs">
              Developer Mode
            </Label>
          </div>
          <Button
            type="submit"
            onClick={createNFT}
            disabled={loading || error.length > 0}
          >
            {loading ? "Loading..." : "Deploy"}
          </Button>
        </DialogFooter>
      </DialogContent>
      {/* {openStatusModal && (
        <StatusComponent
          compiling={compiling}
          deploying={deploying}
          verifying={verifying}
        />
      )} */}
    </>
  );
};

export default CreateNftForm;
