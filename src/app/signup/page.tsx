import { Suspense } from '@suspensive/react';
import SignupForm from '@/components/auth/SignupForm';
import AuthLayout from '@/components/layout/AuthLayout';
import Spinner from '@/components/ui/Spinner';

export default function SignupPage() {
  return (
    <Suspense fallback={<Spinner.Page />}>
      <SignupClient />
    </Suspense>
  );
}

function SignupClient() {
  return (
    <AuthLayout
      title="회원가입"
      form={<SignupForm />}
      footerText="이미 회원이신가요?"
      footerLinkText="로그인"
      footerLinkHref="/signin"
    />
  );
}
