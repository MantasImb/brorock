import { useState } from "react"
import { Menu, X, Home, Mail, Settings, HelpCircle, ChevronDown, User, Bell, Shield, Book, HeadphonesIcon, LayoutDashboard, BookPlus, Blocks, HandCoins, BadgePercent, Recycle, Calculator, SendToBack, Users, Speech } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SidebarComponent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Mobile toggle button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-8 right-6 z-50 lg:hidden"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        <span className="sr-only">Toggle Sidebar</span>
      </Button>

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 z-40 flex flex-col h-full w-80 transform bg-secondary text-text p-5 shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="flex flex-col items-center justify-center  w-full gap-2">
          <img src="/logo.png" alt="logo" className="h-32 w-32" />
          <a className="text-text hover:text-highlight font-extrabold text-xl">ORIGIN FUND</a>
        </div>
        <nav className="flex flex-col items-start justify-between grow w-full">
          <ul className="space-y-2">
            <MenuButton
              href="/"
              icon={<LayoutDashboard size={64} className="mr-1 h-8 w-8" />}
              label="Dashboard"
            />
            <ExpandableMenuItem
              label="Earn"
              icon={<BookPlus className="mr-2 h-4 w-4" />}
            >
              <MenuButton
                href="/earn/337(o)"
                icon={<Blocks className="mr-1 h-4 w-4" />}
                label="337(o)"
                className="ml-4"
              />
              <MenuButton
                href="/earn/lp-staking-equity"
                icon={<HandCoins className="mr-1 h-4 w-4" />}
                label="LP Staking Equity"
                className="ml-4"
              />
              <ExpandableMenuItem
                label="Bond"
                icon={<BadgePercent className="ml-4 m-2 h-4 w-4" />}
              >
                <MenuButton
                  href="/earn/etf-bond/usdc"
                  label="USDC bond"
                  className="ml-8"
                />
                <MenuButton
                  href="/earn/etf-bond/origin-eth"
                  label="Origin-ETH bond"
                  className="ml-8"
                />
              </ExpandableMenuItem>
              <ExpandableMenuItem
                label="Arbitrage Fund"
                icon={<Recycle className="ml-4 m-2 h-4 w-4" />}
              >
                <MenuButton
                  href="/earn/arbitrage-fund/mint-redeem"
                  label="Mind and Redeem"
                  className="ml-8"
                />
                <MenuButton
                  href="/earn/arbitrage-fund/swap"
                  label="Swap"
                  className="ml-8"
                />
                <MenuButton
                  href="/earn/arbitrage-fund/earn"
                  label="Earn"
                  className="ml-8"
                />
              </ExpandableMenuItem>
              <MenuButton
                href="/earn/calculator"
                icon={<Calculator className="mr-1 h-4 w-4" />}
                label="Calculator"
                className="ml-4"
              />
            </ExpandableMenuItem>
            <ExpandableMenuItem
              label="oETH"
              icon={<Recycle className="mr-2 h-4 w-4" />}
            >
              <MenuButton
                href="/oeth/mint-redeem"
                label="Mint and Redeem"
                className="ml-4"
              />
            </ExpandableMenuItem>
            <MenuButton
              href="/bridge"
              icon={<SendToBack className="mr-1 h-4 w-4" />}
              label="Bridge"
            />
            <MenuButton
              href="/leaderboard"
              icon={<Users className="mr-1 h-4 w-4" />}
              label="Leaderboard"
            />
          </ul>
          <Button
            variant="ghost"
            size="default"
            className='w-full justify-start text-base'
            asChild
          >
            <a href="https://origin-fund.gitbook.io/originfund">
              <Book className="mr-1 h-4 w-4" />
              Docs
            </a>
          </Button>
        </nav>
        <div className="flex justify-between items-center py-4">
          <a href="https://t.me/OriginFund" target="_blank" rel="noreferrer" className="cursor-pointer">
            <img src="/icons/telegram.svg" alt="telegram" className="size-12 invert cursor-pointer" />
          </a>
          <a href="https://x.com/originfund_" target="_blank" rel="noreferrer" className="cursor-pointer">
            <img src="/icons/x.svg" alt="twitter" className="size-12 invert cursor-pointer" />
          </a>
          <a href="https://medium.com/@originfund" target="_blank" rel="noreferrer" className="cursor-pointer">
            <img src="/icons/medium.svg" alt="medium" className="size-10 invert cursor-pointer" />
          </a>
        </div>
      </div>
    </>
  );
}

interface ExpandableMenuItemProps {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

function ExpandableMenuItem({ label, icon, children, }: ExpandableMenuItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <li className="w-full">
      <Button
        variant="ghost"
        className='full justify-between'
        onClick={toggleExpansion}
        aria-expanded={isExpanded}
      >
        <span className="flex items-center gap-1 text-base">
          {icon}
          {label}
        </span>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''
            }`}
        />
      </Button>
      {isExpanded && <ul className="ml-1 mt-2 space-y-2">{children}</ul>}
    </li>
  );
}

interface MenuButtonProps {
  href: string;
  icon?: React.ReactNode;
  label: string;
  className?: string; // Optional additional classes
}

function MenuButton({
  href,
  icon,
  label,
  className = '',
}: MenuButtonProps) {
  return (
    <li>
      <Button
        variant="ghost"
        size="default"
        className={`w-full justify-start text-base ${className}`}
        asChild
      >
        <a href={href}>
          {icon}
          {label}
        </a>
      </Button>
    </li>
  );
}
