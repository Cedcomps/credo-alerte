// components/UserTasks.tsx
'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'

type Task = {
  id: number
  title: string
  completed: boolean
}

export default function UserTasks() {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    async function fetchTasks() {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

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

        if (error) {
          console.error('Error fetching tasks:', error)
        } else if (data) {
          const formattedTasks: Task[] = data.map((task: any) => ({
            id: task.onboarding_tasks.id,
            title: task.onboarding_tasks.title,
            completed: task.completed,
          }))
          setTasks(formattedTasks)
        }
      }
    }

    fetchTasks()
  }, [])

  return (
    <div>
      <h2>Mes tâches d'onboarding</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span>{task.title}</span>
            <span>{task.completed ? ' ✅' : ' ⏳'}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
