"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

// import { Spinner } from "@/components/ui/spinner";

export function TokenTable({
  tableData,
  isLoading,
}: {
  tableData: any[];
  isLoading: boolean;
}) {
  const router = useRouter();
  return (
    <div className="relative overflow-x-auto rounded">
      {isLoading ? (
        <div className="mt-6 w-full overflow-hidden">
          {" "}
          <div className=" mx-auto h-10 w-10 "></div>
        </div>
      ) : (
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-900 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Symbol
              </th>
              <th scope="col" className="px-6 py-3 ">
                Address
              </th>
              <th scope="col" className="px-6 py-3">
                Total Supply
              </th>
            </tr>
          </thead>

          <tbody>
            {tableData?.map((data, index) => (
              <tr
                key={index}
                className="border-b dark:border-gray-70"
              >
                <th
                  scope="row"
                  className="cursor-pointer whitespace-nowrap px-6 py-4 font-medium text-purple-400 "
                  onClick={() => {
                    router.push(`/dashboard/contracts/${data?.address}`);
                  }}
                >
                  {data?.tokenName}
                </th>
                <td className="px-6 py-4">{data?.tokenSymbol}</td>
                <td className="px-6 py-4">
                  {String(data?.address).substring(0, 8)}...
                  {String(data?.address).substring(
                    String(data?.address).length - 9,
                    String(data?.address).length - 1
                  )}
                </td>
                <td className="px-6 py-4">{data?.tokenSupply?.toString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
