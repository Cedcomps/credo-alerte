'use client'
import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { createClient } from '@/utils/supabase/client';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Spinner } from '../Spinner';

interface DashboardQuotaCardProps {
  menuName: string;
}

export default function DashboardQuotaCard({ menuName }: DashboardQuotaCardProps) {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const supabase = createClient();

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          throw new Error('Vous devez être authentifié pour voir vos données.');
        }

        let { data, error } = await supabase
          .from(menuName)
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id);

          if (error) throw new Error(error.message);
          if (data) {
            setCount(data.length);
          } else {
            // Handle the case where data is null or undefined
            console.error('No data returned from the query.');
          }
      } finally {
        setIsLoading(false);
      }
    };

    fetchCount();
  }, [menuName]);

  if (isLoading) {
    return <div className='flex justify-center max-w-md'><Spinner/></div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  let title = "";
  let description = "";

  switch (menuName) {
    case "alerts":
      title = "Your Alerts";
      description = `${count} Critical Events with Our Intuitive Alert Management System for Effective Communication.`;
      break;
    case "product":
      title = "Your Products";
      description = "Efficiently Manage Your Product Catalog and Streamline Inventory Control.";
      break;
    case "contacts  ":
      title = "Your Contact Base";
      description = `${count} Contacts in Your Contact Base for Seamless Communication.`;
      break;
    default:
      title = "Dashboard";
      description = "Welcome to Your Comprehensive Dashboard for Data-Driven Decision Making.";
  }

  return (
    <ErrorBoundary>

    <Card>
      <CardHeader className="pb-2">
        <CardDescription>This Week</CardDescription>
        <CardTitle className="text-4xl">{count}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">{description}</div>
      </CardContent>
      <CardFooter>
        <Progress value={count/100} aria-label="25% increase" />
      </CardFooter>
    </Card>
    </ErrorBoundary>

  );
}
