'use client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ErrorBoundary } from "../ErrorBoundary"
import { createClient } from "@/utils/supabase/client"
import { useState, useEffect } from 'react'
import ErrorMessage from '@/components/ErrorMessage'
import { Spinner } from '@/components/Spinner'
import { Bell } from "lucide-react"

interface AlertCountProps {
  description: string
}
const MAX_QUOTA = 10;

const AlertCount = ({ description }: AlertCountProps) => {
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    const fetchAlertCount = async () => {
      try {
        // Créer un client Supabase
        const supabase = createClient()

        // Récupérer l'ID de l'utilisateur connecté  
        const { data: { user } } = await supabase.auth.getUser()
        
        if (user) {
          // Compter les alertes pour cet utilisateur
          const { count } = await supabase
            .from('alerts')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', user.id)
            .eq('status', true);

            setCount(Math.min(count ?? 0, MAX_QUOTA))
          }
      } catch (err) {
        setError('Failed to fetch alert count')
      } finally {
        setLoading(false)
      }
    }

    fetchAlertCount()
  }, [])

  if (loading) {
    return <Spinner size="large">Loading activable alerts...</Spinner>
  }

  if (error) {
    return <ErrorMessage message={error} />
  }

  return (
    <ErrorBoundary>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          {/* <CardDescription></CardDescription> */}
          <CardTitle className="text-sm font-medium">Activable </CardTitle>
          <Bell className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
           <div className="text-4xl font-bold">{count}</div>
          <div className="text-xs text-muted-foreground">{description}</div>
        </CardContent>
        {/* <CardFooter>
        <Progress value={count} max={MAX_QUOTA} aria-label="Alert count" />  
        </CardFooter> */}
      </Card>
    </ErrorBoundary>
  )
}
export default AlertCount
