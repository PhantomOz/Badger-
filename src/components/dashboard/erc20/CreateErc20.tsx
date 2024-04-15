'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import toast from 'react-hot-toast'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function CreateERC20() {

  const [tokenIds, setTokenIds] = useState<any>()

  const [inputValues, setInputValues] = useState({
    name: '',
    symbol: '',
    decimal: 0,
    supply: 0,
    description: '',
  })

  const handleInputChange = (event: any) => {
    const { name, value } = event.target
    setInputValues({ ...inputValues, [name]: value })
  }

  const createToken = async ({
    supply,
    name,
    symbol,
    decimal,
    description,
  }: {
    supply: number
    name: string
    symbol: string
    decimal: number
    description: string
  }) => {
    // if (!activeAccount || !contract || !activeSigner || !api) {
    //   toast.error('Wallet not connected. Try again…')
    //   return

  }

  // if (!api) return null

  return (
    <Dialog>
      <DialogTrigger asChild>
      <button
          className={`mr-2 rounded border bg-white px-4 py-2 font-sans text-sm font-semibold  text-gray-900 no-underline focus:outline-none`}
        >
         Create
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Create Token</DialogTitle>
          <DialogDescription>
            {/* Make changes to your profile here. Click save when you are done. */}
            Parameters the contract specifies to be passed in during deployment.
          </DialogDescription>
        </DialogHeader>
        <div className=" py-4">
          <div className="mb-5 items-center gap-4">
            <Label htmlFor="name" className=" text-right">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              // value={inputValues.name}
              onChange={handleInputChange}
              className="mt-2"
            />
          </div>
          <div className="mb-5 items-center gap-4">
            <Label htmlFor="symbol" className="text-right">
              Symbol
            </Label>
            <Input
              id="symbol"
              name="symbol"
              // value={inputValues.symbol}
              onChange={handleInputChange}
              className="mt-2"
            />
          </div>
          <div className="mb-5 items-center gap-4">
            <Label htmlFor="symbol" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              name="description"
              onChange={handleInputChange}
              className="mt-2"
            />
          </div>

          <div className="mb-5 items-center gap-4">
            <Label htmlFor="symbol" className="text-right">
              Supply
            </Label>
            <Input
              id="supply"
              name="supply"
              // value={inputValues.supply}
              onChange={handleInputChange}
              className="mt-2"
            />
          </div>

          <div className="mb-5 items-center gap-4">
            <Label htmlFor="symbol" className="text-right">
              decimal
            </Label>
            <Input
              id="decimal"
              name="decimal"
              value={inputValues.decimal}
              onChange={handleInputChange}
              className="mt-2"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            type="submit"
            onClick={() => {
              // createToken(inputValues)
            }}
          >
            Deploy
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// export function CreateToken() {

//   const router = useRouter()

//   const [inputValues, setInputValues] = useState({
//     name: '',
//     symbol: '',
//     decimal: 0,
//     supply: 0,
//     description: '',
//   })

//   const handleInputChange = (event: any) => {
//     const { name, value } = event.target
//     setInputValues({ ...inputValues, [name]: value })
//   }

//   const fetchOwnerTokenIds = async (): Promise<any> => {
//     if (!contract || !typedContract || !api || !activeAccount?.address) return

//     try {
//       const typedResult = await typedContract.query.getOwnerTokenIds(activeAccount?.address || '')
//       console.log('Result from typed contract: ', typedResult)
//       setTokenIds(typedResult?.value.ok)
//       console.log(tokenIds)
//       return typedResult?.value.ok
//     } catch (e) {
//       console.error(e)
//       toast.error('Error while fetching token ids. Try again…')
//     }
//   }

//   const fetchTokenById = async (tokenIds: any): Promise<any> => {
//     if (!contract || !typedContract || !api || !activeAccount?.address) return
//     try {
//       const typedResult = await typedContract.query.getTokenById(tokenIds[tokenIds.length - 1])
//       console.log('Result from fetchTokenById contract: ', typedResult?.value.ok)
//       return typedResult.value.ok
//     } catch (e) {
//       console.error(e)
//       toast.error('Error while fetchingTokenById. Try again…')
//       return
//     }
//   }

//   const getAddress = async () => {
//     return await fetchTokenById(await fetchOwnerTokenIds())
//   }

//   useEffect(() => {
//     fetchOwnerTokenIds()
//     console.log(tokenIds)
//   }, [typedContract])

//   const createToken = async ({
//     supply,
//     name,
//     symbol,
//     decimal,
//     description,
//   }: {
//     supply: number
//     name: string
//     symbol: string
//     decimal: number
//     description: string
//   }) => {
//     if (!activeAccount || !contract || !activeSigner || !api) {
//       toast.error('Wallet not connected. Try again…')
//       return
//     }

//     try {
//       const tokenCreate = await contractTxWithToast(
//         api,
//         activeAccount.address,
//         contract,
//         'create_token',
//         {},
//         [supply, name, symbol, description, decimal, PSP22Hash],
//       )

//       console.log(tokenCreate.result)
//       console.log(contractAddress)
//       toast('Token Created SuccessFully')
//       router.push(`/dashboard/contracts/${await getAddress()}`)
//       // reset()
//       // console.log(supply, name, symbol, decimal)
//     } catch (e) {
//       console.error(e)
//     } finally {
//       fetchOwnerTokenIds()
//     }
//   }

//   if (!api) return null
//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <button
//           className={`mr-2 rounded border bg-white px-4 py-2 font-sans text-sm font-semibold  text-gray-900 no-underline focus:outline-none`}
//         >
//           Create
//         </button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px] md:max-w-[550px]">
//         <DialogHeader>
//           <DialogTitle>Create Token</DialogTitle>
//           <DialogDescription>
//             {/* Make changes to your profile here. Click save when you are done. */}
//             Parameters the contract specifies to be passed in during deployment.
//           </DialogDescription>
//         </DialogHeader>
//         <div className=" py-4">
//           <div className="mb-5 items-center gap-4">
//             <Label htmlFor="name" className=" text-right">
//               Name
//             </Label>
//             <Input
//               id="name"
//               name="name"
//               // value={inputValues.name}
//               onChange={handleInputChange}
//               className="mt-2"
//             />
//           </div>
//           <div className="mb-5 items-center gap-4">
//             <Label htmlFor="symbol" className="text-right">
//               Symbol
//             </Label>
//             <Input
//               id="symbol"
//               name="symbol"
//               // value={inputValues.symbol}
//               onChange={handleInputChange}
//               className="mt-2"
//             />
//           </div>
//           <div className="mb-5 items-center gap-4">
//             <Label htmlFor="symbol" className="text-right">
//               Description
//             </Label>
//             <Input
//               id="description"
//               name="description"
//               onChange={handleInputChange}
//               className="mt-2"
//             />
//           </div>

//           <div className="mb-5 items-center gap-4">
//             <Label htmlFor="symbol" className="text-right">
//               Supply
//             </Label>
//             <Input
//               id="supply"
//               name="supply"
//               // value={inputValues.supply}
//               onChange={handleInputChange}
//               className="mt-2"
//             />
//           </div>

//           <div className="mb-5 items-center gap-4">
//             <Label htmlFor="symbol" className="text-right">
//               Decimal
//             </Label>
//             <Input
//               id="decimal"
//               name="decimal"
//               // value={inputValues.decimal}
//               onChange={handleInputChange}
//               className="mt-2"
//             />
//           </div>
//         </div>

//         <DialogFooter>
//           <Button
//             type="submit"
//             onClick={() => {
//               createToken(inputValues)
//             }}
//           >
//             Deploy
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   )
// }
