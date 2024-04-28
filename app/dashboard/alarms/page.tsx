import DashboardNewElement from "@/components/dashboard/DashboardNewElement";
import AlarmList from "@/components/alarms/AlarmList";
import DashboardQuotaCard from "@/components/dashboard/DashboardQuotaCard";


export default function DashboardAlarms() {
  return (
    <>
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-4">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-3">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-3">
                <DashboardNewElement menuName="alarm" />
                
                <DashboardQuotaCard menuName="product"/>

            <div className="sm:col-span-3">
                <AlarmList/>
            </div>
        </div>
        </div>
    </main> 
    </>
  )
}
