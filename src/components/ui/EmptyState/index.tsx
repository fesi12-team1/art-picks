import Image from 'next/image';
import React from 'react';

interface EmptyStateProps {
  imageSrc?: string;
  imageWidth?: number;
  imageHeight?: number;
  message: React.ReactNode;
  className?: string;
}

export default function EmptyState({
  imageSrc,
  message,
  className = 'flex-1',
}: EmptyStateProps) {
  return (
    <div
      className={`flex w-full flex-col items-center justify-center gap-10 ${className}`}
    >
      {imageSrc && (
        <div className="tablet:w-60 tablet:h-[218px] relative aspect-220/199 h-[199px] w-[220px]">
          <Image
            alt="Empty State"
            className="object-contain"
            fill
            src={imageSrc}
          />
        </div>
      )}
      <span className="tablet:text-body2-medium text-body3-medium text-center text-gray-300">
        {message}
      </span>
    </div>
  );
}
