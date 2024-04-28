import { createClient } from '@/utils/supabase/server';
import OnboardingTaskList from './OnboardingTaskList';

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

export default async function OnboardingTaskListWrapper() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let tasks: Task[] = [];
  if (user) {
    const { data, error } = await supabase
      .from('user_onboarding_tasks')
      .select(
        `
        onboarding_task_id,
        completed,
        onboarding_tasks (
          id,
          title
        )
      `
      )
      .eq('user_id', user.id);

    if (!error && data) {
      tasks = data.map((task: any) => ({
        id: task.onboarding_tasks.id,
        title: task.onboarding_tasks.title,
        completed: task.completed,
      }));
    }
  }

  return <OnboardingTaskList tasks={tasks} />;
}
