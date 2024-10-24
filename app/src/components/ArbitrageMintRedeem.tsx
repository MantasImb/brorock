import { useEffect, useState } from "react"
import { checkWalletConnection, connectWallet, getUserSignature } from "@/lib/connectWallet"
import { values } from "@/values"
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { SquareArrowOutUpRight } from "lucide-react";

export default function ArbitrageMintRedeem() {
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
      <h1 className="text-2xl text-bold">Mint and Redeem</h1>
      <div className="flex flex-col items-center w-full gap-4 text-xl font-bold">
        <div className="flex flex-col items-center gap-1 ">
          <p className="">a{values.coinSymbol} price</p>
          <div className="flex gap-1 items-center">
            <p className="text-highlight">$</p>
            <Skeleton className="w-10 h-5 rounded-md bg-highlight" />
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <p className="">a{values.coinSymbol} price on DEX</p>
          <div className="flex gap-1 items-center">
            <p className="text-highlight">$</p>
            <Skeleton className="w-10 h-5 rounded-md bg-highlight" />
          </div>
        </div>
        <Separator className="w-full" />
        {address ? <>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="lg" className={`${tabIndex === 0 ? "bg-highlight text-text" : "bg-transparent text-highlight"}`} onClick={() => setTabIndex(0)}>Mint</Button>
            <Button variant="ghost" size="lg" className={`${tabIndex === 1 ? "bg-highlight text-text" : "bg-transparent text-highlight"}`} onClick={() => setTabIndex(1)}>Redeem</Button>
          </div>
          {tabIndex === 0 && <>
            <p className="font-bold self-start">{values.coinSymbol}</p>
            <Input placeholder="Amount" className="w-full text-lg font-bold h-12" />
            <p className="font-bold self-start">a{values.coinSymbol}</p>
            <Input placeholder="Amount to receive" className="w-full text-lg font-bold h-12" disabled />
            <Button size="lg" className="w-full" onClick={() => getUserSignature("Mint Arbitrage")}>Mint</Button>
          </>
          }
          {tabIndex === 1 &&
            <>
              <p className="font-bold self-start">a{values.coinSymbol}</p>
              <Input placeholder="Amount" className="w-full text-lg font-bold h-12" />
              <p className="font-bold self-start">{values.coinSymbol}</p>
              <Input placeholder="Amount to receive" className="w-full text-lg font-bold h-12" disabled/>
              <Button size="lg" className="w-full" onClick={() => getUserSignature("Redeem Arbitrage")}>Redeem</Button>
            </>
          }
          <a href="https://Linklink" target="_blank" rel="noreferrer" className="w-full">
            <Button size="lg" className="w-full text-highlight">Trade on DEX <SquareArrowOutUpRight /></Button>
          </a>
          <Separator className="w-full" />
          <div className="flex gap-10">
            <div className="text-sm flex flex-col gap-1">
              <p>Mint Fee:</p>
              <p>Redeem Fee:</p>
            </div>
            <div className="flex flex-col gap-1">
              <Skeleton className="w-10 h-5 rounded-md bg-highlight" />
              <Skeleton className="w-10 h-5 rounded-md bg-highlight" />
            </div>
          </div>
        </>
          : <Button size="lg" className="w-full" onClick={() => handleConnect()}>Connect Wallet</Button>}
      </div>
    </>
  )
}
