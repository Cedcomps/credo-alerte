import { createClient } from '@/utils/supabase/client'

const supabase = createClient()

export const seedOnboardingTasks = async (userId: string) => {
  try {
    // Récupérer les 4 tâches d'onboarding depuis la table onboarding_tasks
    const { data: tasks, error: tasksError } = await supabase
      .from('onboarding_tasks')
      .select('id')

    if (tasksError) {
      console.error('Error fetching onboarding tasks:', tasksError)
      return
    }

    // Insérer les 4 tâches d'onboarding pour l'utilisateur dans la table user_onboarding_tasks
    const { error: insertError } = await supabase
      .from('user_onboarding_tasks')
      .insert(
        tasks.map((task) => ({
          user_id: userId,
          task_id: task.id,
          completed: false,
        }))
      )

    if (insertError) {
      console.error('Error seeding onboarding tasks:', insertError)
    } else {
      console.log('Onboarding tasks seeded successfully')
    }
  } catch (error) {
    console.error('Error seeding onboarding tasks:', error)
  }
}
