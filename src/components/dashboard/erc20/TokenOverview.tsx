import { CreateERC20 } from './CreateErc20';
import { TokenTable } from './TokenTable';
import { tableData } from '@/constants/dummyTableData';

export function TokenOverview(){
  // console.log(tableData)

  return (
    <div className="mt-20">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Token Contracts
          </h3>
          <small className="text-lg font-light text-gray-200">
            The list of Fungible token instances that you have deployed with badger on the Shardeum
            Network.
          </small>
        </div>

        <CreateERC20 />
      </div>
      <TokenTable tableData={tableData} isLoading={false} />
    </div>
  )
}
