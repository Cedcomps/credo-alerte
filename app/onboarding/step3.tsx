// app/onboarding/step3.tsx
'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Trash2 } from 'lucide-react';

interface OnboardingStep3Props {
  onNext: () => void;
  onSkip: () => void;
  alertName: string;
}

export default function OnboardingStep3({ onNext, onSkip, alertName }: OnboardingStep3Props) {
    const [emails, setEmails] = useState<string[]>([]);
    const [currentEmail, setCurrentEmail] = useState('');
  
    const handleAddEmail = () => {
      if (isValidEmail(currentEmail)) {
        setEmails([...emails, currentEmail.trim()]);
        setCurrentEmail('');
      }
    }
  
    const handleRemoveEmail = (index: number) => {
      setEmails(emails.filter((_, i) => i !== index));
    }
  
    const isValidEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  
    const isAddEmailDisabled = !isValidEmail(currentEmail);
  
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="mx-auto max-w-[400px]">
          <h1 className="text-3xl font-semibold mb-4">Step 3 of 4</h1>
          <h2 className="text-lg mb-4">Who do you absolutely have to alert when you trigger {alertName}?</h2>
          <p className="text-sm text-muted-foreground mb-8">
          To test Credo Alert, add the person(s) who will receive your notification. At the end of this onboarding, they'll receive a test message to make sure your first alert simulation works.
          </p>
          <Textarea
            placeholder="Ex: Niels@gmail.com"
            className="mb-4"
            value={currentEmail}
            onChange={(e) => setCurrentEmail(e.target.value)}
          />
          <Button 
            className="mb-4" 
            onClick={handleAddEmail}
            disabled={isAddEmailDisabled}
          >
            Add another
          </Button>
          <ul className="mb-4 space-y-2">
            {emails.map((email, index) => (
              <li key={index} className="flex items-center justify-between">
                {email}
                <Button variant="ghost" size="sm" onClick={() => handleRemoveEmail(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
          <div className="flex justify-between">
            <Button className="ml-4" onClick={onNext}>
              Add Teammates &rarr;
            </Button>
            <Button variant="secondary" onClick={onSkip}>
              Skip this step
            </Button>
          </div>
        </div>
      </div>
    )
  }
  