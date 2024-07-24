"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getFactoryContract } from "@/constants/contracts";
import { getProvider } from "@/constants/providers";
import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import { useRef, useState } from "react";
import { CodeBlock, dracula } from "react-code-blocks";

export function CreateNftForm({ onSubmit }: { onSubmit?: () => void }) {
  const [file, setFile] = useState("");
  const [cid, setCid] = useState("");
  const [uploading, setUploading] = useState(false);
  const inputFile = useRef<HTMLInputElement>(null);
  const { walletProvider } = useWeb3ModalProvider();
  const [loading, setLoading] = useState(false);
  const [imageBlobUrl, setImageBlobUrl] = useState('');

  const readWriteProvider = getProvider(walletProvider);

  const [inputValues, setInputValues] = useState({
    name: "",
    symbol: "",
    description: "",
  });

  const uploadFile = async (fileToUpload: File) => {
    try {
      setUploading(true);
      const data = new FormData();
      data.set("file", fileToUpload);
      const res = await fetch("/api/files", {
        method: "POST",
        body: data,
      });
      const resData = await res.json();
      setCid(resData.IpfsHash);
      console.log(resData.IpfsHash);

      setUploading(false);
    } catch (e) {
      console.log(e);
      setUploading(false);
      alert("Trouble uploading file");
    }
  };

  const handleChange = (e: any) => {
    setFile(e.target.files[0]);
    uploadFile(e.target.files[0]);
    const blobUrl = URL.createObjectURL(e.target.files[0]);
    setImageBlobUrl(blobUrl);
  };

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  async function createNFT() {
    setLoading(true)
    const signer = readWriteProvider ? await readWriteProvider.getSigner() : null;

    // const signer = await readWriteProvider.getSigner();

    const contract = getFactoryContract(signer);
    try {
      const transaction = await contract.createNFT(
        inputValues.name,
        inputValues.symbol,
        cid,
        inputValues.description
      );

      console.log("transaction: ", transaction);
      const receipt = await transaction.wait();

      console.log("receipt: ", receipt);
      if (receipt.status === 1 && onSubmit) {
        onSubmit();
      }
      setLoading(false);

    } catch (error) {
      console.error("error: ", error);
    }
  }

  return (
    <DialogContent className="sm:max-w-[425px] md:max-w-[550px] lg:max-w-[90%]">

      <DialogHeader>
        <DialogTitle>Create NFT</DialogTitle>
        <DialogDescription>
          Parameters the contract specifies to be passed in during deployment.
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-row gap-6">
        <div className=" py-4 lg:w-6/12">
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
          <div className=" items-center gap-4">
            <Label htmlFor="symbol" className="text-right">
              Symbol
            </Label>
            <Input id="symbol" name="symbol" onChange={handleInputChange} className="mt-2" />
          </div>
          <div className="mb-5 mt-5 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input id="description" name="description" onChange={handleInputChange} className="mt-2" />
          </div>

          <div className="flex w-full items-center justify-center">
            <label
              className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border"
            >
              {imageBlobUrl ? <div className="h-64 rounded-lg"><img src={imageBlobUrl} alt="Selected" className="h-full rounded-lg w-full" />{uploading && <p className="text-white">Image is uploading...</p>}</div> : <div className="flex flex-col items-center justify-center pb-6 pt-5">
                <svg
                  className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>}

              <input
                className="hidden"
                type="file"
                id="file"
                ref={inputFile}
                onChange={handleChange}
              />
            </label>
          </div>
        </div>
        {/* Display Codes Here */}
        <div className="w-[100%] relative max-h-[500px]">
          <CodeBlock
            text={'contract'}
            language={'solidity'}
            showLineNumbers={false}
            theme={dracula}
            customStyle={{ height: '100%', position: 'absolute', left: '0', top: '0', width: '100%' }}
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit" disabled={loading || uploading} onClick={() => {
          createNFT()
        }}>{loading ? "Loading..." : "Deploy"}
        </Button>
      </DialogFooter>
    </DialogContent>
    // </Dialog>
  );
}
