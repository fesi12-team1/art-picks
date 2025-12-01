import { Profile, ResponseData, ResponseError } from '@/types';

export async function getCurrentUserProfile() {
  const response = await fetch('/api/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data: ResponseData<Profile, ResponseError> = await response.json();
  return data;
}

export async function updateUserProfile(
  body: Pick<
    Profile,
    'name' | 'image' | 'introduction' | 'city' | 'pace' | 'styles'
  >
) {
  const response = await fetch('/api/user', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data: ResponseData<Profile, ResponseError> = await response.json();
  return data;
}

export async function getUserProfileById(userId: string) {
  const response = await fetch(`/api/user/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  type UserProfileResponseError = ResponseError & {
    code: 'USER_NOT_FOUND';
    message: '사용자를 찾을 수 없습니다.';
  };
  const data: ResponseData<
    Omit<Profile, 'updatedAt'>,
    UserProfileResponseError
  > = await response.json();
  return data;
}
