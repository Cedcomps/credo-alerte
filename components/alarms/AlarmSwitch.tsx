'use client'
import { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { createClient } from "@/utils/supabase/client";

// Initialisez le client Supabase avec votre URL de projet et votre clé API publique
const supabase = createClient();

interface AlarmSwitchProps {
  alarmId: string;
  onToggle: (alarmId: string, newStatus: boolean) => void;
}

export default function AlarmSwitch({ alarmId, onToggle }: AlarmSwitchProps) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Récupérez l'état initial du switch depuis Supabase
    const fetchAlarmStatus = async () => {
      const { data, error } = await supabase
        .from('alarms')
        .select('status')
        .eq('id', alarmId)
        .single();

      if (error) {
        console.error('Error fetching alarm status:', error);
      } else {
        setIsActive(data.status);
      }
    };

    fetchAlarmStatus();
  }, [alarmId]);

  
  const handleSwitchChange = async () => {
    const newStatus = !isActive;
    setIsActive(newStatus);

    // Mettez à jour l'état du switch dans Supabase
    const { error } = await supabase
      .from('alarms')
      .update({ status: newStatus })
      .eq('id', alarmId);

    if (error) {
      console.error('Error updating alarm status:', error);
    }
    if (!error) {
      onToggle(alarmId, newStatus);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch id={`alarm-${alarmId}`} onCheckedChange={handleSwitchChange} checked={isActive} />
      <Label
        htmlFor={`alarm-${alarmId}`}
        className={isActive ? 'text-primary' : ''}
      >
        {isActive ? 'Active' : 'Inactive'}
      </Label>
    </div>
  );
}
