import { NextRequest } from 'next/server';
import { getBackendUrl } from '@/server/api/utils';
import {
  createSigninPostHandler,
  SigninProvider,
} from '@/server/auth/signinPostHandler';

const javaBackendSigninProvider: SigninProvider = {
  async signIn(request: NextRequest, body: unknown) {
    const proxyResponse = await fetch(getBackendUrl(request.nextUrl), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(body),
      cache: 'no-cache',
    });

    if (!proxyResponse.ok) {
      const errorData = await proxyResponse.json();
      return {
        status: proxyResponse.status,
        body: { ...errorData },
      };
    }

    const payload = await proxyResponse.json();
    const token = payload?.data?.token;

    if (!token) {
      return {
        status: 500,
        body: {
          code: 'INVALID_RESPONSE',
          message: '서버 응답에 토큰이 없습니다.',
        },
      };
    }

    return {
      status: proxyResponse.status,
      body: payload,
      accessToken: token,
      forwardedSetCookies: proxyResponse.headers
        .getSetCookie()
        .map((cookieString) => cookieString.replace(/Path=\/[^;]*/i, 'Path=/')),
    };
  },
};

export const POST = createSigninPostHandler(javaBackendSigninProvider);
