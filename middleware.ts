import NextAuth from 'next-auth';
import authConfig from '@/auth.config';

// 配置分离
const { auth } = NextAuth(authConfig);

import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from '@/routes';
import { ROUTE_AUTH_LOGIN } from '@/lib/getEnv';

export default auth(req => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiRoute) {
    return;
  }

  if (isAuthRoute) {
    // 已登录的不要停留在登录页面捣乱
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    // 记住登录之前访问过的 url;
    let callBackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callBackUrl += nextUrl.search;
    }
    const encodeCallBackUrl = encodeURIComponent(callBackUrl);

    return Response.redirect(
      new URL(`${ROUTE_AUTH_LOGIN}?callbackUrl=${encodeCallBackUrl}`, nextUrl)
    );
  }

  // console.log('[Middleware] pathname:', req.nextUrl.pathname);
  // console.log('[Middleware] isLoggedIn:', isLoggedIn);

  return;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  // matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
  // matcher: ['/api/auth'],
  // clerk 的匹配器
  matcher: [
    // Exclude files with a "." followed by an extension, which are typically static files.
    // Exclude files in the _next directory, which are Next.js internals.
    '/((?!.+\\.[\\w]+$|_next).*)',
    // Re-include any files in the api or trpc folders that might have an extension
    '/(api|trpc)(.*)',
  ],
};
