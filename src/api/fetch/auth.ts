import { UseMutationOptions } from '@tanstack/react-query';
import { ApiError } from '@/lib/error';
import { User, UserCredentials } from '@/types';
import request from './request';

export type SignupRequestBody = UserCredentials & { name: string };
export type SignupMutationOption = UseMutationOptions<
  User,
  ApiError,
  SignupRequestBody
>;
export async function postSignup(body: SignupRequestBody) {
  return request<User>('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}

type SigninResponseData = { token: string };
export type SigninMutationOption = UseMutationOptions<
  SigninResponseData,
  ApiError,
  UserCredentials
>;
export async function postSignin(body: UserCredentials) {
  return request<SigninResponseData>('/api/auth/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}

type SignoutResponseData = { message: string };
export type SignoutMutationOption = UseMutationOptions<
  SignoutResponseData,
  ApiError,
  void
>;
export async function postSignout() {
  return request<SignoutResponseData>('/api/auth/signout', {
    method: 'POST',
  });
}
