"use client";
import { ContractFactory } from "ethers";

export default async function deploy(contractJson: any, signer: any) {
  const contractAbi = contractJson.abi;
  const contractByteCode = contractJson.bytecode;

  const factory = new ContractFactory(contractAbi, contractByteCode, signer);

  // If your contract requires constructor args, you can specify them here
  console.log("------------------Deploying Contract-------------------");
  const contract = await factory.deploy();
  await contract.waitForDeployment();
  console.log(contract.target);
}
