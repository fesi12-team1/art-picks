import { useMutation } from '@tanstack/react-query';
import {
  postSignin,
  postSignout,
  postSignup,
  SigninMutationOption,
  SignoutMutationOption,
  SignupMutationOption,
} from '@/api/fetch/auth';
import { userQueries } from '@/api/queries/userQueries';
import { sessionQueries } from '../queries/sessionQueries';

// 회원가입
export function useSignup(options?: SignupMutationOption) {
  return useMutation({
    mutationFn: postSignup,
    ...options,
    onSuccess: (data, variables, onMutateResult, context) => {
      options?.onSuccess?.(data, variables, onMutateResult, context);
    },
    onError: (error, variables, onMutateResult, context) => {
      options?.onError?.(error, variables, onMutateResult, context);
    },
  });
}

// 로그인
export function useSignin(options?: SigninMutationOption) {
  return useMutation({
    mutationFn: postSignin,
    ...options,
    onSuccess: (data, variables, onMutateResult, context) => {
      // 1. 내 정보 관련 캐시 삭제
      context.client.removeQueries({ queryKey: userQueries.me.all() });
      // 2. 세션 관련 캐시 전체 삭제
      context.client.removeQueries({ queryKey: sessionQueries.all() });
      options?.onSuccess?.(data, variables, onMutateResult, context);
    },
    onError: (error, variables, onMutateResult, context) => {
      options?.onError?.(error, variables, onMutateResult, context);
    },
  });
}

// 로그아웃
export function useSignout(options?: SignoutMutationOption) {
  return useMutation({
    mutationFn: postSignout,
    ...options,
    onSuccess: (data, variables, onMutateResult, context) => {
      context.client.clear();
      options?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}
