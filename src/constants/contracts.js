import { ethers } from "ethers";
import Abi from "./abi.json";

export const getFactoryContract = (providerOrSigner) =>
    new ethers.Contract(
        process.env.NEXT_PUBLIC_FACTORY_ADDRESS,
        Abi,
        providerOrSigner
    );