'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { userQueries } from '@/api/queries/userQueries';
import ReviewCard from '@/components/crew/ReviewCard';
import Spinner from '@/components/ui/Spinner';

export default function MyReviewsPage() {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery(userQueries.me.reviews());

  const reviews = data?.reviews ?? [];
  const hasNoReviews = !isLoading && reviews.length === 0;

  useEffect(() => {
    if (!bottomRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(bottomRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <section className="flex h-[60vh] items-center justify-center">
        <Spinner className="text-brand-500 size-8" />
      </section>
    );
  }

  if (hasNoReviews) {
    return (
      <section className="text-body2-medium flex h-[60vh] items-center justify-center text-center text-gray-300">
        아직 작성한 리뷰가 없어요
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-4">
      {reviews.map((review, index) => (
        <div key={review.id} className="flex flex-col gap-4">
          <ReviewCard key={review.id} data={review} showUser={false} />
          {index !== reviews.length - 1 && (
            <div
              className="h-px w-full"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(to right, #24242E 0 4px, transparent 4px 8px)',
              }}
            />
          )}
        </div>
      ))}

      <div ref={bottomRef} className="h-5" />

      {isFetchingNextPage && (
        <div className="flex justify-center">
          <Spinner className="text-brand-500 size-5" />
        </div>
      )}
    </section>
  );
}
