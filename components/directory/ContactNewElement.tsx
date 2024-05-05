import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { SquarePlus } from "lucide-react";
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input"
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from "@/components/ui/sheet";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import 'react-phone-number-input/style.css'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import { Toaster } from "../ui/toaster";

export default function ContactNewElement() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [contactLastName, setContactLastName] = useState("");
  const [contactFirstName, setContactFirstName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState<string | undefined>()
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [isContact, setIsContact] = useState(false);
  const { toast } = useToast();
  const [emailError, setEmailError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [groupNameError, setGroupNameError] = useState("");

  const handleCreateNewContactClick = () => {
    setIsContact(true);
    setOpen(true);
  };

  const handleCreateNewGroupClick = () => {
    setIsContact(false);
    setOpen(true);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSaveContact = async () => {
    let isValid = true;

    if (isContact) {
      if (contactLastName.trim() === "") {
        setLastNameError("Last name is required.");
        isValid = false;
      } else {
        setLastNameError("");
      }

      if (contactEmail.trim() === "") {
        setEmailError("Email is required.");
        isValid = false;
      } else if (!validateEmail(contactEmail)) {
        setEmailError("Invalid email address.");
        isValid = false;
      } else {
        setEmailError("");
      }
    } else {
      if (groupName.trim() === "") {
        setGroupNameError("Group name is required.");
        isValid = false;
      } else {
        setGroupNameError("");
      }
    }

    if (!isValid) {
      return;
    }

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      console.log('No authenticated user');
      return;
    }

    if (isContact) {
      const { data, error } = await supabase
        .from("contacts")
        .insert([{ 
          user_id: user.id,
          contact_last_name: contactLastName, 
          contact_first_name: contactFirstName, 
          contact_email: contactEmail, 
          contact_phone: contactPhone 
        }]);

      if (error) {
        console.error("Error creating contact:", error);
      } else {
        toast({
          title: "Contact created",
          description: "The contact has been successfully added to the database.",
        });
        setOpen(false);
        supabase
        .channel('public:contacts')
        .send({ type: 'broadcast', event: 'INSERT' });
        resetForm();
      }
    } else {
      const { data, error } = await supabase
        .from("groups")
        .insert([{ 
          user_id: user.id,
          group_name: groupName,
          group_description: groupDescription
        }]);

      if (error) {
        console.error("Error creating group:", error);
      } else {
        toast({
          title: "Group created",
          description: "The group has been successfully added to the database.",
        });
        setOpen(false);
        
        resetForm();
        
      }
    }
  };

  const resetForm = () => {
    setContactLastName("");
    setContactFirstName("");
    setContactEmail("");
    setContactPhone("");
    setGroupName("");
    setGroupDescription("");
    setEmailError("");
    setLastNameError("");
    setGroupNameError("");
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          Manage your directory by adding new contact and adding them to group to facilitate contact management.
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button onClick={handleCreateNewContactClick}>
              <SquarePlus className="h-4 w-4" />
              &nbsp; Create New Contact
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>{isContact ? "Create Contact" : "Create Group"}</SheetTitle>
              <SheetDescription>
                {isContact
                  ? "Fill in the contact details and click save when you're done."
                  : "Enter the group details and click save when you're done."}
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              {isContact ? (
                <>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="contactLastName" className="text-right">
                      Last Name <span className="text-red-500">*</span>
                    </Label>
                    <div className="col-span-3">
                      <Input
                        id="contactLastName"
                        value={contactLastName}
                        onChange={(e) => setContactLastName(e.target.value)}
                        className={lastNameError ? "border-red-500" : ""}
                      />
                      {lastNameError && <p className="text-red-500 text-sm mt-1">{lastNameError}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="contactFirstName" className="text-right">
                      First Name
                    </Label>
                    <Input
                      id="contactFirstName"
                      value={contactFirstName}
                      onChange={(e) => setContactFirstName(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="contactEmail" className="text-right">
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <div className="col-span-3">
                      <Input
                        id="contactEmail"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className={emailError ? "border-red-500" : ""}
                      />
                      {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="contactPhone" className="text-right">
                      Phone
                    </Label>
                    <PhoneInput
                      id="contactPhone"
                      value={contactPhone}
                      onChange={setContactPhone}
                      className="col-span-3"
                      defaultCountry="FR"
                      error={
                        contactPhone
                          ? isValidPhoneNumber(contactPhone)
                            ? undefined
                            : "Invalid phone number"
                          : "Phone number required"
                      }
                      countrySelectProps={{
                        className: "w-full shadow-md rounded-lg border focus-primary",
                      }}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="groupName" className="text-right">
                      Group Name <span className="text-red-500">*</span>
                    </Label>
                    <div className="col-span-3">
                      <Input
                        id="groupName"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        className={groupNameError ? "border-red-500" : ""}
                      />
                      {groupNameError && <p className="text-red-500 text-sm mt-1">{groupNameError}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="groupDescription" className="text-right">
                      Group Description
                    </Label>
                    <Input
                      id="groupDescription"
                      value={groupDescription}
                      onChange={(e) => setGroupDescription(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                </>
              )}
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="button" variant={"secondary"}>
                  Cancel
                </Button>
              </SheetClose>
              <Button
                type="submit"
                onClick={handleSaveContact}
                disabled={
                  (isContact && (!contactLastName || !validateEmail(contactEmail))) ||
                  (!isContact && !groupName)
                }
              >
                Save
              </Button>
              </SheetFooter>
          </SheetContent>
        </Sheet>

        <Button variant={'secondary'} onClick={handleCreateNewGroupClick}>
          <SquarePlus className="h-4 w-4" />
          &nbsp; Create New Group
        </Button>
      </CardFooter>
    </Card>
  );
}
