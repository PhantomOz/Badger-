import { SUPPORTED_CHAIN } from "../connection";
import { erc20 } from "@openzeppelin/wizard";

export const isSupportedChain = (chainId) =>
  Number(chainId) === SUPPORTED_CHAIN;

export const generateCode = (props) => erc20.print(props);
