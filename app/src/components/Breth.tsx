import { useEffect, useState } from "react"
import { checkWalletConnection, connectWallet, getUserSignature } from "@/lib/connectWallet"
import { values } from "@/values"
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";

export default function Breth() {
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
      <h1 className="text-2xl text-bold">Mint and Redeem {values.coinSymbol}ETH</h1>
      <div className="flex flex-col items-center w-full gap-4 text-xl font-bold">
        {address ? <>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="lg" className={`${tabIndex === 0 ? "bg-highlight text-text" : "bg-transparent text-highlight"}`} onClick={() => setTabIndex(0)}>Mint</Button>
            <Button variant="ghost" size="lg" className={`${tabIndex === 1 ? "bg-highlight text-text" : "bg-transparent text-highlight"}`} onClick={() => setTabIndex(1)}>Redeem</Button>
          </div>
          <Input placeholder="Amount" className="w-full text-lg font-bold h-12" />
          {tabIndex === 0 && <Button size="lg" className="w-full" onClick={() => getUserSignature("Stake 401k")}>Mint</Button>}
          {tabIndex === 1 && <Button size="lg" className="w-full" onClick={() => getUserSignature("Unstake 401k")}>Redeem</Button>}
          <Separator className="w-full" />
          <div className="flex gap-10">
            <div className="text-sm flex flex-col gap-1">
              <p>Mint fee:</p>
              <p>Redeem fee:</p>
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
