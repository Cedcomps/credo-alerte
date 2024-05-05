'use client'
import { v4 as uuidv4 } from 'uuid';
import React, { useEffect, useState } from "react";
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
import { Bell, BellRing, EllipsisVertical } from "lucide-react";
import { ListFilter } from "lucide-react";
import { format, formatDistanceToNow, parseISO } from 'date-fns';
import AlertSwitch from "@/components/alerts/AlertSwitch";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from 'next/navigation';
import { ErrorBoundary } from '../ErrorBoundary';
import AlertTrigger from './AlertTrigger';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

interface AlertListProps {
    onAlertClick: (alert: any) => void;
  }
  
  export default function AlertList({ onAlertClick }: AlertListProps) {
    const supabase = createClient()
    const [alerts, setAlerts] = useState<any[]>([]);
    const [filter, setFilter] = useState('all');
    const [sortBy, setSortBy] = useState('last_updated');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [alertToDelete, setAlertToDelete] = useState<string | null>(null);


    const handleSortByChange = (value: string) => {
        setSortBy(value);
    };
    
      
    useEffect(() => {
        const fetchAlerts = async () => {
          const { data: { user } } = await supabase.auth.getUser();
      
          if (!user) {
            setIsLoading(false);
            setError('Vous devez être authentifié pour voir vos alertes.');
            return;
          }
      
          try {
            let query = supabase
              .from('alerts')
              .select('*')
              .eq('user_id', user.id);
    
            if (sortBy === 'last_updated') {
              query = query.order('updated_at', { ascending: false });
            } else if (sortBy === 'last_created') {
              query = query.order('created_at', { ascending: false });
            } else if (sortBy === 'name_asc') {
              query = query.order('alert_name', { ascending: true });
            } else if (sortBy === 'name_desc') {
              query = query.order('alert_name', { ascending: false });
            }
    
            const { data, error } = await query.order('created_at', { ascending: false });
    
            if (error) {
              setError('Error fetching alerts: ' + error.message);
            } else {
              setAlerts(data);
            }
          } catch (error) {
            setError('Error fetching alerts:');
          } finally {
            setIsLoading(false);
          }
        };
    
        fetchAlerts();
      }, [filter, sortBy]);
//  Filtre des alertes actives ou inactives ou all 
    const filteredAlerts = alerts.filter((alert) => {
        if (filter === 'active') {
            return alert.status === true;
        } else if (filter === 'inactive') {
            return alert.status === false;
        }
        return true;
    });
// Toggle sur l'actication ou non de l'alerte
    const handleAlertToggle = (alertId: string, newStatus: boolean) => {
        setAlerts((prevAlerts) =>
          prevAlerts.map((alert) =>
            alert.id === alertId ? { ...alert, status: newStatus } : alert
          )
        );
      };
// declenchement d'alert
    const handleAlertTrigger = (alertId: string) => {
    // Logique pour déclencher l'alerte avec l'ID spécifié
    console.log('Triggering alert with ID:', alertId);
    };
      
// tri des alertes
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
    const openAlert = async (alertId: string, alertName: string) => {
        router.push(`/dashboard/alerts/${alertId}?name=${encodeURIComponent(alertName)}`);
      };
    const duplicateAlert = async (alertId: string) => {
    const { data: alert, error } = await supabase
        .from('alerts')
        .select('*')
        .eq('id', alertId)
        .single();
    
    if (error) {
        console.error('Error fetching alert:', error);
        return;
    }
    
    // Générer un nouvel ID unique avec uuid
    const newAlertId = uuidv4();
    
    // Obtenir la date et l'heure actuelles au format ISO 8601
    const now = new Date().toISOString();
    
    const { data: duplicatedAlert, error: insertError } = await supabase
        .from('alerts')
        .insert({ 
        ...alert, 
        id: newAlertId, 
        alert_name: `${alert.alert_name} (copy)`,
        created_at: now,
        updated_at: now
        })
        .select('*')
        .single();
    
    if (insertError) {
        console.error('Error duplicating alert:', insertError);
    } else {
        setAlerts([...alerts, duplicatedAlert]);
    }
    };
       
    const deleteAlert = async (alertId: string) => {
        setAlertToDelete(alertId);
      };
    
      const handleConfirmDelete = async () => {
        if (alertToDelete) {
          const { error } = await supabase
            .from('alerts')
            .delete()
            .eq('id', alertToDelete);
    
          if (error) {
            console.error('Error deleting alert:', error);
          } else {
            setAlerts(alerts.filter((alert) => alert.id !== alertToDelete));
            setAlertToDelete(null);
          }
        }
      };
    
      const handleCancelDelete = () => {
        setAlertToDelete(null);
      };
    return (
        <ErrorBoundary>
           <AlertDialog open={alertToDelete !== null} onOpenChange={handleCancelDelete}>
                <AlertDialogTrigger>
                {/* Rien à afficher ici, le déclencheur est géré par le bouton "Delete" */}
                </AlertDialogTrigger>
                <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                    This action will permanently remove the alert from your list. This operation is irreversible.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirmDelete}>Confirm</AlertDialogAction>
                </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog> 
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
                    {/* <CardHeader className="px-7">
                        <CardTitle>Alerts</CardTitle>
                        <CardDescription>
                            All your alerts from your account.
                        </CardDescription>
                    </CardHeader> */}
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                <TableHead></TableHead>
                                <TableHead>Alert Name</TableHead>
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
                                {filteredAlerts.map((alert) => (
                                <TableRow
                                    key={alert.id}
                                    onClick={() => onAlertClick(alert)}
                                  >                
                                   <TableCell className="text-right">
                                    {alert.status && (
                                        <AlertTrigger alertId={alert.id} onAlertTrigger={handleAlertTrigger} />
                                    )}
                                    </TableCell>
                                        <TableCell>
                                            <div className="font-medium">{alert.alert_name}</div>
                                            <div className="hidden text-sm text-muted-foreground md:inline">
                                                Last updated {formatDistanceToNow(parseISO(alert.updated_at), { addSuffix: true })}
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            {alert.alert_description}
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            <Badge className="text-xs">
                                                {alert.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            {format(new Date(alert.created_at), 'd MMMM, yyyy')}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <AlertSwitch alertId={alert.id} onToggle={handleAlertToggle} />
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
                                                <DropdownMenuItem onClick={() => openAlert(alert.id, alert.alert_name)}>Open</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => duplicateAlert(alert.id)}>Duplicate</DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className='text-destructive' onClick={() => deleteAlert(alert.id)}>
                                                    Delete
                                                </DropdownMenuItem>
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
                    {/* <CardHeader className="px-7">
                        <CardTitle>Active Alerts</CardTitle>
                        <CardDescription>
                            Recent active alerts from your account.
                        </CardDescription>
                    </CardHeader> */}
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                <TableHead> </TableHead>
                                <TableHead>Alert Name</TableHead>
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
                                {filteredAlerts.map((alert) => (
                                    <TableRow
                                    key={alert.id}
                                    onClick={() => onAlertClick(alert)}
                                  >
                                    <TableCell className="text-right">
                                    {alert.status && (
                                        <AlertTrigger alertId={alert.id} onAlertTrigger={handleAlertTrigger} />
                                    )}
                                    </TableCell>
                                        <TableCell>
                                            <div className="font-medium">{alert.alert_name}</div>
                                            <div className="hidden text-sm text-muted-foreground md:inline">
                                                Last updated {formatDistanceToNow(parseISO(alert.updated_at), { addSuffix: true })}
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            {alert.alert_description}
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            <Badge className="text-xs">
                                                {alert.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            {format(new Date(alert.created_at), 'd MMMM, yyyy')}
                                        </TableCell>
                                        <TableCell className="text-right">
                                        <AlertSwitch alertId={alert.id} onToggle={handleAlertToggle} />

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
                                                <DropdownMenuItem onClick={() => openAlert(alert.id, alert.alert_name)}>Open</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => duplicateAlert(alert.id)}>Duplicate</DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className='text-destructive' onClick={() => deleteAlert(alert.id)}>
                                                    Delete
                                                </DropdownMenuItem>
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
                    {/* <CardHeader className="px-7">
                        <CardTitle>Inactive Alerts</CardTitle>
                        <CardDescription>
                            Inactive alerts in your account.
                        </CardDescription>
                    </CardHeader> */}
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Alert Name</TableHead>
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
                                {filteredAlerts.map((alert) => (
                                    <TableRow
                                    key={alert.id}
                                    onClick={() => onAlertClick(alert)}
                                  >
                                        <TableCell>
                                            <div className="font-medium">{alert.alert_name}</div>
                                            <div className="hidden text-sm text-muted-foreground md:inline">
                                                Last updated {formatDistanceToNow(parseISO(alert.updated_at), { addSuffix: true })}
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            {alert.alert_description}
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            <Badge className="text-xs">
                                                {alert.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            {format(new Date(alert.created_at), 'd MMMM, yyyy')}
                                        </TableCell>
                                        <TableCell className="text-right">
                                        <AlertSwitch alertId={alert.id} onToggle={handleAlertToggle} />
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
                                                <DropdownMenuItem onClick={() => openAlert(alert.id, alert.alert_name)}>Open</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => duplicateAlert(alert.id)}>Duplicate</DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className='text-destructive' onClick={() => deleteAlert(alert.id)}>
                                                    Delete
                                                </DropdownMenuItem>
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