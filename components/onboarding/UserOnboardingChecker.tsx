'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { seedOnboardingTasks } from '@/utils/seedOnboardingTasks'

export default function UserOnboardingChecker() {
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkUserOnboarding = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        const { data: userTasks, error } = await supabase
          .from('user_onboarding_tasks')
          .select('*')
          .eq('user_id', user.id)

        if (error) {
          console.error('Error fetching user onboarding tasks:', error)
        } else if (userTasks && userTasks.length === 0) {
          await seedOnboardingTasks(user.id)
          router.push('/onboarding')
        }
      } else {
        router.push('/login')
      }
    }

    checkUserOnboarding()
  }, [])

  return null
}
