'use client';

import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function DashboardBreadcrumb() {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter((segment) => segment !== '');
  const [alertName, setAlertName] = useState('');

  useEffect(() => {
    const fetchAlertName = async () => {
      if (pathSegments.length === 2 && pathSegments[0] === 'alerts') {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('alerts')
          .select('alert_name')
          .eq('id', pathSegments[1])
          .single();

        if (error) {
          console.error('Error fetching alert name:', error);
        } else {
          setAlertName(data.alert_name);
        }
      }
    };

    fetchAlertName();
  }, [pathSegments]);

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
          const isLast = index === pathSegments.length - 1;
          let displayName = segment.charAt(0).toUpperCase() + segment.slice(1);

          if (isLast && alertName) {
            displayName = alertName;
          }

          return (
            <React.Fragment key={href}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{displayName}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href}>{displayName}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
