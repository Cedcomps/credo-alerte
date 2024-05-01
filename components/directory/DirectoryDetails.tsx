'use client'
import React, { useEffect, useState } from "react";
import {
  Copy,
  LineChart,
} from 'lucide-react'

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

interface ContactDetailsProps {
    selectedContact: any; // Remplacez 'any' par le type approprié pour selectedContact
  }

  export default function ContactDetails({ selectedContact }: ContactDetailsProps) {
    if (!selectedContact) {
        return (
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-start bg-muted/50">
              <div className="grid gap-0.5">
                <CardTitle className="group flex items-center gap-2 text-lg">
                  No contact selected
                </CardTitle>
                <CardDescription>
                  Please select a contact from the list to view its details.
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
        );
      }  
    return (
            <Card className="overflow-hidden">
              <CardHeader className="flex flex-row items-start bg-muted/50">
                <div className="grid gap-0.5">
                  <CardTitle className="group flex items-center gap-2 text-lg">
                  {selectedContact ? selectedContact.contact_name : 'No contact selected'}
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <Copy className="h-3 w-3" />
                      <span className="sr-only">Copy Contact ID</span>
                    </Button>
                  </CardTitle>
                  <CardDescription>{selectedContact.contact_description}</CardDescription>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  <Button size="sm" variant="outline" className="h-8 gap-1">
                    <LineChart className="h-3.5 w-3.5" />
                    <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                      Edit Contact
                    </span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6 text-sm">
                <div className="grid gap-3">
                  <div className="font-semibold">Contact Details</div>
                  <ul className="grid gap-3">
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                      Number of recipients</span>
                      <span>250</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                      Total number of notifications sent</span>
                      <span>49</span>
                    </li>
                  </ul>
                  <Separator className="my-2" />
                  <ul className="grid gap-3">
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Membership groups </span>
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
                      <span>Liam Johnson</span>
                    </p>
                  </div>
                  <div className="grid auto-rows-max gap-3">
                    <div className="font-semibold">Billing Information</div>
                    <div className="text-muted-foreground">
                      Same as shipping address
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-row items-center bContact-t bg-muted/50 px-6 py-3">
                <div className="text-xs text-muted-foreground">
                  Updated <time dateTime="2023-11-23">{selectedContact ? selectedContact.updated_at : 'No update'}</time>
                </div>
              </CardFooter>
            </Card>
        );
  }