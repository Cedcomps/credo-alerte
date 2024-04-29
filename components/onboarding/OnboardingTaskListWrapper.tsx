import { createClient } from '@/utils/supabase/server';
import OnboardingTaskList from './OnboardingTaskList';
import AddOnboardingTasks from './AddOnboardingTasks';

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
      .eq('user_id', user.id)
      .order('onboarding_task_id', { ascending: true }); // Ajout de la clause ORDER BY

    if (!error && data) {
      tasks = data.map((task: any) => ({
        id: task.onboarding_tasks.id,
        title: task.onboarding_tasks.title,
        completed: task.completed,
      }));
    }
  }

  const updateTask = async (taskId: number, completed: boolean) => {
    "use server";
    if (user) {
      await supabase
        .from('user_onboarding_tasks')
        .update({ completed })
        .eq('user_id', user.id)
        .eq('onboarding_task_id', taskId);
    }
  };

  return (
    <>
      <OnboardingTaskList tasks={tasks} updateTask={updateTask} />
      <AddOnboardingTasks />
    </>
  );
}
