// app/onboarding/step1.tsx
'use client';

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function OnboardingStep1({ onNext }: { onNext: () => void }) {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mx-auto max-w-[400px]">
        <h1 className="text-3xl font-semibold mb-4">Step 1 of 4</h1>
        <h2 className="text-lg mb-4">What's the name of your company or team?</h2>
        <p className="text-sm text-muted-foreground mb-8">
          This will be the name of your Credo Alerte workspace - choose something that your team will recognize.
        </p>
        <Textarea
          placeholder="Cool Company"
          className="mb-4"
        />
        <Button className="w-full" onClick={onNext}>
          Next &rarr;
        </Button>
      </div>
    </div>
  )
}
