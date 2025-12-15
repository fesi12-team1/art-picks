import Link from 'next/link';
import BgPc from '@/assets/layout/bg/pc.svg?react';
import Banner from '@/assets/layout/img/pc.svg?react';
import SigninForm from '@/components/auth/SigninForm';

export default function SigninPage() {
  return (
    <main className="h-main relative flex items-center justify-center">
      <div className="desktop:block z-0 hidden">
        <BgPc className="absolute w-1/2" />
      </div>
      <div className="laptop:grid-cols-2 desktop:h-full grid grid-cols-1 items-center gap-20">
        <Banner className="z-10" />
        <div className="z-20">
          <h2 className="text-title2-semibold mb-8 text-center">로그인</h2>
          <SigninForm />
          <p className="text-body3-medium mt-6 text-center">
            런핏이 처음이신가요?
            <Link href="/signup" className="text-brand-300 ml-1">
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
