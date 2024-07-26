import React, { useState } from "react";
import InfoCard from "../shared/InfoCard";
import { TokenOverview } from "../erc20/TokenOverview";
import { NFTOverview } from "../nft/NFTOverview";

import { useBadgerProtocol } from "@/hooks/useERC20Factory";
import NoToken from "../NoTokens";
import { useGetAllERC721 } from "@/hooks/useERC721Factory";

export function OverviewComponent({ tokens }: { tokens: any }) {
  const [contractCreated, setContractCreated] = useState(false);


  const { loading, data } = tokens;
  const { loading: loadingnft, nfts } = useGetAllERC721();


  // console.log(data);

  return (
    <div className="mt-14 rounded-lg  border-dashed border-gray-200 p-8  dark:border-gray-700">
      {data.length < 1 ? (
        <div>
          <NoToken />
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold lg:text-3xl">Overview</h2>

          <div className="mt-4 flex">
            <InfoCard title="Contracts Deployed" content={data.length + nfts.length} />
            <InfoCard title="Tokens Deployed" content={data.length} />
            <InfoCard title="NFTs Deployed" content={nfts.length} />
          </div>

          <TokenOverview fullPage={false} tokens={tokens} />
          <NFTOverview fullPage={false} tokens={tokens} />
          {/* <NFTOverview /> */}
        </div>
      )}
      {/* {!contractCreated && (
        <div className="mt-4 text-red-500">
          No account found. Please create an account.
        </div>
      )} */}
    </div>
  );
}
