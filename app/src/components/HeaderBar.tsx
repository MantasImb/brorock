import { connectWallet, checkWalletConnection } from "@/lib/connectWallet"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Wallet } from "lucide-react";

export default function HeaderBar() {
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
    <div className="flex w-full justify-end items-center pt-8 pr-20">
      {address ? (
        <Button className="flex items-center gap-2">
          <Wallet />
          <p className="text-white text-base">{address.slice(0, 6)}...{address.slice(-4)}</p>
        </Button>
      ) : (
        <Button onClick={handleConnect}><Wallet /> Connect Wallet</Button>
      )}
    </div>
  );
}
