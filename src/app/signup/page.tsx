import Link from 'next/link';
import BgPc from '@/assets/layout/bg/pc.svg?react';
import Banner from '@/assets/layout/img/pc.svg?react';
import SignupForm from '@/components/auth/SignupForm';

export default function SignupPage() {
  return (
    <main className="h-main relative flex items-center justify-center">
      <div className="desktop:block z-0 hidden">
        <BgPc className="absolute w-1/2" />
      </div>
      <div className="laptop:grid-cols-2 desktop:h-full grid grid-cols-1 items-center gap-20">
        <Banner className="z-10" />
        <div className="z-20">
          <h2 className="text-title2-semibold mb-8 text-center">회원가입</h2>
          <SignupForm />
          <p className="text-body3-medium mt-6 text-center">
            이미 회원이신가요?
            <Link href="/signin" className="text-brand-300 ml-1">
              로그인
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
