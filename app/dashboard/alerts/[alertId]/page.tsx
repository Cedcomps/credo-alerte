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

export default function AlertDetails() {
  const params = useParams();
  const alertId = params.alertId;
  const supabase = createClient();
  const [alert, setAlert] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchAlert = async () => {
      setLoading(true);
      setError(null);

      if (alertId) {
        const { data, error } = await supabase
          .from('alerts')
          .select('*')
          .eq('id', alertId)
          .single();

        if (error) {
          console.error('Error fetching alert:', error);
          setError('Failed to fetch alert details. Please try again.');
        } else {
          setAlert(data);
        }
      }

      setLoading(false);
    };

    fetchAlert();
  }, [alertId]);

  const handleBack = () => {
    router.push('/dashboard/alerts');
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
            {/* <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-3"> */}
    <Card>
      <CardHeader>
        <CardTitle>{alert.alert_name}</CardTitle>
        <CardDescription>Alert Details</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <span className="font-semibold">Description:</span> {alert.alert_description}
          </div>
          <div>
            <span className="font-semibold">Status:</span> <Badge>{alert.status ? 'Active' : 'Inactive'}</Badge>
          </div>
          <div>
            <span className="font-semibold">Created At:</span> {format(parseISO(alert.created_at), 'MMMM d, yyyy')}
          </div>
          <div>
            <span className="font-semibold">Updated At:</span> {format(parseISO(alert.updated_at), 'MMMM d, yyyy')}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleBack}>Back to Alerts</Button>
      </CardFooter>
    </Card>
    </div>
        {/* </div> */}
    </main> 
  );
}
