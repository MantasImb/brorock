import { useEffect, useState } from "react"
import { checkWalletConnection, connectWallet, getUserSignature } from "@/lib/connectWallet"
import { values } from "@/values"
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";

export default function LeaderboardComponent() {
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
      <h1 className="text-2xl text-bold">Leaderboard</h1>
      <div className="flex flex-col items-center w-full gap-4 text-xl font-bold">
        <div className="flex flex-col items-center gap-1 ">
          <p className="">Your Points</p>
          <div className="flex gap-1 items-center">
            <Skeleton className="w-10 h-5 rounded-md bg-highlight" />
          </div>
        </div>
        <Separator className="w-full" />
        {address ? <>
          <div className="flex flex-col items-center gap-1 w-full">
            <div className="flex w-full items-center justify-around gap-1">
              <p>Rank</p>
              <p>Code</p>
              <p>Points</p>
            </div>
          <Skeleton className="w-full h-24 rounded-md bg-gray-800" />
          </div>
          <p className="text-highlight text-sm">Note: You have to create a referral code to be eligible for the leaderboard </p>
        </>
          : <Button size="lg" className="w-full" onClick={() => handleConnect()}>Connect Wallet</Button>}
      </div>
    </>
  )
}
