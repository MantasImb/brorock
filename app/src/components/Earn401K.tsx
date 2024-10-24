import { useEffect, useState } from "react"
import { checkWalletConnection, connectWallet, getUserSignature } from "@/lib/connectWallet"
import { values } from "@/values"
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";

export default function Earn401K() {
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
      <h1 className="text-2xl text-bold">{values.coinSymbol} 307(o) staking</h1>
      <div className="flex flex-col items-center w-full gap-4 text-xl font-bold">
        <div className="flex flex-col items-center gap-1 ">
          <p className="">Daily APR</p>
          <div className="flex gap-1 items-center">
            <Skeleton className="w-10 h-5 rounded-md bg-highlight" />
            <p className="text-highlight">%</p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <p className="">APR</p>
          <div className="flex gap-1 items-center">
            <Skeleton className="w-10 h-5 rounded-md bg-highlight" />
            <p className="text-highlight">%</p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <p className="">Total Staked</p>
          <div className="flex gap-1 items-center">
            <p className="text-highlight">$</p>
            <Skeleton className="w-10 h-5 rounded-md bg-highlight" />
          </div>
        </div>
        <Separator className="w-full" />
        {address ? <>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="lg" className={`${tabIndex === 0 ? "bg-highlight text-text" : "bg-transparent text-highlight"}`} onClick={() => setTabIndex(0)}>Stake</Button>
            <Button variant="ghost" size="lg" className={`${tabIndex === 1 ? "bg-highlight text-text" : "bg-transparent text-highlight"}`} onClick={() => setTabIndex(1)}>Unstake</Button>
          </div>
          <Input placeholder="Amount" className="w-full text-lg font-bold h-12" />
          {tabIndex === 0 && <Button size="lg" className="w-full" onClick={() => getUserSignature("Stake 401k")}>Stake</Button>}
          {tabIndex === 1 && <Button size="lg" className="w-full" onClick={() => getUserSignature("Unstake 401k")}>Unstake</Button>}
          <Button size="lg" className="w-full" onClick={() => getUserSignature("Claim 401k")}>Claim</Button>
          <Button size="lg" className="w-full" onClick={() => getUserSignature("Compound 401k")}>Compound</Button>
          <Button size="lg" className="w-full" onClick={() => getUserSignature("Approve 401k")}>Approve</Button>
          <Separator className="w-full" />
          <div className="flex items-center gap-1">
            <p>Your daily earnings:</p>
            <Skeleton className="w-10 h-5 rounded-md bg-highlight" />
            <p className="text-highlight">$</p>
          </div>
          <div className="flex items-center gap-1">
            <p>Daily compound apy:</p>
            <Skeleton className="w-10 h-5 rounded-md bg-highlight" />
            <p className="text-highlight">%</p>
          </div>
          <p className="text-highlight text-sm">Warning! Withdrawing will forfeit rewards.</p>
          <div className="flex gap-10">
            <div className="text-sm flex flex-col gap-1">
              <p>Your balance:</p>
              <p>Your Staked Balance:</p>
              <p>{values.coinSymbol} Accrued:</p>
              <p>USDC Accrued:</p>
              <p>Your Daily Earnings:</p>
              <p>Time until tax exemption:</p>
              <p>Withdraw tax:</p>
            </div>
            <div className="flex flex-col gap-1">
              <Skeleton className="w-10 h-5 rounded-md bg-highlight" />
              <Skeleton className="w-10 h-5 rounded-md bg-highlight" />
              <Skeleton className="w-10 h-5 rounded-md bg-highlight" />
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
