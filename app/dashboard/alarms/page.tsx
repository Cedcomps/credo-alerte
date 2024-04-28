'use client'
import DashboardNewElement from "@/components/dashboard/DashboardNewElement";
import AlarmList from "@/components/alarms/AlarmList";
import AlarmDetails from "@/components/AlarmDetails";
import DashboardQuotaCard from "@/components/dashboard/DashboardQuotaCard";

export default function DashboardAlarms() {
  return (
    <main className="flex flex-col gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      {/* DashboardNewElement */}
      <div className="max-w-md ">
        <DashboardNewElement menuName="alarm" />
      </div>

      {/* AlarmList et AlarmDetails */}
      <div className="md:flex md:gap-4">
        <div className="md:w-2/3">
        <AlarmList/>
        </div>
        <div className="md:w-1/3">
        <AlarmDetails />
        </div>
      </div>
    </main>
  );
}
