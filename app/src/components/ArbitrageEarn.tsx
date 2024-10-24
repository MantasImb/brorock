import { values } from "@/values"
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { SquareArrowOutUpRight } from "lucide-react";

export default function ArbitrageEarn() {
  return (
    <>
      <h1 className="text-2xl text-bold">Liquidity Incentives Uniswap V3 a{values.coinSymbol} - ETH</h1>
      <div className="flex flex-col items-center w-full gap-4 text-xl font-bold">
        <div className="flex flex-col items-center gap-1 ">
          <p className="">Estimated fees APR</p>
          <div className="flex gap-1 items-center">
            <p className="text-highlight">50-150%</p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <p className="">Esimated rewards APR</p>
          <div className="flex gap-1 items-center">
            <p className="text-highlight">250-400%</p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <p className="">Rewards per day</p>
          <div className="flex gap-1 items-center">
            <p className="text-highlight">{values.coinSymbol}</p>
            <Skeleton className="w-10 h-5 rounded-md bg-highlight" />
          </div>
        </div>
        <Separator className="w-full" />
        <a href="/" className="flex items-center w-full">
          <Button size="lg" className="w-full text-highlight">Provide Liquidity <SquareArrowOutUpRight /> </Button>
        </a>
        <a href="/" className="flex items-center w-full">
          <Button size="lg" className="w-full text-highlight">Check your position on Merki <SquareArrowOutUpRight /> </Button>
        </a>
        <Separator className="w-full" />
        <p className="text-sm text-center">Note 1: a{values.coinSymbol} Lps don't get debased! and there is no fees!</p>
        <p className="text-sm text-center">Note 2: Out of range positions don't receive fees. The more fees you generate from your position, the more rewards you receive</p>
      </div>
    </>
  )
}
