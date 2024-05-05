'use client';

import { useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

export type Subscriber = {
  id: string;
  email: string | null;
  edition: string | null;
};

type Props = {
  recentSubscribers: Subscriber[];
};

export function ClientRecentSignups({ recentSubscribers }: Props) {
  const { toast } = useToast();

  useEffect(() => {
    if (recentSubscribers) {
      recentSubscribers.forEach((subscriber, index) => {
        if (subscriber.email && subscriber.edition) {
          const lowercaseEmail = subscriber.email.toLowerCase();
          const obfuscatedEmail = lowercaseEmail.replace(/(?<=@)[^.]+(?=\.)/g, (match) => '*'.repeat(match.length));

          setTimeout(() => {
            toast({
              title: 'New member 🎉',
              description: `${obfuscatedEmail} subscribed to the ${subscriber.edition} edition`,
            });
          }, (index + 1) * 15000);
        }
      });
    }
  }, [toast, recentSubscribers]);

  return null;
}
