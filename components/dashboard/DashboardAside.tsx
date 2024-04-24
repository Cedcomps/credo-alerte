// // components/DashboardAside.tsx


// components/DashboardAside.tsx
import { LineChart, Package, Aperture, Settings } from "lucide-react"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { Bell, Gem, BookUser, Home } from "lucide-react"
import Link from "next/link"
import UpgradePro from "../UpgradePro"

export default function DashboardAside() {
  return (
    <TooltipProvider>
      <aside className="group fixed inset-y-0 left-0 z-40 hidden w-14 flex-col border-r bg-background transition-all duration-300 ease-in-out hover:w-56 sm:flex ">
        <nav className="flex flex-col items-start gap-4 px-2 sm:py-5">
          <Link
            href="#"
            className="ml-1 flex h-9 w-9 shrink-0 items-center justify-center gap-4 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base "
          >
            <Aperture className="h-4 w-4 transition-all group-hover:scale-120" />
            <span className="sr-only">Credo Alerte</span>
          </Link>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard"
                className="ml-2 group flex items-center justify-start rounded-lg text-muted-foreground transition-colors hover:text-foreground "
              >
                <Home className="h-5 w-5 mr-2" />
                <span className="hidden group-hover:inline">Dashboard</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Dashboard</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard/alarms"
                className="ml-2 h-9  group flex items-center justify-start rounded-lg bg-accent text-accent-foreground transition-colors hover:bg-accent-focus "
              >
                <Bell className="h-5 w-5 mr-2" />
                <span className="hidden group-hover:inline">Alarms</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Alarms</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="ml-2 flex items-center justify-start rounded-lg text-muted-foreground transition-colors hover:text-foreground"
              >
                <Package className="h-5 w-5 mr-2" />
                <span className="hidden group-hover:inline">Products</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Products</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="ml-2 flex items-center justify-start rounded-lg text-muted-foreground transition-colors hover:text-foreground"
              >
                <BookUser className="h-5 w-5 mr-2" />
                <span className="hidden group-hover:inline">Directory</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Directory</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="ml-2 flex items-center justify-start rounded-lg text-muted-foreground transition-colors hover:text-foreground"
              >
                <LineChart className="h-5 w-5 mr-2" />
                <span className="hidden group-hover:inline">Analytics</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Analytics</TooltipContent>
          </Tooltip>
        </nav>
        {/* Gem add icon */}
        <nav className="mt-auto flex flex-col items-start gap-4 px-2 sm:py-5">
          <div >
            <UpgradePro/>
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="ml-2 flex items-center justify-start rounded-lg text-muted-foreground transition-colors hover:text-foreground"
              >
                <Settings className="h-5 w-5 mr-2" />
                <span className="hidden group-hover:inline">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </nav>

      </aside>
    </TooltipProvider>
  )
}
