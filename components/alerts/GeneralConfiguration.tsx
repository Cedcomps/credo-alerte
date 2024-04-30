import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

interface GeneralConfigurationProps {
  alert_name: string;
  setAlertName: React.Dispatch<React.SetStateAction<string>>;
  alert_description: string;
  setAlertDescription: React.Dispatch<React.SetStateAction<string>>;
}

export const GeneralConfiguration: React.FC<GeneralConfigurationProps> = ({
  alert_name,
  setAlertName,
  alert_description,
  setAlertDescription,
}) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Give a name to your Alert</CardTitle>
          <CardDescription>
            The name of the alert is mainly used to identify the different alerts within the application.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Label htmlFor="alert_name">Alert name</Label>
            <Input
              type="text"
              id="alert_name"
              value={alert_name}
              onChange={(e) => setAlertName(e.target.value)}
              placeholder="Enter a cool name"
            />
          </div>
          <div>
            <Label htmlFor="alert_description">Alert description</Label>
            <Input
              type="text"
              id="alert_description"
              value={alert_description}
              onChange={(e) => setAlertDescription(e.target.value)}
              placeholder="Enter a description for your alert"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};