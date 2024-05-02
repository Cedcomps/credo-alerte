import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { ErrorBoundary } from '../ErrorBoundary';

interface AlertContentProps {
  alert_message: string;
  setAlertMessage: React.Dispatch<React.SetStateAction<string>>;
  // eventCategory: string;
  // setEventCategory: React.Dispatch<React.SetStateAction<string>>;
  // guidanceToReact: string;
  // setGuidanceToReact: React.Dispatch<React.SetStateAction<string>>;
  // launchDate: Date;
  // setLaunchDate: React.Dispatch<React.SetStateAction<Date>>;
  // alertDuration: string;
  // setAlertDuration: React.Dispatch<React.SetStateAction<string>>;
}

export const AlertContent: React.FC<AlertContentProps> = ({
  alert_message,
  setAlertMessage,
  // eventCategory,
  // setEventCategory,
  // guidanceToReact,
  // setGuidanceToReact,
  // launchDate,
  // setLaunchDate,
  // alertDuration,
  // setAlertDuration,
}) => {
  return (
    <div>
            <ErrorBoundary>

      <Card>
        <CardHeader>
          <CardTitle>Alert Content</CardTitle>
          <CardDescription>
            Write an decisive message for people wno will receive the alert.
          </CardDescription>
        </CardHeader>
        <CardContent>
      <div className="mb-4">
        <Label htmlFor="alert_message" className="mb-2">
          Alert message
        </Label>
        <Textarea
          id="alert_message"
          value={alert_message}
          onChange={(e) => setAlertMessage(e.target.value)}
          placeholder="Fill in the alert message sent to contacts."
        />
      </div>
      {/* <div className="mb-4">
        <Label htmlFor="eventCategory" className="mb-2">
          Event category
        </Label>
        <Input
          type="text"
          id="eventCategory"
          value={eventCategory}
          onChange={(e) => setEventCategory(e.target.value)}
          placeholder="Define the event"
        />
        <p className="text-sm text-muted-foreground mt-1">
          Each event is defined by a category that gives access to the instructions related to this type of event.
        </p>
      </div>
      <div className="mb-4">
        <Label htmlFor="guidanceToReact" className="mb-2">
          Guidance to react
        </Label>
        <Input
          type="text"
          id="guidanceToReact"
          value={guidanceToReact}
          onChange={(e) => setGuidanceToReact(e.target.value)}
          placeholder="Guidance to react"
        />
        <p className="text-sm text-muted-foreground mt-1">
          Corresponds to the heart of the message sent to contacts. The voices offered depend on the event chosen.
        </p>
      </div>
      <div className="mb-4">
        <Label htmlFor="launchDate" className="mb-2">
          Launch date/time
        </Label>
        <Input
          type="datetime-local"
          id="launchDate"
          value={launchDate.toISOString().slice(0, 16)}
          onChange={(e) => setLaunchDate(new Date(e.target.value))}
        />
        <p className="text-sm text-muted-foreground mt-1">By default the launch dates are pre-filled to be sent immediately.</p>
      </div>
      <div className="mb-4">
        <Label htmlFor="alertDuration" className="mb-2">
          Duration of the alert
        </Label>
        <Select value={alertDuration} onValueChange={setAlertDuration}>
          <SelectTrigger>
            <SelectValue placeholder="Select duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1 hour">1 hour</SelectItem>
            <SelectItem value="2 hours">2 hours</SelectItem>
            <SelectItem value="3 hours">3 hours</SelectItem>
            <SelectItem value="4 hours">4 hours</SelectItem>
            <SelectItem value="5 hours">5 hours</SelectItem>
          </SelectContent>
        </Select>
      </div> */}
      </CardContent>
      </Card>
    </ErrorBoundary>
    </div>
  );
};
