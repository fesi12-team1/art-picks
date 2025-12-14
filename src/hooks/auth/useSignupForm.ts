'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { postSignup, SignupRequestBody } from '@/api/auth';
import {
  SignupFormValues,
  signupSchema,
} from '@/lib/validations/auth/signupSchema';
import type { ResponseErrorData, User } from '@/types';

/**
 * 회원가입 훅
 * @returns 회원가입 폼, 제출 핸들러, 제출 중 상태
 */
export function useSignupForm() {
  const router = useRouter();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: 'onSubmit',
  });

  // const signupMutation = useSignup();
  const signupMutation = useMutation<
    User,
    ResponseErrorData,
    SignupRequestBody
  >({
    mutationFn: postSignup,
  });

  const submit = form.handleSubmit((values) => {
    signupMutation.mutate(
      {
        email: values.email,
        password: values.password,
        name: values.name,
      },
      {
        onSuccess: () => {
          router.push('/signin');
        },
        onError: ({ error }: ResponseErrorData) => {
          switch (error.code) {
            case 'ALREADY_EXISTS_EMAIL':
              form.setError('email', {
                message: error.message,
              });
              break;

            case 'VALIDATION_ERROR':
              form.setError('root', {
                message: error.message,
              });
              break;

            default:
              form.setError('root', {
                message: '회원가입 중 오류가 발생했습니다.',
              });
          }
        },
      }
    );
  });

  return {
    form,
    submit,
    isPending: signupMutation.isPending,
  };
}
