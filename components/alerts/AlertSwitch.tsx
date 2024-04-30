'use client'
import { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { createClient } from "@/utils/supabase/client";

// Initialisez le client Supabase avec votre URL de projet et votre clé API publique
const supabase = createClient();

interface AlertSwitchProps {
  alertId: string;
  onToggle: (alertId: string, newStatus: boolean) => void;
}

export default function AlertSwitch({ alertId, onToggle }: AlertSwitchProps) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Récupérez l'état initial du switch depuis Supabase
    const fetchAlertStatus = async () => {
      const { data, error } = await supabase
        .from('alerts')
        .select('status')
        .eq('id', alertId)
        .single();

      if (error) {
        console.error('Error fetching alert status:', error);
      } else {
        setIsActive(data.status);
      }
    };

    fetchAlertStatus();
  }, [alertId]);

  
  const handleSwitchChange = async () => {
    const newStatus = !isActive;
    setIsActive(newStatus);

    // Mettez à jour l'état du switch dans Supabase
    const { error } = await supabase
      .from('alerts')
      .update({ status: newStatus })
      .eq('id', alertId);

    if (error) {
      console.error('Error updating alert status:', error);
    }
    if (!error) {
      onToggle(alertId, newStatus);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch id={`alert-${alertId}`} onCheckedChange={handleSwitchChange} checked={isActive} />
      <Label
        htmlFor={`alert-${alertId}`}
        className={isActive ? 'text-primary' : ''}
      >
        {isActive ? 'Active' : 'Inactive'}
      </Label>
    </div>
  );
}
