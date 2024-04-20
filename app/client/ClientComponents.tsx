// app/client/ClientComponents.tsx
'use client';

import Header from '@/components/Header';
import FetchDataSteps from '@/components/tutorial/FetchDataSteps';

export function ClientHeader() {
  return <Header />;
}

export function ClientFetchDataSteps() {
  return <FetchDataSteps />;
}
