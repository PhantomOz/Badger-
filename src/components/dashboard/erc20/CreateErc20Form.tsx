import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useCreateERC20 } from "@/hooks/useERC20Factory";

const CreateErc20Form = (onSubmit: any) => {
  const [loading, setLoading] = useState(false);

  const [inputValues, setInputValues] = useState({
    name: "",
    symbol: "",
    supply: 0,
    description: "",
    decimal:18,
  });

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  // function createToken() {
  const createToken = useCreateERC20(
    inputValues.name,
    inputValues.symbol,
    inputValues.supply,
    inputValues.description,
    inputValues.decimal
  )
  // console.log(response);

  return (
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
            // value={inputValues.decimal}
            onChange={handleInputChange}
            className="mt-2"
          />
        </div>
      </div>

      <DialogFooter>
        <Button type="submit" onClick={
          ()=>{createToken()}
        }>{loading ? "Loading..." : "Deploy"}</Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default CreateErc20Form;
