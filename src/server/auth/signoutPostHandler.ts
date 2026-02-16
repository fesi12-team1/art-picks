import { NextRequest, NextResponse } from 'next/server';

export interface SignoutProviderResponse {
  status: number;
  body: unknown;
  clearAccessToken?: boolean;
  clearRefreshToken?: boolean;
  forwardedSetCookies?: string[];
}

export interface SignoutProvider {
  signOut: (request: NextRequest) => Promise<SignoutProviderResponse>;
}

export function createSignoutPostHandler(provider: SignoutProvider) {
  return async function POST(request: NextRequest) {
    try {
      const result = await provider.signOut(request);
      const response = NextResponse.json(result.body, {
        status: result.status,
      });

      if (result.clearAccessToken) {
        response.cookies.set('accessToken', '', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
          path: '/',
          maxAge: 0,
        });
      }

      if (result.clearRefreshToken) {
        response.cookies.set('refreshToken', '', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
          path: '/',
          maxAge: 0,
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
  signOut: () => Promise<{
    status: number;
    body: unknown;
    setCookies?: string[];
  }>;
}

/**
 * Better Auth 교체 시나리오 예시:
 * - signOut 호출 후 Better Auth 쿠키를 그대로 전달
 * - 기존 커스텀 쿠키도 동시에 정리 가능
 */
export function createBetterAuthSignoutProviderExample(
  authClient: BetterAuthLikeClient
): SignoutProvider {
  return {
    async signOut() {
      const result = await authClient.signOut();

      return {
        status: result.status,
        body: result.body,
        clearAccessToken: true,
        clearRefreshToken: true,
        forwardedSetCookies: result.setCookies,
      };
    },
  };
}
