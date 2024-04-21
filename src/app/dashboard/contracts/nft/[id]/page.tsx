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
import EventTable from "@/components/contracts/ERC721Event";
import { getLogs } from "@/hooks/useGetERC721Events";

const SingleContract = ({ params }: { params: { id: string } }) => {
  const [tab, setTab] = useState(0);
  const { isConnected } = useWeb3ModalAccount();

  const selectedToken = useGetSingleNFT(params.id);

const balanceOf = GetBalanceOfNFT(params.id)
const uri = GetNFTUri(params.id);
// console.log(params.id);
const logs = getLogs(params.id);


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
                logs={logs}
              />
            ) : (
              ""
            )}
            {tab == 1 ? (
              <EventTable logs={logs} address={params.id}/>
            ) : (
              ""
            )}

            {tab == 2? <Explorer metadata={selectedToken}/> : ""}
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
