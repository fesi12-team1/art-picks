import { NextRequest } from 'next/server';
import { getBackendUrl } from '@/server/api/utils';
import {
  createSignoutPostHandler,
  SignoutProvider,
} from '@/server/auth/signoutPostHandler';
import { getAccessToken } from '@/server/cookies';

const javaBackendSignoutProvider: SignoutProvider = {
  async signOut(request: NextRequest) {
    const accessToken = await getAccessToken();
    const proxyResponse = await fetch(getBackendUrl(request.nextUrl), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
      cache: 'no-cache',
    });

    const payload = await proxyResponse.json();

    if (!proxyResponse.ok) {
      return {
        status: proxyResponse.status,
        body: { ...payload },
        clearAccessToken: proxyResponse.status === 401,
      };
    }

    return {
      status: proxyResponse.status,
      body: payload,
      clearAccessToken: true,
      clearRefreshToken: true,
      forwardedSetCookies: proxyResponse.headers.getSetCookie(),
    };
  },
};

export const POST = createSignoutPostHandler(javaBackendSignoutProvider);
