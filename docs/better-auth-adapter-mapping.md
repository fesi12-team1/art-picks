# Better Auth Adapter Mapping

This document explains how the `BetterAuthLikeClient` interfaces added in this repo map to real Better Auth APIs.

## Why this exists

- We refactored auth/proxy into provider/resolver abstractions:
  - `src/server/auth/signinPostHandler.ts`
  - `src/server/auth/signupPostHandler.ts`
  - `src/server/auth/signoutPostHandler.ts`
  - `src/server/auth/proxyAuthGuard.ts`
- These files include `createBetterAuth*Example(...)` helpers with simplified method names (for teaching).
- This page maps those simplified methods to actual Better Auth methods.

## Mapping table

| Local interface method | Better Auth method | Where to use |
| --- | --- | --- |
| `signInEmail({ email, password })` | `authClient.signIn.email(...)` or `auth.api.signInEmail(...)` | Client sign-in or server route handler |
| `signUpEmail({ name, email, password })` | `authClient.signUp.email(...)` or `auth.api.signUpEmail(...)` | Client sign-up or server route handler |
| `signOut()` | `authClient.signOut(...)` or `auth.api.signOut(...)` | Client sign-out or server route handler |
| `getSession(request)` | `auth.api.getSession({ headers })` | Server/middleware auth check |

## Important server-side note (cookies)

For Next route handlers, you usually need to forward Better Auth `Set-Cookie` headers to the browser response.  
Use server API calls with `returnHeaders: true`, then append `set-cookie` values to `NextResponse`.

## Example adapters (real Better Auth API shape)

```ts
import { auth } from '@/server/auth'; // your betterAuth(...) instance

interface BetterAuthSigninAdapter {
  signInEmail: (payload: {
    email: string;
    password: string;
  }) => Promise<{ status: number; body: unknown; setCookies?: string[] }>;
}

export const betterAuthSigninAdapter: BetterAuthSigninAdapter = {
  async signInEmail(payload) {
    const { response } = await auth.api.signInEmail({
      body: payload,
      returnHeaders: true,
    });

    return {
      status: response.status,
      body: await response.json(),
      setCookies: response.headers.getSetCookie(),
    };
  },
};
```

```ts
import { auth } from '@/server/auth';

interface BetterAuthSignupAdapter {
  signUpEmail: (payload: {
    name: string;
    email: string;
    password: string;
  }) => Promise<{ status: number; body: unknown; setCookies?: string[] }>;
}

export const betterAuthSignupAdapter: BetterAuthSignupAdapter = {
  async signUpEmail(payload) {
    const { response } = await auth.api.signUpEmail({
      body: payload,
      returnHeaders: true,
    });

    return {
      status: response.status,
      body: await response.json(),
      setCookies: response.headers.getSetCookie(),
    };
  },
};
```

```ts
import { auth } from '@/server/auth';

interface BetterAuthSignoutAdapter {
  signOut: () => Promise<{ status: number; body: unknown; setCookies?: string[] }>;
}

export const betterAuthSignoutAdapter: BetterAuthSignoutAdapter = {
  async signOut() {
    const { response } = await auth.api.signOut({
      returnHeaders: true,
    });

    return {
      status: response.status,
      body: await response.json(),
      setCookies: response.headers.getSetCookie(),
    };
  },
};
```

```ts
import type { NextRequest } from 'next/server';
import { auth } from '@/server/auth';

interface BetterAuthSessionAdapter {
  getSession: (
    request: NextRequest
  ) => Promise<{ authenticated: boolean }>;
}

export const betterAuthSessionAdapter: BetterAuthSessionAdapter = {
  async getSession(request) {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    return { authenticated: Boolean(session?.user?.id) };
  },
};
```

## Official Better Auth references

- Client methods (`signIn.email`, `signOut`, client usage):  
  <https://www.better-auth.com/docs/concepts/client>
- Email/password auth (`signUp.email`, `signIn.email`, `signOut`, server examples):  
  <https://www.better-auth.com/docs/authentication/email-password>
- Server API usage (`auth.api.*`, `getSession`, `returnHeaders`, `asResponse`):  
  <https://www.better-auth.com/docs/concepts/api>
