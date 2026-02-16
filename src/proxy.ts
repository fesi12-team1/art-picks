import type { NextRequest } from 'next/server';
import { createProxyAuthGuard } from '@/server/auth/proxyAuthGuard';

const AUTH_REQUIRED_PATHS: RegExp[] = [
  /^\/my(\/.*)?$/,
  /^\/crews\/[^/]+\/create-session$/,
  /^\/sessions\/likes$/,
];

const AUTH_ONLY_PATHS: RegExp[] = [/^\/signin$/, /^\/signup$/];

const cookieSessionResolver = {
  isLoggedIn(request: NextRequest) {
    return request.cookies.has('refreshToken');
  },
};

export const proxy = createProxyAuthGuard(cookieSessionResolver, {
  authRequiredPaths: AUTH_REQUIRED_PATHS,
  authOnlyPaths: AUTH_ONLY_PATHS,
  onAuthenticatedRedirectTo: '/my',
});

export const config = {
  matcher: ['/((?!api|_next|favicon.ico|assets).*)'],
};
