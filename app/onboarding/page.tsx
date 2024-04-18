// app/onboarding/page.tsx
'use client';

import { useState } from 'react';
import OnboardingStep1 from './step1';
import OnboardingStep2 from './step2';
import OnboardingStep3 from './step3';

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [alertName, setAlertName] = useState('');

  const handleNext = () => {
    setStep(step + 1);
  }
  const handleSkip = () => {
    setStep(step + 1);
  }
  const handleAlertNameChange = (value: string) => {
    setAlertName(value);
  }

  if (step === 1) {
    return <OnboardingStep1 onNext={handleNext} />;
  }

  if (step === 2) {
    return (
      <OnboardingStep2
        onNext={handleNext}
        alertName={alertName}
        onAlertNameChange={handleAlertNameChange}
      />
    );
  }

  if (step === 3) {
    return <OnboardingStep3 onNext={handleNext} onSkip={handleSkip} alertName={alertName} />;
  }

  // Ajoutez ici les étapes suivantes si nécessaire

  return null; // ou une page de fin d'onboarding
}
