import React from 'react';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '../ui/separator';

interface VerificationProps {
  alert_name: string;
  alert_description: string;
  alert_message: string;
  // eventCategory: string;
  // guidanceToReact: string;
  // launchDate: Date;
  // alertDuration: string;
}

export const Verification: React.FC<VerificationProps> = ({
  alert_name,
  alert_description,
  alert_message,
  // eventCategory,
  // guidanceToReact,
  // launchDate,
  // alertDuration,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Verification</CardTitle>
        <CardDescription>
          This is the verification step. Check carefully the data before validating your alert.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Label className="text-lg font-bold mb-2">General configuration of the alert</Label>
          <p>
            <span className="font-medium">Name of the alert:</span> {alert_name}
          </p>
          <p>
            <span className="font-medium">Description of the alert:</span> {alert_description}
          </p>
        </div>
        <div>
          {/* <Label className="text-lg font-bold mb-2">Content of the alert</Label>
          <p>
            <span className="font-medium">Event category:</span> {eventCategory}
          </p>
          <Separator className="my-4" />

          <p>
            <span className="font-medium">Launch date/time:</span> {launchDate.toLocaleString()}
          </p>
          <Separator className="my-4" />

          <p>
            <span className="font-medium">Guidance to react:</span> {guidanceToReact}
          </p>
          <Separator className="my-4" />

          <p>
            <span className="font-medium">Duration of the alert:</span> {alertDuration}
          </p>
          <Separator className="my-4" /> */}

          <p className="mt-4">
            <span className="font-medium">Alert message:</span>
            <br />
            {alert_message}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
