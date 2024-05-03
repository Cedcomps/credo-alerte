'use client'
import AlertList from "@/components/alerts/AlertList";
import { useState } from "react";
import AlertDetails from "@/components/alerts/AlertDetails";
import { ErrorBoundary } from '@/components/ErrorBoundary';
import AlertCount from "@/components/alerts/AlertCount";
import AlertNewElement from "@/components/alerts/AlertNewElement";

export default function DashboardAlerts() {
  const [selectedAlert, setSelectedAlert] = useState(null);

  const handleAlertClick = (alert:any) => {
    setSelectedAlert(alert);
  };

  return (
    <ErrorBoundary>
    <main className="flex flex-col gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      {/* DashboardNewElement */}
      <div className="md:flex md:gap-6">
        <AlertNewElement/>
        <AlertCount description={"Activable Alerts"}/>
      </div>
      {/* AlertList et AlertDetails */}
      <div className="md:flex md:gap-4">
        <div className="md:w-2/3">
        <AlertList onAlertClick={handleAlertClick} />
        </div>
        <div className="md:w-1/3">
        <AlertDetails selectedAlert={selectedAlert} />
          </div>
      </div>
    </main>
    </ErrorBoundary>
  );
}
