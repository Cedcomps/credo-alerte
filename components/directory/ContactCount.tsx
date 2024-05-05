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

const ContactCount = ({ description }: ContactCountProps) => {
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient();

  useEffect(() => {
    const fetchContactCount = async () => {
      try {
        // Récupérer l'ID de l'utilisateur connecté  
        const { data: { user } } = await supabase.auth.getUser()
        
        if (user) {
          // Compter les contacts pour cet utilisateur
          const { count, error } = await supabase
            .from('contacts')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', user.id)
          
          if (error) {
            setError('Failed to fetch contact count');
          } else {
            setCount(Math.min(count ?? 0));
          }
        }
      } catch (err) {
        setError('Failed to fetch contact count');
      } finally {
        setLoading(false);
      }
    }

    fetchContactCount();

    // Souscrire aux changements en temps réel pour les contacts
    const contactListener = supabase
      .channel('public:contacts')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'contacts' },
        () => {
          fetchContactCount(); // Appeler la fonction pour récupérer le nouveau nombre de contacts
          setLoading(true); // Afficher le spinner pendant le chargement
        }
      )
      .subscribe();

    // Nettoyer l'abonnement lors du démontage du composant
    return () => {
      contactListener.unsubscribe();
    };
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
        <Progress value={count} aria-label="Contact count" />  
        </CardFooter>
      </Card>
    </ErrorBoundary>
  )
}

export default ContactCount
