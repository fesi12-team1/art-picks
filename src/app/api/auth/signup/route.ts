import { NextRequest } from 'next/server';
import { getBackendUrl } from '@/server/api/utils';
import {
  createSignupPostHandler,
  SignupProvider,
} from '@/server/auth/signupPostHandler';

const javaBackendSignupProvider: SignupProvider = {
  async signUp(request: NextRequest, body: unknown) {
    const proxyResponse = await fetch(getBackendUrl(request.nextUrl), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(body),
      cache: 'no-cache',
    });

    const payload = await proxyResponse.json();
    return {
      status: proxyResponse.status,
      body: payload,
    };
  },
};

export const POST = createSignupPostHandler(javaBackendSignupProvider);
