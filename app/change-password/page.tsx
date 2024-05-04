'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { CheckCircle2Icon, CircleIcon } from 'lucide-react'

export default function ChangePassword() {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()
  const router = useRouter()
  const supabase = createClient()
  const [passwordRequirements, setPasswordRequirements] = useState({
    lowercase: false,
    uppercase: false,
    digit: false,
    symbol: false,
    length: false,
  });

  useEffect(() => {
    const checkAuthentication = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/login')
      }
    }
    checkAuthentication()
  }, [router, supabase.auth])

  useEffect(() => {
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const digitRegex = /\d/;
    const symbolRegex = /[^a-zA-Z0-9]/;

    setPasswordRequirements({
      lowercase: lowercaseRegex.test(newPassword),
      uppercase: uppercaseRegex.test(newPassword),
      digit: digitRegex.test(newPassword),
      symbol: symbolRegex.test(newPassword),
      length: newPassword.length >= 8,
    });
  }, [newPassword]);

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    const { error } = await supabase.auth.updateUser({ password: newPassword })

    if (error) {
      setError(error.message)
      toast({
        title: 'Error',
        description: error.message,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    } else {
      toast({
        title: 'Success',
        description: 'Password updated successfully.',
      })
      router.push('/dashboard')
    }

    setLoading(false)
  }

  return (
    <ErrorBoundary>
      <div className="container mx-auto flex items-center justify-center min-h-screen">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>Enter a new password for your account.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleChangePassword}>
              <div className="mb-4">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label>Password Requirements:</Label>
                <ul className="list-disc pl-6">
                  <li className={passwordRequirements.lowercase ? 'text-green-500 flex items-center' : 'text-red-500 flex items-center'}>
                    {passwordRequirements.lowercase ? (
                      <CheckCircle2Icon className="h-4 w-4 text-green-500 mr-2" />
                    ) : (
                      <CircleIcon className="h-4 w-4 text-gray-500 mr-2" />
                    )}
                    Lowercase letter
                  </li>
                  <li className={passwordRequirements.uppercase ? 'text-green-500 flex items-center' : 'text-red-500 flex items-center'}>
                    {passwordRequirements.uppercase ? (
                      <CheckCircle2Icon className="h-4 w-4 text-green-500 mr-2" />
                    ) : (
                      <CircleIcon className="h-4 w-4 text-gray-500 mr-2" />
                    )}
                    Uppercase letter
                  </li>
                  <li className={passwordRequirements.digit ? 'text-green-500 flex items-center' : 'text-red-500 flex items-center'}>
                    {passwordRequirements.digit ? (
                      <CheckCircle2Icon className="h-4 w-4 text-green-500 mr-2" />
                    ) : (
                      <CircleIcon className="h-4 w-4 text-gray-500 mr-2" />
                    )}
                    Digit
                  </li>
                  <li className={passwordRequirements.symbol ? 'text-green-500 flex items-center' : 'text-red-500 flex items-center'}>
                    {passwordRequirements.symbol ? (
                      <CheckCircle2Icon className="h-4 w-4 text-green-500 mr-2" />
                    ) : (
                      <CircleIcon className="h-4 w-4 text-gray-500 mr-2" />
                    )}
                    Symbol
                  </li>
                  <li className={passwordRequirements.length ? 'text-green-500 flex items-center' : 'text-red-500 flex items-center'}>
                    {passwordRequirements.length ? (
                      <CheckCircle2Icon className="h-4 w-4 text-green-500 mr-2" />
                    ) : (
                      <CircleIcon className="h-4 w-4 text-gray-500 mr-2" />
                    )}
                    Minimum 8 characters
                  </li>
                </ul>
              </div>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Updating...' : 'Change Password'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </ErrorBoundary>
  )
}
