'use client'
import DashboardNewElement from "@/components/dashboard/DashboardNewElement";
import { SetStateAction, useState } from "react";
import DirectoryList from "@/components/directory/DirectoryList";
import DirectoryDetails from "@/components/directory/DirectoryDetails";
import { ErrorBoundary } from '@/components/ErrorBoundary';
import ContactCount from "@/components/directory/ContactCount";
import ContactNewElement from "@/components/directory/ContactNewElement";

export default function DashboardDirectory() {
  const [selectedContact, setSelectedContact] = useState(null);

  const handleContactClick = (contact: any) => {
    setSelectedContact(contact);
  };

  return (
    <ErrorBoundary>
      <main className="flex flex-col gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        {/* DashboardNewElement */}
        <div className="md:flex md:gap-6">  
          <ContactNewElement/>
          <ContactCount description="Number of contacts" />
        </div>

        {/* ContactList et ContactDetails */}
        <div className="md:flex md:gap-4">
          <div className="md:w-2/3">
            <DirectoryList onContactClick={handleContactClick} />
          </div>
          <div className="md:w-1/3">
            <DirectoryDetails
              selectedContact={selectedContact}
            />
          </div>
        </div>
      </main>
    </ErrorBoundary>
  );
}
