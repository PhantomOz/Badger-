"use client";

import { useState } from "react";

import ContractDetails from "@/components/contracts/ContractInfo";

import { NavBar } from "@/components/shared/nav-bar";
import ContractOverviewNav from "@/components/contracts/ContractOverviewNav";
import { ContractOverview } from "@/components/contracts/ContractOverview";
import { Explorer } from "@/components/contracts/Explorer";
import { useGetSingleERC20 } from "@/hooks/useGetSingleTokens";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import EmptyPage from "@/components/shared/EmptyPage";
import { getLogs } from "@/hooks/useGetERC20Events";
import EventTable from "@/components/contracts/ERC20Event";

const SingleContract = ({ params }: { params: { id: string } }) => {
  const { isConnected } = useWeb3ModalAccount();

  const [tab, setTab] = useState(0);

  const selectedToken = useGetSingleERC20(params.id);

  const logs = getLogs(params.id);
  // console.log(logs);

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
          />

          <div className="p-4 sm:container sm:mx-auto">
            <div>
              {tab == 0 ? (
                <ContractOverview
                  supply={selectedToken?.supply?.toString()}
                  symbol={selectedToken?.symbol}
                  decimal={Number(selectedToken?.decimals)}
                  userBalance={Number(selectedToken?.userBalance)}
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
              {tab == 2 ? <Explorer metadata={selectedToken} /> : ""}
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
