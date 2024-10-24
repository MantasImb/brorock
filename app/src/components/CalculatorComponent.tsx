import {useState} from "react";
import { values } from "@/values"
import { Skeleton } from "./ui/skeleton";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";

export default function CalculatorComponent() {
  const [formValues, setFormValues] = useState({
    balance: 0,
    dailyAPR: 0,
    entryPrice: 0,
    targetPrice: 0,
    duration: 0,
  });

  function handleChange(e: any) {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  }

  function handleSliderChange(e: any) {
    setFormValues({
      ...formValues,
      duration: e[0],
    });
  }

  return (
    <>
      <h1 className="text-2xl text-bold">Calculator</h1>
      <div className="flex flex-col items-center w-full gap-4 text-xl font-bold">
        <div className="flex flex-col items-center gap-1 ">
          <p className="">{values.coinSymbol} Price</p>
          <div className="flex gap-1 items-center">
            <p className="text-highlight">$</p>
            <Skeleton className="w-10 h-5 rounded-md bg-highlight" />
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
          <p className="">Daily APR</p>
          <div className="flex gap-1 items-center">
            <p className="text-highlight">%</p>
            <Skeleton className="w-10 h-5 rounded-md bg-highlight" />
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <p className="">{values.coinSymbol} Balance</p>
          <div className="flex gap-1 items-center">
            <p className="text-highlight">%</p>
            <Skeleton className="w-10 h-5 rounded-md bg-highlight" />
          </div>
        </div>
        <Label htmlFor="balance" className="self-start -mb-3">{values.coinSymbol} Balance</Label>
        <Input value={formValues.balance} type="number" name="balance" id="balance" placeholder="0" className="w-full text-lg font-bold h-12" onChange={handleChange} />
        <Label htmlFor="dailyAPR" className="self-start -mb-3">Daily APR %</Label>
        <Input value={formValues.dailyAPR} type="number" name="dailyAPR" id="dailyAPR" placeholder="0" className="w-full text-lg font-bold h-12" onChange={handleChange} />
        <Label htmlFor="entryPrice" className="self-start -mb-3">Entry {values.coinSymbol} Price</Label>
        <Input value={formValues.entryPrice} type="number" name="entryPrice" id="entryPrice" placeholder="0.00" className="w-full text-lg font-bold h-12" onChange={handleChange} />
        <Label htmlFor="targetPrice" className="self-start -mb-3">Target {values.coinSymbol} Price</Label>
        <Input value={formValues.targetPrice} type="number" name="targetPrice" id="targetPrice" placeholder="0.00" className="w-full text-lg font-bold h-12" onChange={handleChange} />
        <Label htmlFor="duration" className="self-start -mb-3">Duration (days)</Label>
        <div className="flex gap-4 w-full">
          <Input value={formValues.duration} type="number" name="duration" id="duration" placeholder="0" className="w-24 text-lg font-bold h-12" onChange={handleChange} />
          <Slider value={[formValues.duration]} id="duration" name="duration" className="w-full h-12" max={365} onValueChange={handleSliderChange} />
        </div>
        <Separator className="w-full" />
        <div className="flex gap-10">
          <div className="text-sm flex flex-col gap-1">
            <p>Your initial investment:</p>
            <p>Current Balance:</p>
            <p>{values.coinSymbol} Staking rewards:</p>
            <p>Balance at target price:</p>
            <p>Total balance + rewards:</p>
            <p>Total profit (without daily compounding):</p>
            <p>Total profit (with daily compounding):</p>
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
      </div>
    </>
  )
}
