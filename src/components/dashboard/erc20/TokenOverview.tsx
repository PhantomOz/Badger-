import { useGetAllERC20 } from '@/hooks/useERC20Factory';
import { CreateERC20 } from './CreateErc20';
import { TokenTable } from './TokenTable';
import { tableData } from '@/constants/dummyTableData';
import { useGetAllERC721 } from '@/hooks/useERC721Factory';

export function TokenOverview({fullPage}:{fullPage:boolean}){
  // console.log(tableData)
  const { loading, data } = useGetAllERC20();
  const {  nfts } = useGetAllERC721 ();

  return (
    <div className="mt-20">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Token Contracts
          </h3>
          <small className="text-lg font-light text-gray-200">
            The list of Fungible token instances that you have deployed with badger on the Polygon
            Network.
          </small>
        </div>

        <CreateERC20 />
      </div>
      <TokenTable tableData={data} isLoading={loading} fullPage={fullPage}/>
      
    </div>
  )
}
