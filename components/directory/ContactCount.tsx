'use client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ErrorBoundary } from "../ErrorBoundary"
import { createClient } from "@/utils/supabase/client"
import { useState, useEffect } from 'react'
import ErrorMessage from '@/components/ErrorMessage'
import { Spinner } from '@/components/Spinner'

interface ContactCountProps {
  description: string
}
const MAX_QUOTA = 10;

const ContactCount = ({ description }: ContactCountProps) => {
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    const fetchContactCount = async () => {
      try {
        // Créer un client Supabase
        const supabase = createClient()

        // Récupérer l'ID de l'utilisateur connecté  
        const { data: { user } } = await supabase.auth.getUser()
        
        if (user) {
          // Compter les alertes pour cet utilisateur
          const { count } = await supabase
            .from('contacts')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', user.id)
          
            setCount(Math.min(count ?? 0, MAX_QUOTA))
          }
      } catch (err) {
        setError('Failed to fetch contact count')
      } finally {
        setLoading(false)
      }
    }

    fetchContactCount()
  }, [])

  if (loading) {
    return <Spinner size="large">Loading the number of contacts...</Spinner>
  }

  if (error) {
    return <ErrorMessage message={error} />
  }

  return (
    <ErrorBoundary>
      <Card>
        <CardHeader className="pb-2">
          {/* <CardDescription>Alerts created</CardDescription> */}
          <CardTitle className="text-4xl">{count}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">{description}</div>
        </CardContent>
        <CardFooter>
        <Progress value={count} max={MAX_QUOTA} aria-label="Contact count" />  
        </CardFooter>
      </Card>
    </ErrorBoundary>
  )
}

export default ContactCount