'use client'
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format, parseISO } from 'date-fns';
import { useParams } from 'next/navigation';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function AlarmDetails() {
  const params = useParams();
  const alarmId = params.alarmId;
  const supabase = createClient();
  const [alarm, setAlarm] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchAlarm = async () => {
      setLoading(true);
      setError(null);

      if (alarmId) {
        const { data, error } = await supabase
          .from('alarms')
          .select('*')
          .eq('id', alarmId)
          .single();

        if (error) {
          console.error('Error fetching alarm:', error);
          setError('Failed to fetch alarm details. Please try again.');
        } else {
          setAlarm(data);
        }
      }

      setLoading(false);
    };

    fetchAlarm();
  }, [alarmId]);

  const handleBack = () => {
    router.push('/dashboard/alarms');
  };

  if (loading) {
    return <LoadingSpinner />;
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
        <CardTitle>{alarm.alarm_name}</CardTitle>
        <CardDescription>Alarm Details</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <span className="font-semibold">Description:</span> {alarm.alarm_description}
          </div>
          <div>
            <span className="font-semibold">Status:</span> <Badge>{alarm.status ? 'Active' : 'Inactive'}</Badge>
          </div>
          <div>
            <span className="font-semibold">Created At:</span> {format(parseISO(alarm.created_at), 'MMMM d, yyyy')}
          </div>
          <div>
            <span className="font-semibold">Updated At:</span> {format(parseISO(alarm.updated_at), 'MMMM d, yyyy')}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleBack}>Back to Alarms</Button>
      </CardFooter>
    </Card>
    </div>
        {/* </div> */}
    </main> 
  );
}
