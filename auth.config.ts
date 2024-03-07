import { NextAuthConfig } from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';
import refreshAccessToken from './auth.util';

const scopes =
  'user-read-recently-played user-read-playback-state user-top-read user-modify-playback-state user-read-currently-playing user-follow-read playlist-read-private user-read-email user-read-private user-library-read playlist-read-collaborative';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      authorization: {
        params: { scopes },
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnLoginPage = nextUrl.pathname.startsWith('/login');

      if (isLoggedIn) {
        return isOnLoginPage ? Response.redirect(new URL('/', nextUrl)) : true;
      } else {
        return false;
      }
    },

    async jwt({ token, account }) {
      // FIXME: jwt callback rapid trigger issue
      if (account) {
        return {
          ...token,
          accessToken: account.access_token,
          expiresAt: account.expires_at,
          refreshToken: account.refresh_token,
        };
      }

      if (Date.now() < token.expiresAt! * 1000) {
        return token;
      }

      try {
        const { accessToken, expiresAt, refreshToken } =
          await refreshAccessToken(token.refreshToken!);
        return {
          ...token,
          accessToken,
          expiresAt,
          refreshToken,
        };
      } catch (e) {
        return { ...token, error: 'RefreshAccessTokenError' as const };
      }
    },

    async session({ session, token }) {
      return {
        ...session,
        accessToken: token.accessToken,
        error: token.error,
      };
    },
  },
} satisfies NextAuthConfig;
