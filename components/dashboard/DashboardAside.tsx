'use client';

import { LineChart, Package, Aperture, Settings } from "lucide-react";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Bell, Gem, BookUser, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import UpgradePro from "../UpgradePro";

export default function DashboardAside() {
  const pathname = usePathname();

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
                className={`ml-2 group flex items-center justify-start rounded-md transition-colors ${
                  pathname === '/dashboard'
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
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
                href="/dashboard/alerts"
                className={`ml-2 group flex items-center justify-start rounded-md transition-colors ${
                  pathname.startsWith('/dashboard/alerts')
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Bell className="h-5 w-5 mr-2" />
                <span className="hidden group-hover:inline">Alerts</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Alerts</TooltipContent>
          </Tooltip>
          {/* <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="ml-2 flex items-center justify-start rounded-md text-muted-foreground transition-colors hover:text-foreground"
              >
                <Package className="h-5 w-5 mr-2" />
                <span className="hidden group-hover:inline">Products</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Products</TooltipContent>
          </Tooltip> */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard/directory"
                className="ml-2 flex items-center justify-start rounded-md text-muted-foreground transition-colors hover:text-foreground"
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
                href="/dashboard/monitoring"
                className="ml-2 flex items-center justify-start rounded-md text-muted-foreground transition-colors hover:text-foreground"
              >
                <LineChart className="h-5 w-5 mr-2" />
                <span className="hidden group-hover:inline">Monitoring</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Monitoring</TooltipContent>
          </Tooltip>
        </nav>
        {/* Gem add icon */}
        <nav className="mt-auto flex flex-col items-start gap-4 px-2 sm:py-5">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="hidden group-hover:inline items-baseline justify-start">
                <UpgradePro />
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">Benefit from all the features</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard/settings"
                className="ml-2 flex items-center justify-start rounded-md text-muted-foreground transition-colors hover:text-foreground"
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
