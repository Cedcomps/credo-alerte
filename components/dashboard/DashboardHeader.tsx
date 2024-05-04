// components/Header.tsx
'use client'
import Link from 'next/link';
import { CircleUserRound } from 'lucide-react';
import { Bell, BookUser, Home, LineChart, Package, Package2, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { PanelLeft } from 'lucide-react';
import DashboardBreadcrumb from './DashboardBreadcrumb';
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import CredoAlertLogo from '../CredoAlertLogo';
import SearchBar from "@/components/SearchBar";
import { ErrorBoundary } from '../ErrorBoundary';

export default function DashboardHeader() {
  const router = useRouter()
const supabase = createClient()

const handleLogout = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Error signing out:', error)
    } else {
      router.push('/login')
    }
  } catch (error) {
    console.error('Error signing out:', error)
  }
}
const handleUserAccount = async () => {
      router.push('/dashboard/account')
    }

  return (
    <ErrorBoundary>
    <header className="sticky top-0 z-20 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 text-lg font-semibold text-primary-foreground md:text-base"
            >
              <CredoAlertLogo/>
              <span className="sr-only">Credo Alert</span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Home className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="#"
              className="flex items-center gap-4 px-2.5 text-foreground"
            >
              <Bell className="h-5 w-5" />
              Alerts
            </Link>
            {/* <Link
              href="#"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Package className="h-5 w-5" />
              Products
            </Link> */}
            <Link
              href="#"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <BookUser className="h-5 w-5" />
              Directory
            </Link>
            <Link
              href="#"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <LineChart className="h-5 w-5" />
              Settings
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <DashboardBreadcrumb />
      <div className="relative ml-auto flex-1 md:grow-0">
      <SearchBar />
{/* 
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          id="search_engine"
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        /> */}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            <CircleUserRound />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleUserAccount}>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
    </ErrorBoundary>
  );
}
