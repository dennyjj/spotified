import NextAuth from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authConfig } from './auth.config';
import { auth } from './auth';

export default NextAuth(authConfig).auth;

export const middleware = async (request: NextRequest) => {
  if (
    request.nextUrl.pathname !== '/login' &&
    request.nextUrl.pathname.startsWith('/')
  ) {
    const session = await auth();
    if (!session) {
      return handleUnauthenticatedRequest(request);
    }

    const cookies = request.cookies.getAll();
    const sessionTokenCookie = getSessionTokenCookie();

    const isSessionTokenPresent = cookies.some((cookie) =>
      cookie.name.includes(sessionTokenCookie)
    );

    const isTokenExpired =
      session.expiresAt < getCurrentUnixTimestampInSeconds();

    if (!isSessionTokenPresent || isTokenExpired) {
      return handleUnauthenticatedRequest(request);
    }
  }
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};

function redirectToLogin(request: NextRequest) {
  return NextResponse.redirect(new URL('/login', request.url));
}

function clearAuthjsCookies(request: NextRequest, response: NextResponse) {
  request.cookies.getAll().forEach((cookie) => {
    if (cookie.name.includes('authjs')) response.cookies.delete(cookie.name);
  });
}

function handleUnauthenticatedRequest(request: NextRequest) {
  const response = redirectToLogin(request);
  clearAuthjsCookies(request, response);
  return response;
}

function getSessionTokenCookie() {
  return process.env.NEXT_PUBLIC_VERCEL_URL?.startsWith('https://')
    ? '__Secure-authjs.session-token'
    : 'authjs.session-token';
}

function getCurrentUnixTimestampInSeconds(): number {
  return Math.floor(Date.now() / 1000);
}
