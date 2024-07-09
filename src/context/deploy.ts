"use client";
import { ContractFactory } from "ethers";

export function objectValuesToArray(obj: any): string[] {
  return Object.values(obj);
}
export default async function deploy(
  contractJson: any,
  signer: any,
  contractArgs?: any
) {
  const contractAbi = contractJson.abi;
  const contractByteCode = contractJson.bytecode;
  const args = contractArgs;

  const factory = new ContractFactory(contractAbi, contractByteCode, signer);

  // If your contract requires constructor args, you can specify them here
  console.log("------------------Deploying Contract-------------------");
  const contract = await factory.deploy(...args);
  await contract.waitForDeployment();
  const address = contract.target;
  console.log(address);
  return address;
}
