import { NextRequest, NextResponse } from 'next/server';

export interface SigninProviderResponse {
  status: number;
  body: unknown;
  accessToken?: string;
  forwardedSetCookies?: string[];
}

export interface SigninProvider {
  signIn: (
    request: NextRequest,
    body: unknown
  ) => Promise<SigninProviderResponse>;
}

export function createSigninPostHandler(provider: SigninProvider) {
  return async function POST(request: NextRequest) {
    try {
      const body = await request.json();
      const result = await provider.signIn(request, body);
      const response = NextResponse.json(result.body, {
        status: result.status,
      });

      if (result.accessToken) {
        response.cookies.set('accessToken', result.accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
          path: '/',
          maxAge: 60 * 60, // 1 hour
        });
      }

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
  signInEmail: (credentials: {
    email: string;
    password: string;
  }) => Promise<{ status: number; body: unknown; setCookies?: string[] }>;
}

/**
 * Better Auth 교체 시나리오 예시:
 * - access token 쿠키를 직접 관리하지 않고
 * - Better Auth가 만든 세션 쿠키를 그대로 전달
 */
export function createBetterAuthSigninProviderExample(
  authClient: BetterAuthLikeClient
): SigninProvider {
  return {
    async signIn(_request, body) {
      if (
        !body ||
        typeof body !== 'object' ||
        !('email' in body) ||
        !('password' in body)
      ) {
        return {
          status: 400,
          body: {
            code: 'BAD_REQUEST',
            message: '이메일/비밀번호가 필요합니다.',
          },
        };
      }

      const result = await authClient.signInEmail({
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
