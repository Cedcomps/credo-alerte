'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import DashboardAside from "@/components/dashboard/DashboardAside";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Toaster } from "@/components/ui/toaster"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkUserAuthentication = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push('/login');
      }
    };

    checkUserAuthentication();
  }, [router, supabase]);

  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <DashboardAside />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <DashboardHeader />
          <div className="flex flex-col sm:gap-4">
            {children}
          </div>
          <Toaster />
        </div>
      </div>
    </>
  );
}
