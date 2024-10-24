import { useEffect, useState } from "react"
import { checkWalletConnection, connectWallet, getUserSignature } from "@/lib/connectWallet"
import { values } from "@/values"
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { SquareArrowOutUpRight } from "lucide-react";

export default function BTC_ETH() {
  const [address, setAddress] = useState<string | null>(null);

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
      <h1 className="text-2xl text-bold">{values.coinSymbol}-ETH Bond</h1>
      <div className="flex flex-col items-center w-full gap-4 text-xl font-bold">
        <div className="flex flex-col items-center gap-1 ">
          <p className="">Discount</p>
          <div className="flex gap-1 items-center">
            <Skeleton className="w-10 h-5 rounded-md bg-highlight" />
            <p className="text-highlight">%</p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <p className="">Bond price</p>
          <div className="flex gap-1 items-center">
            <p className="text-highlight">$</p>
            <Skeleton className="w-10 h-5 rounded-md bg-highlight" />
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <p className="">Remaining Bonds</p>
          <div className="flex gap-1 items-center">
            <Skeleton className="w-10 h-5 rounded-md bg-highlight" />
          </div>
        </div>
        <Separator className="w-full" />
        {address ? <>
          <Input placeholder="Amount" className="w-full text-lg font-bold h-12" />
          <Button size="lg" className="w-full" onClick={() => getUserSignature("Bond BTC-ETH")}>Bond</Button>
          <Button size="lg" className="w-full" onClick={() => getUserSignature("Claim BTC-ETH")}>Claim</Button>
          <a href="https://app.uniswap.org/add/v2/ETH/0x1f9840a85d5af5bf1d1762f925bdaddc4201f984" target="_blank" rel="noreferrer" className="w-full">
            <Button size="lg" className="w-full text-highlight">Add Liquidity <SquareArrowOutUpRight/></Button>
          </a>
          <Separator className="w-full" />
          <p className="text-sm text-center">Note 1: Tokens are vested linearly over 5 days.</p>
          <p className="text-sm text-center">Note 2: If you bond the 2nd time, your vested claimable bond will be revested. Tip: claim before bond again.</p>
          <div className="flex gap-10">
            <div className="text-sm flex flex-col gap-1">
              <p>Your {values.coinSymbol} balance:</p>
              <p>Your bonded amount:</p>
              <p>{values.coinSymbol} vested:</p>
              <p>Vesting remaining:</p>
            </div>
            <div className="flex flex-col gap-1">
              <Skeleton className="w-10 h-5 rounded-md bg-highlight" />
              <Skeleton className="w-10 h-5 rounded-md bg-highlight" />
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
