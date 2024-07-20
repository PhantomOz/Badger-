"use server";
import axios from "axios";
import { Addressable, solidityPacked } from "ethers";

export async function compile(contract: string, name: string): Promise<string> {
  "use server";
  name = name.replaceAll(" ", "");
  try {
    const compiledContract = await axios.post(
      "https://badger-backend.onrender.com/v1/api/contract/compile",
      {
        name: name,
        contract: solidityPacked(["string"], [contract]),
      }
    );
    const res = await compiledContract.data;
    console.log(res);
    return res.data;
  } catch (e: any) {
    console.log(e);
  }

  return "";
}

export async function verifyContract(
  contractAddress: string | Addressable,
  contractSourceCode: string,
  contractName: string,
  constructorArguments?: string[]
): Promise<string> {
  "use server";
  try {
    const verifiedContract = await axios.post(
      "https://badger-backend.onrender.com/v1/api/contract/verify",
      {
        contractAddress,
        contractName,
        contractSourceCode: solidityPacked(["string"], [contractSourceCode]),
        constructorArguments,
      }
    );
    const res = await verifiedContract.data;
    console.log(res);
    return res;
  } catch (e: any) {
    console.log(e);
  }
  return "";
}
