import { DaoTable } from './DaoTable';
import { tableData } from '@/constants/dummyTableData';
import { CreateDAO } from './CreateDAO';
import { useGetAllERC721 } from '@/hooks/useERC721Factory';
import { useERC721 } from '@/hooks/useBadgerProtocol';

export function DaoOverview({ fullPage, tokens }: { fullPage: boolean, tokens: any[] }) {
  // console.log(tableData)
  const { loading, nfts } = useERC721(tokens);
  // console.log(nfts);


  return (
    <div className="mt-20">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Governance Contracts
          </h3>
          <small className="text-lg font-light text-gray-200">
            The list of DAO instances that you have deployed with badger on the CoreDao
            Network.
          </small>
        </div>

        <CreateDAO />
      </div>
      <DaoTable tableData={nfts} isLoading={false} fullPage={fullPage} />
    </div>
  )
}
