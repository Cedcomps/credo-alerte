'use client'
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

interface ErrorWithMessage extends Error {
  message: string;
}

const AddOnboardingTasks = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorWithMessage | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
          const { data: tasks, error } = await supabase
            .from('user_onboarding_tasks')
            .select('*')
            .eq('user_id', user.id);

          if (error) {
            throw error;
          }

          if (tasks.length === 0) {
            // Aucune tâche pour cet utilisateur, créer les tâches d'onboarding
            const { data: onboardingTasks, error } = await supabase
              .from('onboarding_tasks')
              .select('*');

            if (error) {
              throw error;
            }

            const taskInserts = onboardingTasks.map((task) => ({
              user_id: user.id,
              onboarding_task_id: task.id,
              completed: false,
            }));

            await supabase.from('user_onboarding_tasks').insert(taskInserts);
          }
        }
    } catch (err) {
        setError(err as ErrorWithMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

};

export default AddOnboardingTasks;