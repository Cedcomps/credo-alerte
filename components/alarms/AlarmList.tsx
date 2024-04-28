'use client'
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";
import { ListFilter } from "lucide-react";
import { format, formatDistanceToNow, parseISO } from 'date-fns';

import AlarmSwitch from "@/components/alarms/AlarmSwitch";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from 'next/navigation';

export default function AlarmList(){
    const supabase = createClient()
    const [alarms, setAlarms] = useState<any[]>([]);
    const [filter, setFilter] = useState('all');
    const [sortBy, setSortBy] = useState('last_updated');
    
    const handleSortByChange = (value: string) => {
        setSortBy(value);
    };
      
    useEffect(() => {
        const fetchAlarms = async () => {
            let query = supabase
                .from('alarms')
                .select('*');
      
            if (sortBy === 'last_updated') {
                query = query.order('updated_at', { ascending: false });
            } else if (sortBy === 'last_created') {
                query = query.order('created_at', { ascending: false });
            } else if (sortBy === 'name_asc') {
                query = query.order('alarm_name', { ascending: true });
            } else if (sortBy === 'name_desc') {
                query = query.order('alarm_name', { ascending: false });
            }
      
            const { data, error } = await query.order('created_at', { ascending: false });
      
            if (error) {
                console.error('Error fetching alarms:', error);
            } else {
                setAlarms(data);
            }
        };
      
        fetchAlarms();
    }, [filter, sortBy]);
      
    const filteredAlarms = alarms.filter((alarm) => {
        if (filter === 'active') {
            return alarm.status === true;
        } else if (filter === 'inactive') {
            return alarm.status === false;
        }
        return true;
    });

    const handleAlarmToggle = (alarmId: string, newStatus: boolean) => {
        setAlarms((prevAlarms) =>
          prevAlarms.map((alarm) =>
            alarm.id === alarmId ? { ...alarm, status: newStatus } : alarm
          )
        );
      };
    
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
    const openAlarm = async (alarmId: string, alarmName: string) => {
        router.push(`/dashboard/alarms/${alarmId}?name=${encodeURIComponent(alarmName)}`);
      };
      
      
      const duplicateAlarm = async (alarmId: string) => {
        const { data: alarm, error } = await supabase
          .from('alarms')
          .select('*')
          .eq('id', alarmId)
          .single();
      
        if (error) {
          console.error('Error fetching alarm:', error);
          return;
        }
      
        // Générer un nouvel ID unique compatible avec bigint
        const { data: maxIdResult, error: maxIdError } = await supabase
          .from('alarms')
          .select('id')
          .order('id', { ascending: false })
          .limit(1)
          .single();
      
        if (maxIdError) {
          console.error('Error fetching max ID:', maxIdError);
          return;
        }
      
        const newAlarmId = maxIdResult ? maxIdResult.id + 1 : 1;
      
        const { data: duplicatedAlarm, error: insertError } = await supabase
          .from('alarms')
          .insert({ ...alarm, id: newAlarmId, alarm_name: `${alarm.alarm_name} (copy)` })
          .select('*')
          .single();
      
        if (insertError) {
          console.error('Error duplicating alarm:', insertError);
        } else {
          setAlarms([...alarms, duplicatedAlarm]);
        }
      };
      
      const deleteAlarm = async (alarmId: string) => {
        // Logique pour supprimer l'alarme avec l'ID spécifié
        const { error } = await supabase
          .from('alarms')
          .delete()
          .eq('id', alarmId);
      
        if (error) {
          console.error('Error deleting alarm:', error);
        } else {
          setAlarms(alarms.filter((alarm) => alarm.id !== alarmId));
        }
      };

    return (
        <Tabs defaultValue="all" onValueChange={(value) => setFilter(value)}>
            <div className="flex items-center">
                <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="inactive">Inactive</TabsTrigger>
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
            <TabsContent value="all">
                <Card x-chunk="dashboard-05-chunk-3">
                    <CardHeader className="px-7">
                        <CardTitle>Alarms</CardTitle>
                        <CardDescription>
                            All your alarms from your account.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Alarm Name</TableHead>
                                    <TableHead className="hidden sm:table-cell">
                                        Description
                                    </TableHead>
                                    <TableHead className="hidden sm:table-cell">
                                        Status
                                    </TableHead>
                                    <TableHead className="hidden sm:table-cell">
                                        Created
                                    </TableHead>
                                    <TableHead className="hidden md:table-cell">
                                        Deployment
                                    </TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredAlarms.map((alarm) => (
                                    <TableRow key={alarm.id}>
                                        <TableCell>
                                            <div className="font-medium">{alarm.alarm_name}</div>
                                            <div className="hidden text-sm text-muted-foreground md:inline">
                                                Last updated {formatDistanceToNow(parseISO(alarm.updated_at), { addSuffix: true })}
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            {alarm.alarm_description}
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            <Badge className="text-xs">
                                                {alarm.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            {format(new Date(alarm.created_at), 'd MMMM, yyyy')}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <AlarmSwitch alarmId={alarm.id} onToggle={handleAlarmToggle} />
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <EllipsisVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem onClick={() => openAlarm(alarm.id, alarm.alarm_name)}>Open</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => duplicateAlarm(alarm.id)}>Duplicate</DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem onClick={() => deleteAlarm(alarm.id)}>Delete</DropdownMenuItem>
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
            <TabsContent value="active">
                <Card x-chunk="dashboard-05-chunk-3">
                    <CardHeader className="px-7">
                        <CardTitle>Active Alarms</CardTitle>
                        <CardDescription>
                            Recent active alarms from your account.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Alarm Name</TableHead>
                                    <TableHead className="hidden sm:table-cell">
                                        Description
                                    </TableHead>
                                    <TableHead className="hidden sm:table-cell">
                                        Status
                                    </TableHead>
                                    <TableHead className="hidden sm:table-cell">
                                        Created
                                    </TableHead>
                                    <TableHead className="hidden md:table-cell">
                                        Deployment
                                    </TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredAlarms.map((alarm) => (
                                    <TableRow key={alarm.id}>
                                        <TableCell>
                                            <div className="font-medium">{alarm.alarm_name}</div>
                                            <div className="hidden text-sm text-muted-foreground md:inline">
                                                Last updated {formatDistanceToNow(parseISO(alarm.updated_at), { addSuffix: true })}
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            {alarm.alarm_description}
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            <Badge className="text-xs">
                                                {alarm.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            {format(new Date(alarm.created_at), 'd MMMM, yyyy')}
                                        </TableCell>
                                        <TableCell className="text-right">
                                        <AlarmSwitch alarmId={alarm.id} onToggle={handleAlarmToggle} />

                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <EllipsisVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem onClick={() => openAlarm(alarm.id, alarm.alarm_name)}>Open</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => duplicateAlarm(alarm.id)}>Duplicate</DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem onClick={() => deleteAlarm(alarm.id)}>Delete</DropdownMenuItem>
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
            <TabsContent value="inactive">
                <Card x-chunk="dashboard-05-chunk-3">
                    <CardHeader className="px-7">
                        <CardTitle>Inactive Alarms</CardTitle>
                        <CardDescription>
                            Inactive alarms in your account.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Alarm Name</TableHead>
                                    <TableHead className="hidden sm:table-cell">
                                        Description
                                    </TableHead>
                                    <TableHead className="hidden sm:table-cell">
                                        Status
                                    </TableHead>
                                    <TableHead className="hidden sm:table-cell">
                                        Created
                                    </TableHead>
                                    <TableHead className="hidden md:table-cell">
                                        Deployment
                                    </TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredAlarms.map((alarm) => (
                                    <TableRow key={alarm.id}>
                                        <TableCell>
                                            <div className="font-medium">{alarm.alarm_name}</div>
                                            <div className="hidden text-sm text-muted-foreground md:inline">
                                                Last updated {formatDistanceToNow(parseISO(alarm.updated_at), { addSuffix: true })}
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            {alarm.alarm_description}
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            <Badge className="text-xs">
                                                {alarm.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            {format(new Date(alarm.created_at), 'd MMMM, yyyy')}
                                        </TableCell>
                                        <TableCell className="text-right">
                                        <AlarmSwitch alarmId={alarm.id} onToggle={handleAlarmToggle} />
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <EllipsisVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem onClick={() => openAlarm(alarm.id, alarm.alarm_name)}>Open</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => duplicateAlarm(alarm.id)}>Duplicate</DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem onClick={() => deleteAlarm(alarm.id)}>Delete</DropdownMenuItem>
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
    )
}
