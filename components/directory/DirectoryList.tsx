'use client'
import { v4 as uuidv4 } from 'uuid';
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, User, Users } from "lucide-react";
import { ListFilter } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from 'next/navigation';
import { Checkbox } from '../ui/checkbox';
import { ErrorBoundary } from '../ErrorBoundary';
import { Spinner } from '@/components/Spinner'
import EditContact from './EditContact';


interface DirectoryListProps {
  onContactClick: (contact: any) => void;
}
export default function DirectoryList({ onContactClick }: DirectoryListProps) {
  const supabase = createClient()
  const [contacts, setContacts] = useState<any[]>([]);
  const [groups, setGroups] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState('last_updated');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleSortByChange = (value: string) => {
    setSortBy(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setIsLoading(false);
        setError('Vous devez être authentifié pour voir vos contacts.');
        return;
      }

      try {
        let contactsQuery = supabase
          .from('contacts')
          .select('*')
          .eq('user_id', user.id);
        
        let groupsQuery = supabase
          .from('groups')
          .select(`
            *,
            contact_count:contact_group(count)
          `)
          .eq('user_id', user.id)
          .order('updated_at', { ascending: false });

        if (sortBy === 'last_updated') {
          contactsQuery = contactsQuery.order('updated_at', { ascending: false });
          groupsQuery = groupsQuery.order('updated_at', { ascending: false });
        } else if (sortBy === 'last_created') {
          contactsQuery = contactsQuery.order('created_at', { ascending: false });
          groupsQuery = groupsQuery.order('created_at', { ascending: false });
        } else if (sortBy === 'name_asc') {
          contactsQuery = contactsQuery.order('contact_last_name', { ascending: true });
          groupsQuery = groupsQuery.order('group_name', { ascending: true });
        } else if (sortBy === 'name_desc') {
          contactsQuery = contactsQuery.order('contact_last_name', { ascending: false });
          groupsQuery = groupsQuery.order('group_name', { ascending: false });
        }

        const { data: contactsData, error: contactsError } = await contactsQuery;
        const { data: groupsData, error: groupsError } = await groupsQuery;

        if (contactsError) {
          setError('Error fetching contacts: ' + contactsError.message);
        } else {
          setContacts(contactsData);
        }

        if (groupsError) {
          setError('Error fetching groups: ' + groupsError.message);
        } else {
          setGroups(groupsData);
        }
        
      } catch (error) {
        setError('Error fetching data:');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [sortBy]);

  // if (isLoading) {
  //   return <Spinner size="large">Loading contacts...</Spinner>
  // }


  const getSortByLabel = (sortBy: string) => {
    switch (sortBy) {
      case 'last_updated':
        return 'last updated';
      case 'last_created':
        return 'last created';
      case 'name_asc':
        return 'name (A-Z)';
      case 'name_desc':
        return 'name (Z-A)';
      default:
        return 'Sort by';
    }
  };

  const router = useRouter();
  const openContact = async (contactId: string, contactName: string) => {
    router.push(`/dashboard/directory/contacts/${contactId}?name=${encodeURIComponent(contactName)}`);
  };

  const duplicateContact = async (contactId: string) => {
    const { data: contact, error } = await supabase
      .from('contacts')
      .select('*')
      .eq('id', contactId)
      .single();

    if (error) {
      console.error('Error fetching contact:', error);
      return;
    }

    // Générer un nouvel ID unique avec uuid
    const newContactId = uuidv4();

    // Obtenir la date et l'heure actuelles au format ISO 8601
    const now = new Date().toISOString();

    const { data: duplicatedContact, error: insertError } = await supabase
      .from('contacts')
      .insert({
        ...contact,
        id: newContactId,
        contact_first_name: `${contact.contact_first_name} (copy)`,
        contact_last_name: `${contact.contact_last_name} (copy)`,
        created_at: now,
        updated_at: now
      })
      .select('*')
      .single();

    if (insertError) {
      console.error('Error duplicating contact:', insertError);
    } else {
      setContacts([...contacts, duplicatedContact]);
    }
  };

  const deleteContact = async (contactId: string) => {
    const { error } = await supabase
      .from('contacts')
      .delete()
      .eq('id', contactId);

    if (error) {
      console.error('Error deleting contact:', error);
    } else {
      setContacts(contacts.filter((contact) => contact.id !== contactId));
    }
  };

  return (
    <ErrorBoundary>
      <Tabs defaultValue="contacts">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
            <TabsTrigger value="groups">Groups</TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 gap-1 text-sm"
                >
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only">
                    Sort by {getSortByLabel(sortBy)}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={sortBy === 'last_updated'}
                  onSelect={() => handleSortByChange('last_updated')}
                >
                  Last updated
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={sortBy === 'last_created'}
                  onSelect={() => handleSortByChange('last_created')}
                >
                  Last created
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={sortBy === 'name_asc'}
                  onSelect={() => handleSortByChange('name_asc')}
                >
                  Name (A-Z)
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={sortBy === 'name_desc'}
                  onSelect={() => handleSortByChange('name_desc')}
                >
                  Name (Z-A)
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <TabsContent value="contacts">
          <Card>
            <CardHeader className="px-7">
              <CardTitle><User />Contacts</CardTitle>
              <CardDescription>
                List of your contacts from your account.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">
                    <Checkbox id="select-all" />
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Email
                  </TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Phone
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts.map((contact) => (
                  <TableRow
                    key={contact.id}
                    onClick={() => onContactClick(contact)}
                  >
                    <TableCell>
                      <Checkbox id="select-all" />
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{contact.contact_last_name} {contact.contact_first_name}</div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {contact.contact_email}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {contact.contact_phone}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Edit menu</span>
                            <EllipsisVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => openContact(contact.id, contact.contact_first_name)}>Open</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => duplicateContact(contact.id)}>Duplicate</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className='text-destructive' onClick={() => deleteContact(contact.id)}>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="groups">
        <Card>
          <CardHeader className="px-7">
            <CardTitle><Users />Groups</CardTitle>
            <CardDescription>
              Groups of contacts in your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox id="select-all" />
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    #contacts
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {groups.map((group) => (
                  <TableRow
                    key={group.id}
                    onClick={() => onContactClick(group)}
                  >
                    <TableCell>
                      <Checkbox id="select-all" />
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{group.group_name}</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{group.group_description}</div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {group.contact_count[0].count}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Edit menu</span>
                            <EllipsisVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  </ErrorBoundary>
  )
}
