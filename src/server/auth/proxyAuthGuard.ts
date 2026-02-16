import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export interface ProxyAuthGuardOptions {
  authRequiredPaths: RegExp[];
  authOnlyPaths: RegExp[];
  onAuthenticatedRedirectTo?: string;
}

export interface SessionResolver {
  isLoggedIn: (request: NextRequest) => boolean | Promise<boolean>;
}

const DEFAULT_REDIRECT_PATH = '/my';

const isMatchPath = (pathname: string, patterns: RegExp[]) =>
  patterns.some((pattern) => pattern.test(pathname));

const isValidRedirectPath = (path: string): boolean => {
  if (!path.startsWith('/')) return false;
  if (path.startsWith('//')) return false;
  if (path.match(/^[\w]+:/)) return false;
  return true;
};

const createSigninRedirectUrl = (request: NextRequest) => {
  const { pathname, search } = request.nextUrl;
  const fullPath = pathname + search;

  const safePath = isValidRedirectPath(fullPath) ? fullPath : '/';
  const redirect = encodeURIComponent(safePath);
  const signinUrl = new URL('/signin', request.url);
  signinUrl.searchParams.set('redirect', redirect);
  signinUrl.searchParams.set('reason', 'auth');

  return signinUrl;
};

export function createProxyAuthGuard(
  resolver: SessionResolver,
  options: ProxyAuthGuardOptions
) {
  return async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const loggedIn = await resolver.isLoggedIn(request);
    const redirectPath =
      options.onAuthenticatedRedirectTo ?? DEFAULT_REDIRECT_PATH;

    if (loggedIn && isMatchPath(pathname, options.authOnlyPaths))
      return NextResponse.redirect(new URL(redirectPath, request.url));

    if (!loggedIn && isMatchPath(pathname, options.authRequiredPaths))
      return NextResponse.redirect(createSigninRedirectUrl(request));

    return NextResponse.next();
  };
}

interface BetterAuthLikeSessionClient {
  getSession: (request: NextRequest) => Promise<{ authenticated: boolean }>;
}

/**
 * Better Auth 교체 시나리오 예시:
 * - refreshToken 쿠키 존재 여부가 아닌
 * - Better Auth 세션 조회 결과로 인증 여부 판단
 */
export function createBetterAuthSessionResolverExample(
  authClient: BetterAuthLikeSessionClient
): SessionResolver {
  return {
    async isLoggedIn(request) {
      const session = await authClient.getSession(request);
      return session.authenticated;
    },
  };
}
