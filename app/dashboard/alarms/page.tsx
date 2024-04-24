

  import DashboardNewElement from "@/components/dashboard/DashboardNewElement";

export default function DashboardAlarms() {
  return (
    <>
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
              <div className="grid gap-4 pl-14 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                {/* <div className="flex flex-col px-4 sm:gap-4 sm:py-4 sm:pl-20 pl-14 gap-4">   */}
                    <DashboardNewElement menuName="alarm" />
                        {/* Votre contenu ici */}
                {/* </div> */}
            </div>
        </div>
    </main> 
    </>
  )
}
