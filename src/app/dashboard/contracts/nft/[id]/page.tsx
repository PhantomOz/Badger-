"use client";

import { useState } from "react";

import ContractDetails from '@/components/contracts/ContractInfo'

import { NavBar } from "@/components/shared/nav-bar";
import ContractOverviewNav from "@/components/contracts/ContractOverviewNav";
import { ContractOverview } from "@/components/contracts/ContractOverview";
import { GetBalanceOfNFT, GetNFTUri, useGetSingleNFT } from "@/hooks/useGetSingleTokens";
import { NFTContractOverview } from "@/components/contracts/NFTContractOverview";
import { ExplorerFunctions } from "@/components/contracts/nft/ExplorerFunctions";
import { Explorer } from "@/components/contracts/nft/Explorer";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import EmptyPage from "@/components/shared/EmptyPage";

const SingleContract = ({ params }: { params: { id: string } }) => {
  const [tab, setTab] = useState(0);
  const { isConnected } = useWeb3ModalAccount();

  const selectedToken = useGetSingleNFT(params.id);

const balanceOf = GetBalanceOfNFT(params.id)
const uri = GetNFTUri(params.id);

  return (
    <>
      <NavBar isDashboard={true} />
      {isConnected ? (
      <div className="relative mt-24">
        <ContractOverviewNav tab={tab} setTab={setTab} />
        <ContractDetails
          name={selectedToken?.name}
          description={selectedToken?.description}
          address={selectedToken?.address}
          uriHash={uri}
        />

        <div className="p-4 sm:container sm:mx-auto">
          <div>
            {tab == 0 ? (
              <NFTContractOverview
                supply={selectedToken?.supply?.toString()}
                symbol={selectedToken?.symbol}
                userBalance={Number(balanceOf)}
                name={selectedToken?.name}
                address={selectedToken?.address}
              />
            ) : (
              ""
            )}
            {tab == 1 ? (
              <div className="mt-2">
                <div className="flex justify-between">
                  <h2 className="mb-4 text-2xl font-bold">Events</h2>
                  <p>View all</p>
                </div>
                <div className="relative overflow-x-auto rounded">
                  <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Transaction Hash
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Events
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Block Number
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                        <th
                          scope="row"
                          className="cursor-pointer whitespace-nowrap px-6 py-4 font-medium"
                        >
                          JeffToken
                        </th>
                        <td scope="row" className="px-6 py-4">
                          Mint
                        </td>
                        <td scope="row" className="px-6 py-4">
                          1FRMM...hV24fg
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              ""
            )}

            {tab == 3 ? <Explorer metadata={selectedToken}/> : ""}
          </div>
        </div>
      </div>
      ) : (
        <EmptyPage />
      )}
    </>
  );
};

export default SingleContract;
