'use client'
import React, { useState } from "react";
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
import { createClient } from "@/utils/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { ErrorBoundary } from "../ErrorBoundary";

interface EditGroupProps {
  selectedGroup: any;
}

export default function EditGroup({ selectedGroup }: EditGroupProps) {
  const [groupName, setGroupName] = useState(selectedGroup.group_name || '');
  const [groupDescription, setGroupDescription] = useState(selectedGroup.group_description || '');
  const [groupNameError, setGroupNameError] = useState('');
  const { toast } = useToast();
  const supabase = createClient();

  const handleSaveGroup = async () => {
    if (groupName.trim() === '') {
      setGroupNameError('Group name is required.');
      return;
    }

    const updatedGroup = {
      ...selectedGroup,
      group_name: groupName,
      group_description: groupDescription,
    };

    const { data, error } = await supabase
      .from('groups')
      .update(updatedGroup)
      .eq('id', selectedGroup.id);

    if (error) {
      console.error('Error updating group:', error);
    } else {
      toast({
        title: "Group updated",
        description: "The group has been successfully updated.",
      });
      setOpen(false);
    }
  };

  const [open, setOpen] = useState(false);

  return (
    <ErrorBoundary>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <Pencil className="h-3.5 w-3.5" />
            <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
              Edit Group
            </span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Edit Group</SheetTitle>
            <SheetDescription>
              Make changes to the group here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
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
                Description
              </Label>
              <Input
                id="groupDescription"
                value={groupDescription}
                onChange={(e) => setGroupDescription(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="button" variant={"secondary"}>
                Cancel
              </Button>
            </SheetClose>
            <Button type="submit" onClick={handleSaveGroup} disabled={!groupName}>
              Save changes
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </ErrorBoundary>
  );
}
