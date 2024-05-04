import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { ErrorBoundary } from '../ErrorBoundary';

interface GeneralConfigurationProps {
  alert_name: string;
  setAlertName: React.Dispatch<React.SetStateAction<string>>;
  alert_description: string;
  setAlertDescription: React.Dispatch<React.SetStateAction<string>>;
  setIsNextDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GeneralConfiguration: React.FC<GeneralConfigurationProps> = ({
  alert_name,
  setAlertName,
  alert_description,
  setAlertDescription,
  setIsNextDisabled,
}) => {
  const handleAlertNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAlertName(value);
    setIsNextDisabled(value.trim() === '');
  };

  return (
    <div>
      <ErrorBoundary>
        <Card>
          <CardHeader className="flex flex-row items-start bg-muted/50">
            <div className="grid gap-0.5">
              <CardTitle className="group flex items-center gap-2 text-lg">Give a name to your Alert</CardTitle>
              <CardDescription>
                The name of the alert is mainly used to identify the different alerts within the application.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Label htmlFor="alert_name">Alert name</Label>
              <Input
                type="text"
                id="alert_name"
                value={alert_name}
                onChange={handleAlertNameChange}
                placeholder="Enter a cool name"
                required
              />
            </div>
            <div>
              <Label htmlFor="alert_description">Alert description</Label>
              <Input
                type="text"
                id="alert_description"
                value={alert_description}
                onChange={(e) => setAlertDescription(e.target.value)}
                placeholder="Optional - Enter a description for your alert"
              />
            </div>
          </CardContent>
        </Card>
      </ErrorBoundary>
    </div>
  );
};
