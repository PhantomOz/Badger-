
export function NFTContractOverview({
  symbol,
  supply,

  userBalance,
  name,
  address,
}: {
  symbol: string;
  supply?: string;
  userBalance: number;
  name: string;
  address: string;
}) {

  return (
    <div className="mt-4">
      <h2 className="text-2xl font-bold">NFT Collection Details</h2>

      <div className="mt-6 flex w-[70%]">
        {/* <div className="mr-8 block w-full max-w-sm cursor-pointer rounded-lg border border-gray-600 p-5 shadow">
          <h5 className="mb-2 text-xl font-normal tracking-tight text-gray-900 dark:text-white">
            Total Supply
          </h5>

          <p className="text-xl font-normal text-gray-100">
            {supply} {symbol}
          </p>
        </div> */}
        <div className="mr-8 block w-full max-w-sm cursor-pointer rounded-lg border border-gray-600 p-5 shadow">
          <h5 className="mb-2 text-xl font-normal tracking-tight text-white">
            Owned by you
          </h5>
          <p className="text-xl font-normal text-gray-100">
            {userBalance} {symbol}
          </p>
        </div>
        {/* <div className="mr-8 block w-full max-w-sm cursor-pointer rounded-lg border border-gray-600 p-5 shadow">
          <h5 className="mb-2 text-xl font-normal tracking-tight text-white">
            Decimals
          </h5>
          <p className="text-xl font-normal text-gray-100">{decimal || 0}</p>
        </div> */}
      </div>
      {/* Events */}
      <div className="mt-12">
        <div className="flex justify-between">
          <h2 className="mb-4 text-2xl font-bold">Events</h2>
          <p className="cursor-pointer text-sm font-bold text-blue-500 underline">
            View all
          </p>
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
                {/* // <th scope="col" className="px-6 py-3">
                //   Block Number
                // </th> */}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                <td
                  scope=""
                  className="cursor-pointer whitespace-nowrap px-6 py-4 font-medium"
                >
                  1FRMM...hV24fg
                </td>
                <td scope="" className="px-6 py-4">
                  Mint
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
