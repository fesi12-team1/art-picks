'use client';

import { useRouter } from 'next/navigation';
import ShevronLeft from '@/assets/icons/chevron-left.svg?react';

export default function Page() {
  return (
    <main className="h-main laptop:my-[50px] laptop:py-0 laptop:px-8 mx-auto max-w-[1120px] p-6">
      <div className="mb-6 flex items-center gap-2">
        <BackButton />
        <h1 className="text-body1-semibold laptop:text-title2-semibold">
          세션 생성하기
        </h1>
      </div>
      <SessionCreateForm />
    </main>
  );
}

export function BackButton() {
  const router = useRouter();

  const handleClick = () => {
    if (window.history.length > 1) router.back();
    else router.replace('/sessions');
  };

  return <ShevronLeft type="button" onClick={handleClick} className="size-6" />;
}

function SessionCreateForm() {
  return (
    <div>
      <h1>Create a New Session</h1>
    </div>
  );
}
