import { useEffect, useState } from "react"
import { checkWalletConnection, connectWallet, getUserSignature } from "@/lib/connectWallet"
import { values } from "@/values"
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";

export default function ArbitrageFundSwap() {
  const [address, setAddress] = useState<string | null>(null);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    checkWalletConnection().then((add) => {
      setAddress(add);
    });
  }, []);

  function handleConnect() {
    connectWallet().then((add) => {
      setAddress(add);
    });
  }

  return (
    <>
      <h1 className="text-2xl text-bold">Swap on Arbitrage Fund</h1>
      <div className="flex flex-col items-center w-full gap-4 text-xl font-bold">
        <div className="flex flex-col items-center gap-1 ">
          <p className="">a{values.coinSymbol} Fair Price</p>
          <div className="flex gap-1 items-center">
            <p className="text-highlight">$</p>
            <Skeleton className="w-10 h-5 rounded-md bg-highlight" />
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <p className="">a{values.coinSymbol} DEX Price</p>
          <div className="flex gap-1 items-center">
            <p className="text-highlight">$</p>
            <Skeleton className="w-10 h-5 rounded-md bg-highlight" />
          </div>
        </div>
        <div className="flex gap-4 w-full">
          <Skeleton className="w-full h-12 rounded-md bg-gray-800" />
          <Skeleton className="w-16 h-12 rounded-md bg-gray-800" />
          <Skeleton className="w-16 h-12 rounded-md bg-gray-800" />
        </div>
        <Skeleton className="w-full h-96 rounded-md bg-gray-800" />
      </div>
    </>
  )
}
