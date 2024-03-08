import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken: string;
    expiresAt: number;
    refreshToken: string;
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    accessToken?: string;
    expiresAt?: number;
    refreshToken?: string;
  }
}
