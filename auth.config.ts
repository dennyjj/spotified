import { NextAuthConfig } from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

// TODO: select the scopes we need in the future
// const scopes =
//   'user-read-recently-played user-read-playback-state user-top-read user-modify-playback-state user-read-currently-playing user-follow-read playlist-read-private user-read-email user-read-private user-library-read playlist-read-collaborative';

const scopes = ['user-read-email', 'user-read-private', 'user-top-read'];

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: scopes.join(' '),
        },
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnLoginPage = nextUrl.pathname.startsWith('/login');

      if (isLoggedIn) {
        return isOnLoginPage ? Response.redirect(new URL('/profile', nextUrl)) : true;
      } else {
        return false;
      }
    },

    async jwt({ token, account }) {
      console.log('JWT Callback - Account:', account);
      console.log('JWT Callback - Token:', token);

      if (account) {
        return {
          ...token,
          accessToken: account.access_token,
          expiresAt: account.expires_at,
          refreshToken: account.refresh_token,
        };
      }

      return token;
    },

    async session({ session, token }) {
      return {
        ...session,
        accessToken: token.accessToken,
        expiresAt: token.expiresAt,
        refreshToken: token.refreshToken,
      };
    },
  },
} satisfies NextAuthConfig;
