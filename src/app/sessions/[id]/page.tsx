'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { sessionQueries } from '@/api/queries/sessionQueries';

export default function Page() {
  const { id } = useParams();
  const {
    data: session,
    error,
    isLoading,
  } = useQuery(sessionQueries.detail(Number(id)));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {(error as Error).message}</div>;
  }

  return <div>page</div>;
}
