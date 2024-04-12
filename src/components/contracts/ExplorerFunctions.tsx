'use client'

import { useState } from 'react'

import { Copy } from "lucide-react"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export const ExplorerFunctions = ({
  from,
  to,
  spender,
  value,
  owner,
  who,
  view,
  viewValue,
  handleAllowance,
  handleApproval,
  handleBalanceOf,
  handleTransfer,
  handleTransferFrom,
}: {
  from?: boolean
  to?: boolean
  spender?: boolean
  value?: boolean
  owner?: boolean
  who?: boolean
  view?: string
  viewValue?: string
  handleAllowance?: (who: string, spender: string) => Promise<number>
  handleApproval?: (spender: string, value: string) => Promise<boolean>
  handleBalanceOf?: (address: string) => Promise<number>
  handleTransfer?: (to: string, value: string, data: []) => Promise<boolean>
  handleTransferFrom?: (from: string, to: string, value: string, data: []) => Promise<boolean>
}) => {
  const [isResult, setIsResult] = useState(false)
  const [result, setResult] = useState<any>('')
  const [isLoading, setIsLoading] = useState(false)
  const [inputValues, setInputValues] = useState({
    from: '',
    owner: '',
    to: '',
    spender: '',
    value: '',
    who: '',
  })

  const handleRun = async () => {
    setIsLoading(true)
    // handleAllowance && handleAllowance()
    if (handleAllowance) {
      const result = await handleAllowance(inputValues.who, inputValues.spender)
      setResult(result)
      setIsResult(true)
      setIsLoading(false)
    }
    // handleApproval && handleApproval()
    if (handleApproval) {
      const result = await handleApproval(inputValues.spender, inputValues.value)
      setResult(result)
      setIsResult(true)
      setIsLoading(false)
    }
    // handleBalanceOf && handleBalanceOf()
    if (handleBalanceOf) {
      const result = await handleBalanceOf(inputValues.who)
      setResult(result)
      setIsResult(true)
      setIsLoading(false)
    }
    // handleTransfer && handleTransfer()
    if (handleTransfer) {
      const result = await handleTransfer(inputValues.to, inputValues.value, [])
      setResult(result)
      setIsResult(true)
      setIsLoading(false)
    }
    // handleTransferFrom && handleTransferFrom()
    if (handleTransferFrom) {
      const result = await handleTransferFrom(
        inputValues.from,
        inputValues.to,
        inputValues.value,
        [],
      )
      setResult(result)
      setIsResult(true)
      setIsLoading(false)
    }
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setInputValues({ ...inputValues, [name]: value })
    setIsResult(false)
  }

  return (
    <>
      <div className="mt-5">
        {owner ? (
          <div className="mb-5 items-center gap-4">
            <Label htmlFor="owner" className="text-right text-lg capitalize text-gray-100">
              owner
            </Label>
            <Input
              name="owner"
              id="owner"
              value={inputValues.owner}
              onChange={handleChange}
              placeholder="address"
              className="mt-2"
            />
          </div>
        ) : (
          ''
        )}

        {from ? (
          <div className="mb-5 items-center gap-4">
            <Label htmlFor="from" className="text-right text-lg capitalize text-gray-100">
              from
            </Label>
            <Input
              name="from"
              id="from"
              value={inputValues.from}
              onChange={handleChange}
              placeholder="address"
              className="mt-2"
            />
          </div>
        ) : (
          ''
        )}

        {to ? (
          <div className="mb-5 items-center gap-4">
            <Label htmlFor="to" className="text-right text-lg capitalize text-gray-100">
              to
            </Label>
            <Input
              name="to"
              id="to"
              value={inputValues.to}
              onChange={handleChange}
              placeholder="address"
              className="mt-2"
            />
          </div>
        ) : (
          ''
        )}

        {spender ? (
          <div className="mb-5 items-center gap-4">
            <Label htmlFor="spender" className="text-right text-lg capitalize text-gray-100">
              spender
            </Label>
            <Input
              name="spender"
              id="spender"
              value={inputValues.spender}
              onChange={handleChange}
              placeholder="address"
              className="mt-2"
            />
          </div>
        ) : (
          ''
        )}

        {value ? (
          <div className="mb-5 items-center gap-4">
            <Label htmlFor="value" className="text-right text-lg capitalize text-gray-100">
              value
            </Label>
            <Input
              name="value"
              id="value"
              type="number"
              value={inputValues.value}
              onChange={handleChange}
              placeholder="uint256"
              className="mt-2"
            />
          </div>
        ) : (
          ''
        )}

        {who ? (
          <div className="mb-5 items-center gap-4">
            <Label htmlFor="who" className="text-right text-lg capitalize text-gray-100">
              who
            </Label>
            <Input
              name="who"
              id="who"
              value={inputValues.who}
              onChange={handleChange}
              placeholder="address"
              className="mt-2"
            />
          </div>
        ) : (
          ''
        )}

        {view ? (
          <div className="mb-5 items-center gap-4">
            <Label htmlFor="description" className="text-right text-lg capitalize text-gray-100">
              {view}
            </Label>
            <div className=" mt-2 flex w-full max-w-sm cursor-pointer items-center justify-between rounded border border-gray-600 p-3 shadow">
              <span>{viewValue}</span>
              <Copy />
            </div>
          </div>
        ) : (
          ''
        )}

        {!view && (
          <>
            {isResult && (
              <div className="mb-5 items-center gap-4">
                <Label htmlFor="Result" className="text-right text-lg capitalize text-gray-100">
                  Result
                </Label>
                <Input
                  name="Result"
                  id="Result"
                  readOnly={true}
                  value={result}
                  placeholder="Result"
                  className="mt-2"
                />
              </div>
            )}
            <Button
              // type="submit"
              onClick={() => {
                handleRun()
              }}
              disabled={isLoading}
              // isLoading={isLoading}
            >
              Run
            </Button>
          </>
        )}
      </div>
    </>
  )
}
