'use client'

import { useState } from 'react'
import OnboardingStep1 from './step1'
import OnboardingStep2 from './step2'
import OnboardingStep3 from './step3'

interface OnboardingProps {
  onComplete: (alertName: string) => void
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1)
  const [alertName, setAlertName] = useState('')

  const handleNext = () => {
    if (step === 3) {
      onComplete(alertName)
    } else {
      setStep(step + 1)
    }
  }

  const handleSkip = () => {
    setStep(step + 1)
  }

  const handleAlertNameChange = (value: string) => {
    setAlertName(value)
  }
  return (
    <main>
      <div className="container mx-auto px-4 py-10">
        <div className="mx-auto max-w-[400px]">
        {step === 1 && <OnboardingStep1 onNext={handleNext} />}
        {step === 2 && (
          <OnboardingStep2
            onNext={handleNext}
            alertName={alertName}
            onAlertNameChange={handleAlertNameChange}
          />
        )}
        {step === 3 && (
          <OnboardingStep3 onNext={handleNext} onSkip={handleSkip} alertName={alertName} />
        )}
        </div>
      </div>
    </main>
  );
}
