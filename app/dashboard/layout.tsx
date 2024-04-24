import DashboardAside from "@/components/dashboard/DashboardAside";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
          <DashboardAside />
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">  
              <DashboardHeader />
      </div>
      <div className="flex flex-col sm:gap-4 sm:pl-14"></div>
          {children}
      </div>
    </>
  );
}