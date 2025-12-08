'use client';

import Share from '@/assets/icons/share.svg';
import FixedBottomBar from '@/components/hoc/FixedBottomBar';
import Button from '@/components/ui/Button';

export default function Page() {
  const handleShare = () => {};
  const handleClick = () => {};

  return (
    <div className="tablet:mx-8 laptop:mx-100 mx-4 flex h-screen flex-col items-center gap-12">
      {process.env.NODE_ENV === 'development' && (
        <div>
          <span className="tablet:hidden text-white">mobile</span>
          <span className="tablet:inline-flex laptop:hidden hidden text-white">
            tablet
          </span>
          <span className="laptop:inline-flex hidden text-white">laptop</span>
        </div>
      )}
      <FixedBottomBar>
        <button onClick={handleShare}>
          <Share className="size-6" />
        </button>
        <Button className="bg-brand-500 flex-1 px-6 py-3" onClick={handleClick}>
          가입하기
        </Button>
      </FixedBottomBar>
    </div>
  );
}
