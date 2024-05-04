'use client'
import { AlertContent } from '@/components/alerts/AlertContent';
import { GeneralConfiguration } from '@/components/alerts/GeneralConfiguration';
import { Verification } from '@/components/alerts/Verification';
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import { Toaster } from "@/components/ui/sonner"
import { useToast } from "@/components/ui/use-toast"

interface AlertData {
  alert_name: string;
  alert_description: string;
  alert_message: string;
}

const createAlert = async (alertData: AlertData) => {
  const supabase = createClient();

  const { data, error } = await supabase.from('alerts').insert([alertData]).select();
  
  if (error) {
    console.error('Error creating alert:', error);
    return null;
  }
  
  return data[0];
};

export default function NewAlert() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [alert_name, setAlertName] = useState('');
  const [alert_description, setAlertDescription] = useState('');
  const [alert_message, setAlertMessage] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [isNextDisabled, setIsNextDisabled] = useState(true);
  const { toast } = useToast();

  const handleShowSuccessAlert = () => {
    setShowSuccessAlert(true);
    setTimeout(() => {
      setShowSuccessAlert(false);
    }, 3000);
    toast({
      title: 'Success',
      description: 'Alert created, deploy it when you are ready',
    });
  };

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleCreateAlert = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      console.log('Aucun utilisateur authentifié');
      return;
    }

    const alertData = {
      alert_name,
      alert_description,
      alert_message,
      user_id: user.id,
    };
  
    const newAlert = await createAlert(alertData);
  
    if (newAlert) {
      const alertId = newAlert.id;
      handleShowSuccessAlert();
      router.push(`/dashboard/alerts/${alertId}`);
    }
  };
  
  return (
    <div className="mx-auto">
      <h1 className="text-3xl font-bold">Create Alert</h1>
      <Separator className="my-4" />

      <Progress value={((currentStep + 1) / 3) * 100} className="mb-4" />

      {currentStep === 0 && (
        <GeneralConfiguration
          alert_name={alert_name}
          setAlertName={setAlertName}
          alert_description={alert_description}
          setAlertDescription={setAlertDescription}
          setIsNextDisabled={setIsNextDisabled}
        />
      )}
      {currentStep === 1 && (
        <AlertContent
          alert_message={alert_message}
          setAlertMessage={setAlertMessage}
        />
      )}
      {currentStep === 2 && (
        <Verification
          alert_name={alert_name}
          alert_description={alert_description}
          alert_message={alert_message}
        />
      )}

      <div className="mt-4 flex justify-between">
        {currentStep > 0 && (
          <Button variant="outline" onClick={handlePrevStep}>
            Previous
          </Button>
        )}
        {currentStep < 2 ? (
          <Button onClick={handleNextStep} disabled={isNextDisabled}>
            Next
          </Button>
        ) : (
          <Button onClick={handleCreateAlert}>Create Alert</Button>
        )}
        {showSuccessAlert && <Toaster />}
      </div>
    </div>
  );
}
