// components/UserInfo.tsx
'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function UserInfo() {
  const [userEmail, setUserEmail] = useState<string | null>(null)

  useEffect(() => {
    async function fetchUserEmail() {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user && user.email) {
        setUserEmail(user.email)
      }
    }

    fetchUserEmail()
  }, [])

  return (
    <div>
      {userEmail ? (
        <p>Connecté en tant que : {userEmail}</p>
      ) : (
        <p>Aucun utilisateur connecté</p>
      )}
    </div>
  )
}
