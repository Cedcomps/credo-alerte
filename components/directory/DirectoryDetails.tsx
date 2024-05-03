'use client'
import React, { useEffect, useState } from "react";
import {
  Copy,
  Pencil,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from '@/components/ui/separator'
import { ErrorBoundary } from "../ErrorBoundary";
import 'react-phone-number-input/style.css'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import { createClient } from "@/utils/supabase/client";

interface ContactDetailsProps {
  selectedContact: any;
}

export default function ContactDetails({ selectedContact }: ContactDetailsProps) {
  const [lastName, setLastName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState<string | undefined>()

  useEffect(() => {
    if (selectedContact) {
      setLastName(selectedContact.contact_last_name || '')
      setFirstName(selectedContact.contact_first_name || '')
      setEmail(selectedContact.contact_email || '')
      setPhone(selectedContact.contact_phone || '')
    }
  }, [selectedContact])

  const supabase = createClient()

  const handleSaveContact = async () => {
    const updatedContact = {
      ...selectedContact,
      contact_first_name: firstName,
      contact_last_name: lastName,
      contact_email: email,
      contact_phone: phone?.toString() || '',
    }

    const { data, error } = await supabase
      .from('contacts')
      .update(updatedContact)
      .eq('id', selectedContact.id)

    if (error) {
      console.error('Error updating contact:', error)
    }
  }

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

  return (
    <ErrorBoundary>
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-start bg-muted/50">
          <div className="grid gap-0.5">
            <CardTitle className="group flex items-center gap-2 text-lg">
              {selectedContact.contact_last_name}
              <Button
                size="icon"
                variant="outline"
                className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <Copy className="h-3 w-3" />
                <span className="sr-only">Copy Contact ID</span>
              </Button>
            </CardTitle>
            <CardDescription>{selectedContact.contact_first_name}</CardDescription>
          </div>
          <div className="ml-auto flex items-center gap-1">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="sm" variant="outline" className="h-8 gap-1">
                  <Pencil className="h-3.5 w-3.5" />
                  <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                    Edit Contact
                  </span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Edit Contact</SheetTitle>
                  <SheetDescription>
                    Make changes to the contact here. Click save when you're done.
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="lastName" className="text-right">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="firstName" className="text-right">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phone" className="text-right">
                      Phone
                    </Label>
                    <PhoneInput
                      id="phone"
                      value={phone}
                      onChange={setPhone}
                      className="col-span-3"
                      defaultCountry="FR"
                      error={phone ? (isValidPhoneNumber(phone) ? undefined : 'Invalid phone number') : 'Phone number required'}
                      countrySelectProps={{
                        className: "w-full shadow-md rounded-lg border focus-primary",
                      }}
                    />
                  </div>
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button type="button" variant={"secondary"}>
                      Cancel
                    </Button>
                  </SheetClose>
                  <Button type="submit" onClick={handleSaveContact}>
                    Save changes
                  </Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
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
