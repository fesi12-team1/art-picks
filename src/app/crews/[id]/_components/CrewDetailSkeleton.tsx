'use client';

import { cn } from '@/lib/utils';

export default function CrewDetailSkeleton() {
  return (
    <div className="h-main laptop:bg-gray-850 flex flex-col items-center bg-gray-800 pb-20">
      {/* Crew Image Skeleton */}
      <div
        className={cn(
          'relative w-full animate-pulse bg-gray-700',
          'laptop:mt-10 laptop:mb-[52px] laptop:max-w-[1120px] laptop:bg-gray-700',
          'laptop:h-[300px] laptop:rounded-[20px] tablet:h-60 h-[174px]'
        )}
      />

      {/* Crew Page Main */}
      <div className="laptop:max-w-[1120px] laptop:flex-row laptop:gap-10 flex w-full flex-col-reverse">
        {/* Left Column - Crew Info */}
        <div
          className={cn(
            'laptop:px-3 flex w-full flex-col px-6',
            'tablet:gap-y-8 laptop:gap-y-10 laptop:max-w-[720px] gap-y-6'
          )}
        >
          {/* Tabs Skeleton */}
          <div className="flex gap-2">
            <div className="h-8 w-24 animate-pulse rounded bg-gray-700" />
            <div className="h-8 w-24 animate-pulse rounded bg-gray-700" />
            <div className="h-8 w-24 animate-pulse rounded bg-gray-700" />
          </div>

          {/* Section 1: Description */}
          <section className="flex flex-col gap-2">
            <div className="h-6 w-32 animate-pulse rounded bg-gray-700" />
            <div className="space-y-2">
              <div className="h-4 w-full animate-pulse rounded bg-gray-700" />
              <div className="h-4 w-full animate-pulse rounded bg-gray-700" />
              <div className="h-4 w-3/4 animate-pulse rounded bg-gray-700" />
            </div>
          </section>

          {/* Section 2: Recruiting Sessions */}
          <section className="flex flex-col gap-4">
            <div className="h-6 w-32 animate-pulse rounded bg-gray-700" />
            <div className="flex gap-3 overflow-x-auto">
              <div className="laptop:w-[calc((100%-24px)/3)] h-48 w-[calc((100%-12px)/2)] shrink-0 animate-pulse rounded bg-gray-700" />
              <div className="laptop:w-[calc((100%-24px)/3)] h-48 w-[calc((100%-12px)/2)] shrink-0 animate-pulse rounded bg-gray-700" />
            </div>
          </section>

          {/* Section 3: Completed Sessions */}
          <section className="flex flex-col gap-4">
            <div className="h-6 w-32 animate-pulse rounded bg-gray-700" />
            <div className="flex flex-col gap-2">
              <div className="h-20 w-full animate-pulse rounded bg-gray-700" />
              <div className="h-20 w-full animate-pulse rounded bg-gray-700" />
              <div className="h-20 w-full animate-pulse rounded bg-gray-700" />
            </div>
            <div className="h-10 w-40 animate-pulse self-center rounded bg-gray-700" />
          </section>

          {/* Section 4: Reviews */}
          <section className="flex flex-col gap-3 border-t border-t-gray-700 py-5">
            <div className="flex gap-2">
              <div className="h-6 w-32 animate-pulse rounded bg-gray-700" />
              <div className="h-6 w-8 animate-pulse rounded bg-gray-700" />
            </div>
            <div className="flex flex-col gap-4">
              <div className="h-24 w-full animate-pulse rounded bg-gray-700" />
              <div className="h-24 w-full animate-pulse rounded bg-gray-700" />
            </div>
            <div className="mt-4 flex justify-center gap-2">
              <div className="h-8 w-8 animate-pulse rounded bg-gray-700" />
              <div className="h-8 w-8 animate-pulse rounded bg-gray-700" />
              <div className="h-8 w-8 animate-pulse rounded bg-gray-700" />
            </div>
          </section>
        </div>

        {/* Right Column - Crew Card */}
        <div className="laptop:w-[360px] laptop:shrink-0 z-1 -mt-8 w-full animate-pulse flex-col self-start rounded-[20px] bg-gray-700 px-6 py-7 shadow-[0px_10px_30px_-5px_rgba(0,0,0,0.20)]">
          <div className="flex flex-col gap-4">
            <div className="h-20 w-full animate-pulse rounded bg-gray-600" />
            <div className="space-y-2">
              <div className="h-4 w-3/4 animate-pulse rounded bg-gray-600" />
              <div className="h-4 w-1/2 animate-pulse rounded bg-gray-600" />
            </div>
            <div className="h-10 w-full animate-pulse rounded bg-gray-600" />
          </div>
        </div>
      </div>
    </div>
  );
}
