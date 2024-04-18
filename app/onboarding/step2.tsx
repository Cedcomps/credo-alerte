// app/onboarding/step2.tsx
'use client';

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface OnboardingStep2Props {
    onNext: () => void;
    alertName: string;
    onAlertNameChange: (value: string) => void;
  }

  export default function OnboardingStep2({
    onNext,
    alertName,
    onAlertNameChange,
  }: OnboardingStep2Props) {
    return (
    <div className="container mx-auto px-4 py-10">
      <div className="mx-auto max-w-[400px]">
        <h1 className="text-3xl font-semibold mb-4">Step 2 of 4</h1>
        <h2 className="text-lg mb-4">Which alert does your team fear the most at the moment?</h2>
        <p className="text-sm text-muted-foreground mb-8">
          It could be anything from a disaster recovery plan to a simple storm warning that suggests telecommuting, or it could be anything in between.
        </p>
        <Textarea
          placeholder="Ex: Abandoned luggage, Operation Snow Removal"
          className="mb-4"
          value={alertName}
          onChange={(e) => onAlertNameChange(e.target.value)}
        />
        <Button className="w-full" onClick={onNext}>
          Next &rarr;
        </Button>
      </div>
    </div>
  )
}
