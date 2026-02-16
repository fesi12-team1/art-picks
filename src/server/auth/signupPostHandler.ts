import { NextRequest, NextResponse } from 'next/server';

export interface SignupProviderResponse {
  status: number;
  body: unknown;
  forwardedSetCookies?: string[];
}

export interface SignupProvider {
  signUp: (
    request: NextRequest,
    body: unknown
  ) => Promise<SignupProviderResponse>;
}

export function createSignupPostHandler(provider: SignupProvider) {
  return async function POST(request: NextRequest) {
    try {
      const body = await request.json();
      const result = await provider.signUp(request, body);
      const response = NextResponse.json(result.body, {
        status: result.status,
      });

      result.forwardedSetCookies?.forEach((cookie) => {
        response.headers.append('Set-Cookie', cookie);
      });

      return response;
    } catch (error) {
      return NextResponse.json(
        {
          code: 'SERVER_ERROR',
          message:
            error instanceof Error
              ? error.message
              : '서버에 연결할 수 없습니다.',
        },
        { status: 500 }
      );
    }
  };
}

interface BetterAuthLikeClient {
  signUpEmail: (payload: {
    name: string;
    email: string;
    password: string;
  }) => Promise<{ status: number; body: unknown; setCookies?: string[] }>;
}

/**
 * Better Auth 교체 시나리오 예시:
 * - 회원가입 로직을 Better Auth provider로 이동
 * - 필요 시 회원가입 직후 세션 쿠키를 같이 전달 가능
 */
export function createBetterAuthSignupProviderExample(
  authClient: BetterAuthLikeClient
): SignupProvider {
  return {
    async signUp(_request, body) {
      if (
        !body ||
        typeof body !== 'object' ||
        !('name' in body) ||
        !('email' in body) ||
        !('password' in body)
      ) {
        return {
          status: 400,
          body: {
            code: 'BAD_REQUEST',
            message: 'name/email/password가 필요합니다.',
          },
        };
      }

      const result = await authClient.signUpEmail({
        name: String(body.name),
        email: String(body.email),
        password: String(body.password),
      });

      return {
        status: result.status,
        body: result.body,
        forwardedSetCookies: result.setCookies,
      };
    },
  };
}
