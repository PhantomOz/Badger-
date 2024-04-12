"use client";

import { useState } from "react";

// import { ContractIds } from '@/deployments/deployments'
// import TokenContract from '@inkathon/contracts/typed-contracts/contracts/my_psp'
// import { AccountId } from '@inkathon/contracts/typed-contracts/types-arguments/factory_contract'
// import { useContract, useInkathon, useRegisteredTypedContract } from '@scio-labs/use-inkathon'
import toast from "react-hot-toast";

// import { contractTxWithToast } from '@/utils/contract-tx-with-toast'

import { ExplorerFunctions } from "./ExplorerFunctions";

export const Explorer = ({ metadata }: { metadata: any }) => {
  const [tab, setTab] = useState(0);
  const [currentFunction, setCurrentFunction] = useState("");
  const handleSetCurrentFunction = (id: string) => {
    setCurrentFunction(id)
  }

  const handleBalanceOf = async (address: string): Promise<number> => {
    return 1;
  };

  const handleAllowance = async (
    who: string,
    spender: string
  ): Promise<number> => {
    // if (!metadata?.address) return 0
    // const result = await tokenAddress.typedContract
    //   ?.withAddress(`${metadata?.address}`)
    //   .query.allowance(who as AccountId, spender as AccountId)
    // console.log(result)
    // return Number(result?.value.ok)
    return 1;
  };

  const handleTransfer = async (
    to: string,
    value: string,
    data: []
  ): Promise<boolean> => {
    return true;
  };

  const handleTransferFrom = async (
    from: string,
    to: string,
    value: string,
    data: []
  ): Promise<boolean> => {
    return true;
  };

  const handleApproval = async (
    spender: string,
    value: string
  ): Promise<boolean> => {
    return true;
  };

  return (
    <>
      <h2 className="mb-2 text-2xl font-bold">Explorer</h2>
      <div className="explorer mt-6  flex gap-8">
        <div className="w-1/3 rounded border border-gray-600 ">
          <div className="flex w-full border-b border-gray-400  text-gray-200">
            <span
              className={`w-1/2 cursor-pointer px-4 py-2 text-center  font-bold ${
                tab === 0 ? "border-b-2 border-gray-300" : "border-0"
              }`}
              onClick={() => {
                setTab(0);
              }}
            >
              Write
            </span>
            <span
              className={`w-1/2 cursor-pointer px-4 py-2 text-center font-bold ${
                tab === 1 ? "border-b-2 border-gray-300" : "border-0"
              }`}
              onClick={() => {
                setTab(1);
              }}
            >
              Read
            </span>
          </div>

          {/* Functions */}
          <div
            className={`section px-6 py-4 text-gray-500 ${
              tab === 0 ? "block" : "hidden"
            }`}
          >
            <p className="mb-2 border-b border-gray-800 pb-2 font-semibold text-gray-300">
              Functions
            </p>
            <p
              // className="mb-2 cursor-pointer font-mono font-semibold"
              className={`mb-2 cursor-pointer font-mono font-semibold ${
                currentFunction === "transfer" ? "text-gray-200" : ""
              }`}
              id="transfer"
              onClick={(e) => {
                handleSetCurrentFunction("transfer");
              }}
            >
              transfer
            </p>
            <p
              className={`mb-2 cursor-pointer font-mono font-semibold ${
                currentFunction === "approval" ? "text-gray-200" : ""
              }`}
              onClick={(e) => {
                handleSetCurrentFunction("approval");
              }}
            >
              approval
            </p>
            <p
              className={`mb-2 cursor-pointer font-mono font-semibold ${
                currentFunction === "transferFrom" ? "text-gray-200" : ""
              }`}
              onClick={(e) => {
                handleSetCurrentFunction("transferFrom");
              }}
            >
              transferFrom
            </p>
          </div>

          <div
            className={`section px-6 py-4 text-gray-500 ${
              tab === 1 ? "block" : "hidden"
            }`}
          >
            <p className="mb-2 border-b border-gray-800 pb-2 font-semibold text-gray-300">
              Functions
            </p>
            <p
              className={`mb-2 cursor-pointer font-mono font-semibold ${
                currentFunction === "allowance" ? "text-gray-200" : ""
              }`}
              onClick={(e) => {
                handleSetCurrentFunction("allowance");
              }}
            >
              allowance
            </p>
            <p
              className={`mb-2 cursor-pointer font-mono font-semibold ${
                currentFunction === "balanceOf" ? "text-gray-200" : ""
              }`}
              onClick={(e) => {
                handleSetCurrentFunction("balanceOf");
              }}
            >
              balanceOf
            </p>
            <p
              className={`mb-2 cursor-pointer font-mono font-semibold ${
                currentFunction === "totalSupply" ? "text-gray-200" : ""
              }`}
              onClick={(e) => {
                handleSetCurrentFunction("totalSupply");
              }}
            >
              totalSupply
            </p>
            <p
              className={`mb-2 cursor-pointer font-mono font-semibold ${
                currentFunction === "decimals" ? "text-gray-200" : ""
              }`}
              onClick={(e) => {
                handleSetCurrentFunction("decimals");
              }}
            >
              decimals
            </p>
            <p
              className={`mb-2 cursor-pointer font-mono font-semibold ${
                currentFunction === "name" ? "text-gray-200" : ""
              }`}
              onClick={(e) => {
                handleSetCurrentFunction("name");
              }}
            >
              name
            </p>
            <p
              className={`mb-2 cursor-pointer font-mono font-semibold ${
                currentFunction === "symbol" ? "text-gray-200" : ""
              }`}
              onClick={(e) => {
                handleSetCurrentFunction("symbol");
              }}
            >
              symbol
            </p>
          </div>
        </div>

        <div className="w-full rounded border border-gray-600 px-8">
          {/* <div className="flex w-full">
            <span className="w-1/2 text-center">Write</span>
            <span className="w-1/2 text-center">Read</span>
          </div> */}
          <div className="section px-6 py-4 text-gray-500">
            <p className="mb-2 border-b border-gray-800 pb-2 text-2xl font-bold capitalize text-gray-300">
              {currentFunction || "No Method Selected"}
            </p>
            <small></small>
            {currentFunction === "transfer" ? (
              <ExplorerFunctions to value handleTransfer={handleTransfer} />
            ) : currentFunction === "approval" ? (
              <ExplorerFunctions
                spender
                value
                handleApproval={handleApproval}
              />
            ) : currentFunction === "transferFrom" ? (
              <ExplorerFunctions
                from
                to
                value
                handleTransferFrom={handleTransferFrom}
              />
            ) : currentFunction === "allowance" ? (
              <ExplorerFunctions
                owner
                spender
                handleAllowance={handleAllowance}
              />
            ) : currentFunction === "balanceOf" ? (
              <ExplorerFunctions who handleBalanceOf={handleBalanceOf} />
            ) : currentFunction === "totalSupply" ? (
              <ExplorerFunctions
                view={"totalSupply"}
                viewValue={metadata?.supply?.toString()}
              />
            ) : currentFunction === "decimals" ? (
              <ExplorerFunctions
                view={"decimals"}
                viewValue={Number(metadata?.decimal).toString()}
              />
            ) : currentFunction === "name" ? (
              <ExplorerFunctions view={"name"} viewValue={metadata?.name} />
            ) : currentFunction === "symbol" ? (
              <ExplorerFunctions view={"symbol"} viewValue={metadata?.symbol} />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};
