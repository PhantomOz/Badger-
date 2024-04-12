"use client";

import { useEffect, useState } from "react";

// import ContractDetails from '@/app/components/dashboard/contracts/ContractInfo'

import { NavBar } from "@/components/shared/nav-bar";
import ContractOverviewNav from "@/components/contracts/ContractOverviewNav";
import { ContractOverview } from "@/components/contracts/ContractOverview";
import { Explorer } from "@/components/contracts/Explorer";

const SingleContract = ({ params }: { params: { id: string } }) => {
  const [tab, setTab] = useState(0);
  const [tokenMedata, setTokenMetadata] = useState<any>({});

  return (
    <>
      <NavBar isDashboard={true} />
      <div className="relative mt-24">
        <ContractOverviewNav tab={tab} setTab={setTab} />
        {/* <ContractDetails
          name={tokenMedata?.name}
          description={tokenMedata?.description}
          address={tokenMedata?.address}
        /> */}

        <div className="p-4 sm:container sm:mx-auto">
          <div>
            {tab == 0 ? (
              <ContractOverview
                supply={tokenMedata?.supply?.toString()}
                symbol={tokenMedata?.symbol}
                decimal={Number(tokenMedata?.decimal)}
                userBalance={Number(tokenMedata?.userBalance)}
                name={tokenMedata?.name}
                address={tokenMedata?.address}
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
            {tab == 2 ? (
              <div className="mt-2">
                <h2 className="mb-4 text-2xl font-bold">Permissions</h2>
                <div className="relative overflow-x-auto rounded">
                  <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Member
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Roles
                        </th>
                        <th scope="col" className="px-6 py-3"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                        <td
                          scope="col"
                          className="cursor-pointer whitespace-nowrap px-6 py-4 font-medium"
                        >
                          0xe2ac869...02254E
                        </td>
                        <td scope="col" className="px-6 py-4">
                          <div className="flex">
                            <div className="mr-2 w-fit rounded border border-gray-500 px-2 py-1 font-sans text-xs font-semibold  text-gray-400 no-underline focus:outline-none">
                              Member
                            </div>

                            <div className="mr-2 w-fit rounded border border-gray-500 px-2 py-1 font-sans text-xs font-semibold  text-gray-400 no-underline focus:outline-none">
                              Owner
                            </div>
                          </div>
                        </td>
                        <td scope="col" className="px-6 py-4"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              ""
            )}
            {tab == 3 ? <Explorer metadata={tokenMedata} /> : ""}
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleContract;
