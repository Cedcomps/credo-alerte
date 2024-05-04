'use client'
import React, { useEffect, useState } from "react";
import { Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import 'react-phone-number-input/style.css'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import { createClient } from "@/utils/supabase/client";
import { ErrorBoundary } from "../ErrorBoundary";
import { useToast } from "@/components/ui/use-toast";

interface EditContactProps {
  selectedContact: any;
}

export default function EditContact({ selectedContact }: EditContactProps) {
  const [lastName, setLastName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState<string | undefined>()
  const [lastNameError, setLastNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const { toast } = useToast();

  useEffect(() => {
    if (selectedContact) {
      setLastName(selectedContact.contact_last_name || '')
      setFirstName(selectedContact.contact_first_name || '')
      setEmail(selectedContact.contact_email || '')
      setPhone(selectedContact.contact_phone || '')
    }
  }, [selectedContact])

  const supabase = createClient()

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSaveContact = async () => {
    let isValid = true;

    if (lastName.trim() === "") {
      setLastNameError("Last name is required.");
      isValid = false;
    } else {
      setLastNameError("");
    }

    if (email.trim() === "") {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Invalid email address.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!isValid) {
      return;
    }

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
    } else {
      toast({
        title: "Contact updated",
        description: "The contact has been successfully updated.",
      });
      // Fermer le sheet après la mise à jour réussie
      setOpen(false);
    }
  }

  const [open, setOpen] = useState(false);

  return (
    <ErrorBoundary>
      <Sheet open={open} onOpenChange={setOpen}>
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
                Last Name <span className="text-red-500">*</span>
              </Label>
              <div className="col-span-3">
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className={lastNameError ? "border-red-500" : ""}
                />
                {lastNameError && <p className="text-red-500 text-sm mt-1">{lastNameError}</p>}
              </div>
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
                Email <span className="text-red-500">*</span>
              </Label>
              <div className="col-span-3">
                <Input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={emailError ? "border-red-500" : ""}
                />
                {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
              </div>
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
            <Button type="submit" onClick={handleSaveContact} disabled={!lastName || !validateEmail(email)}>
              Save changes
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </ErrorBoundary>
  );
}
