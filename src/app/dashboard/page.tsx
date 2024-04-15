"use client";

import { useState } from "react";

// import { NFTsComponent } from '../components/dashboard/NFTsComponent'
// import { TokensComponent } from '../components/dashboard/TokensCOmponent'
// import { OverviewComponent } from '../components/dashboard/overview'
import { NavBar } from "@/components/shared/nav-bar";
import DashboardTabNavigation from "@/components/dashboard/DashboardNav";
import { OverviewComponent } from "@/components/dashboard/dashboardTabs/overview";
import { TokenOverview } from "@/components/dashboard/erc20/TokenOverview";
import { NFTOverview } from "@/components/dashboard/nft/NFTOverview";

const Dashboard = () => {
  const [tab, setTab] = useState(0);

  return (
    <>
      <NavBar isDashboard={true} />
      <div className="relative mt-24">
        <DashboardTabNavigation
          tabs={[
            { id: 0, label: "Overview" },
            { id: 1, label: "Token" },
            { id: 2, label: "NFT" },
          ]}
          selectedTab={tab}
          setTab={setTab}
        />

        <div className="p-4 sm:container sm:mx-auto">
          <div>
            {tab == 0 ? <OverviewComponent/> : ''}
            {tab == 1 ? <TokenOverview /> : ''}
            {tab == 2 ? <NFTOverview /> : ''}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
