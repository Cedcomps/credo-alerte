// DirectoryDetails.tsx
import React from "react";
import { Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ErrorBoundary } from "../ErrorBoundary";
import EditContact from "./EditContact";
import EditGroup from "./EditGroup";


interface DirectoryDetailsProps {
  selectedContact: any;
}

export default function DirectoryDetails({ selectedContact }: DirectoryDetailsProps) {
  if (!selectedContact) {
    return (
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-start bg-muted/50">
          <div className="grid gap-0.5">
            <CardTitle className="group flex items-center gap-2 text-lg">
              No contact or group selected
            </CardTitle>
            <CardDescription>
              Please select a contact or a group from the list to view its details.
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
    );
  }
  const isGroup = 'group_name' in selectedContact;

  return (
    <ErrorBoundary>
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-start bg-muted/50">
          <div className="grid gap-0.5">
            <CardTitle className="group flex items-center gap-2 text-lg">
              {isGroup ? selectedContact.group_name : `${selectedContact.contact_last_name} ${selectedContact.contact_first_name}`}
              <Button
                size="icon"
                variant="outline"
                className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <Copy className="h-3 w-3" />
                <span className="sr-only">Copy ID</span>
              </Button>
            </CardTitle>
            <CardDescription>
              {isGroup ? selectedContact.group_description : selectedContact.contact_first_name}
            </CardDescription>
          </div>
          <div className="ml-auto flex items-center gap-1">
            {isGroup ? (
              <EditGroup selectedGroup={selectedContact} />
            ) : (
              <EditContact selectedContact={selectedContact} />
            )}
          </div>
        </CardHeader>
        
        <CardContent className="p-6 text-sm">
          <div className="grid gap-3">
            <div className="font-semibold">Contact Details</div>
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Email</span>
                <span>{selectedContact.contact_email}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Phone</span>
                <span>{selectedContact.contact_phone}</span>
              </li>
            </ul>
            <Separator className="my-2" />
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Related groups </span>
                <span>299.00</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Failed notifications</span>
                <span>5.00</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>$25.00</span>
              </li>
              <li className="flex items-center justify-between font-semibold">
                <span className="text-muted-foreground">Total</span>
                <span>$329.00</span>
              </li>
            </ul>
          </div>
          <Separator className="my-4" />
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-3">
              <div className="font-semibold">Related alarms</div>
              <p className="grid gap-0.5 not-italic text-muted-foreground">
                <span>My alarms joined</span>
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-row items-center bContact-t bg-muted/50 px-6 py-3">
          <div className="text-xs text-muted-foreground">
            Updated <time dateTime="2023-11-23">{selectedContact.updated_at}</time>
          </div>
        </CardFooter>
      </Card>
    </ErrorBoundary>
  );
}
