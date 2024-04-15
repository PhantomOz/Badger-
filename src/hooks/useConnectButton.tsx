import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";
import { Button } from "@/components/ui/button";

export default function ConnectButton() {
  const { open } = useWeb3Modal();
  const { address, chainId, isConnected } = useWeb3ModalAccount();

  return (
    <>
      {address ? (
        <w3m-account-button />
      ) : (
        <Button
          onClick={() => open()}
          variant={"outline"}
          className="h-6 min-w-[4rem] gap-2 rounded-xl border border-purple-700 px-4 py-3 font-bold text-foreground lg:min-w-[8rem] lg:rounded-2xl"
          translate="no"
        >
          Connect Wallet
        </Button>
      )}
    </>
  );
}
