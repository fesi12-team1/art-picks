import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  createSession,
  deleteSession,
  registerForSession,
  unregisterFromSession,
  updateSessionDetail,
  UpdateSessionDetailRequestBody,
} from '@/api/fetch/sessions';
import { sessionQueries } from '@/api/queries/sessionQueries';

// 세션 생성
export function useCreateSession() {
  return useMutation({
    mutationFn: createSession,
    onSuccess: (data, variables, onMutateResult, context) => {
      context.client.invalidateQueries({
        queryKey: sessionQueries.lists(), // 세션 목록 캐시 무효화
      });
    },
  });
}

// 세션 정보 수정
export function useUpdateSession(sessionId: number) {
  return useMutation({
    mutationFn: (body: UpdateSessionDetailRequestBody) =>
      updateSessionDetail(sessionId, body),
    onSuccess: (data, variables, onMutateResult, context) => {
      context.client.invalidateQueries({
        queryKey: sessionQueries.detail(sessionId).queryKey, // 세션 상세 캐시 무효화
      });
      context.client.invalidateQueries({
        queryKey: sessionQueries.lists(), // 세션 목록 캐시 무효화
      });
    },
  });
}

// 세션 참여
export function useRegisterSession(
  sessionId: number,
  options?: UseMutationOptions
) {
  return useMutation({
    mutationFn: () => registerForSession(sessionId),
    ...options, // 외부에서 전달한 onError, onSuccess 등을 전개
    onSuccess: (data, variables, onMutateResult, context) => {
      // 1. 내부 로직: 캐시 무효화
      context.client.invalidateQueries({
        queryKey: sessionQueries.participants(sessionId).queryKey,
      });
      context.client.invalidateQueries({
        queryKey: sessionQueries.detail(sessionId).queryKey,
      });

      // 2. 외부에서 전달한 onSuccess가 있다면 실행
      options?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}
// 세션 참여 취소
export function useUnregisterSession(sessionId: number) {
  return useMutation({
    mutationFn: () => unregisterFromSession(sessionId),
    onSuccess: (data, variables, onMutateResult, context) => {
      context.client.invalidateQueries({
        queryKey: sessionQueries.participants(sessionId).queryKey, // 세션 참여자 목록 캐시 무효화
      });
      context.client.invalidateQueries({
        queryKey: sessionQueries.detail(sessionId).queryKey, // 세션 상세 캐시 무효화
      });
    },
  });
}

// 세션 삭제
export function useDeleteSession(sessionId: number) {
  return useMutation({
    mutationFn: () => deleteSession(sessionId),
    onSuccess: (data, variables, onMutateResult, context) => {
      context.client.invalidateQueries({ queryKey: sessionQueries.lists() });
    },
  });
}
