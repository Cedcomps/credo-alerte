'use client'
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format, parseISO } from 'date-fns';
import { useParams } from 'next/navigation';
import ErrorMessage from '@/components/ErrorMessage';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/Spinner';
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
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function ContactDetails() {
  const params = useParams();
  const contactId = params.contactId;
  const supabase = createClient();
  const [contact, setContact] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    const fetchContact = async () => {
      setLoading(true);
      setError(null);

      if (contactId) {
        const { data, error } = await supabase
          .from('contacts')
          .select('*')
          .eq('id', contactId)
          .single();

        if (error) {
          console.error('Error fetching contact:', error);
          setError('Failed to fetch contact details. Please try again.');
        } else {
          setContact(data);
          setLastName(data.contact_last_name);
          setFirstName(data.contact_first_name);
        }
      }

      setLoading(false);
    };

    fetchContact();
  }, [contactId]);

  const handleBack = () => {
    router.push('/dashboard/directory');
  };

  const handleEditContact = () => {
    setIsEditingContact(true);
  };

  const handleSaveContact = async () => {
    const updatedContact = {
      ...contact,
      contact_first_name: firstName,
      contact_last_name: lastName,
    };

    const { data, error } = await supabase
      .from('contacts')
      .update(updatedContact)
      .eq('id', contactId);

    if (error) {
      console.error('Error updating contact:', error);
    } else {
      setContact(updatedContact);
      setIsEditingContact(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditingContact(false);
    setLastName(contact.contact_last_name);
    setFirstName(contact.contact_first_name);
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-4">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle>{contact.contact_name}</CardTitle>
            <CardDescription>Contact Details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <span className="font-semibold">Last Name:</span> {contact.contact_last_name}
              </div>
              <div>
                <span className="font-semibold">First Name:</span> {contact.contact_first_name}
              </div>
              <div>
                <span className="font-semibold">Status:</span> <Badge>{contact.status ? 'Active' : 'Inactive'}</Badge>
              </div>
              <div>
                <span className="font-semibold">Created At:</span> {format(parseISO(contact.created_at), 'MMMM d, yyyy')}
              </div>
              <div>
                <span className="font-semibold">Updated At:</span> {format(parseISO(contact.updated_at), 'MMMM d, yyyy')}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleBack}>Back to Contacts</Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button>Edit Contact</Button>
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
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button type="button" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                  </SheetClose>
                  <Button type="submit" onClick={handleSaveContact}>
                    Save changes
                  </Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
