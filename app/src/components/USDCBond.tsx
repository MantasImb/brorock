import { useEffect, useState } from "react"
import { checkWalletConnection, connectWallet, getUserSignature } from "@/lib/connectWallet"
import { values } from "@/values"
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";

export default function ETFBond() {
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
      <h1 className="text-2xl text-bold">USDC Bond</h1>
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
          <p className="">Total Staked</p>
          <div className="flex gap-1 items-center">
            <p className="text-highlight">{values.coinSymbol}</p>
            <Skeleton className="w-10 h-5 rounded-md bg-highlight" />
          </div>
        </div>
        <Separator className="w-full" />
        {address ? <>
          <Input placeholder="Amount" className="w-full text-lg font-bold h-12" />
          <Button size="lg" className="w-full" onClick={() => getUserSignature("Bond")}>Bond</Button>
          <Button size="lg" className="w-full" onClick={() => getUserSignature("Claim 401k")}>Claim</Button>
          <Separator className="w-full" />
          <p className="text-sm text-center">Note 1: Tokens are vested linearly over 5 days.</p>
          <p className="text-sm text-center">Note 2: If you bond the 2nd time, your vested claimable bond will be revested. Tip: claim before bond again.</p>
          <p className="text-sm text-center">Note 3: Max 5000 USDC per tx.</p>
          <p className="text-sm text-center">Note 4: Vested BTC amount is subjected to debase.</p>
          <p className="text-highlight text-sm">Warning! Withdrawing will forfeit rewards.</p>
          <div className="flex gap-10">
            <div className="text-sm flex flex-col gap-1">
              <p>Your USDC balance:</p>
              <p>Your Bonded USDC:</p>
              <p>{values.coinSymbol} Vested:</p>
              <p>Vesting Remaining:</p>
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
