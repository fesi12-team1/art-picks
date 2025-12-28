'use client';

import { useRouter } from 'next/navigation';
import ShevronLeft from '@/assets/icons/chevron-left.svg?react';

export default function BackButton() {
  const router = useRouter();

  const handleClick = () => {
    if (window.history.length > 1) router.back();
    else router.replace('/sessions');
  };

  return (
    <ShevronLeft
      type="button"
      onClick={handleClick}
      className="size-6 hover:cursor-pointer"
    />
  );
}
