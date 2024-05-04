import React from 'react';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '../ui/separator';
import { ErrorBoundary } from '../ErrorBoundary';

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
    <ErrorBoundary>
    <Card>
      <CardHeader  className="flex flex-row items-start bg-muted/50">
      <div className="grid gap-0.5">
        <CardTitle className="group flex items-center gap-2 text-lg">Verification</CardTitle>
          <CardDescription>
            This is the verification step. Check carefully the data before validating your alert.
          </CardDescription>
      </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          <div className="font-semibold">Alert Details</div>
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
              Alert name</span>
              <span>{alert_name}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
              Alert description</span>
              <span>{alert_description}</span>
            </li>
          </ul>
          <Separator className="my-2" />
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
            <div className="font-semibold">Alert Message</div>

              <span>{alert_message}</span>
            </li>
            {/* <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
              Alert description</span>
              <span>{alert_description}</span>
            </li> */}
          </ul>
          <Separator className="my-2" />
        </div>
      </CardContent>
    </Card>
    </ErrorBoundary>
  );
};
