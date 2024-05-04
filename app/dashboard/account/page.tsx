'use client'
import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { format } from 'date-fns';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { CheckCircle2Icon, CircleIcon } from 'lucide-react';

export default function ProfileSettings() {
  const [email, setEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [lastSignInAt, setLastSignInAt] = useState<string | null>(null);
  const { toast } = useToast();
  const [passwordRequirements, setPasswordRequirements] = useState({
    lowercase: false,
    uppercase: false,
    digit: false,
    symbol: false,
    length: false,
  });

  const supabase = createClient();

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        setEmail(user.email ?? '');
        setLastSignInAt(user.last_sign_in_at ?? null);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const digitRegex = /\d/;
    const symbolRegex = /[^a-zA-Z0-9]/;

    setPasswordRequirements({
      lowercase: lowercaseRegex.test(password),
      uppercase: uppercaseRegex.test(password),
      digit: digitRegex.test(password),
      symbol: symbolRegex.test(password),
      length: password.length >= 8,
    });
  }, [password]);

  const handleUpdateEmail = async () => {
    setLoadingEmail(true);

    const { data: { user }, error } = await supabase.auth.updateUser({
      email: newEmail,
    });

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } else {
      toast({
        title: 'Success',
        description: 'An email has been sent with instructions to reset your password.',
      });
      setEmail(user?.email ?? '');
      setNewEmail('');
    }

    setLoadingEmail(false);
  };

  const handleUpdatePassword = async () => {
    setLoadingPassword(true);

    if (password !== confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match.',
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      setLoadingPassword(false);
      return;
    }

    const { data: { user }, error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } else {
      toast({
        title: 'Success',
        description: 'Password updated successfully.',
      });
      setPassword('');
      setConfirmPassword('');
    }

    setLoadingPassword(false);
  };
  return (
    <ErrorBoundary>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-4xl items-start gap-6 ">
          <Card>
            <CardHeader>
              <CardTitle>Email Settings</CardTitle>
              <CardDescription>Update your email address.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <Label htmlFor="email">Current Email</Label>
                  <Input id="email" type="email" value={email} disabled />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Label htmlFor="newEmail">New Email</Label>
                  <Input
                    id="newEmail"
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button onClick={handleUpdateEmail} disabled={loadingEmail}>
                {loadingEmail ? 'Updating...' : 'Update Email'}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Password Settings</CardTitle>
              <CardDescription>Update your password.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <Label htmlFor="password">New Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className='text-xs'>
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
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button onClick={handleUpdatePassword} disabled={loadingPassword}>
                {loadingPassword ? 'Updating...' : 'Update Password'}
              </Button>
            </CardFooter>
          </Card>

          {lastSignInAt && (
            <div className="text-xs text-muted-foreground">
              <Label>Last Sign In</Label>
              <div>{format(new Date(lastSignInAt), 'MMMM d, yyyy h:mm a')}</div>
            </div>
          )}
        </div>
      </main>
    </ErrorBoundary>
  );
}
