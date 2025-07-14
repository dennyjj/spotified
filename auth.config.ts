import { NextAuthConfig } from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

const scopes =
  'user-read-recently-played user-read-playback-state user-top-read user-modify-playback-state user-read-currently-playing user-follow-read playlist-read-private user-read-email user-read-private user-library-read playlist-read-collaborative';

export const authConfig = {
  trustHost: true,
  debug: true,
  pages: {
    signIn: '/login',
  },
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: scopes.split(' ').join(','),
          show_dialog: 'true',
        },
      },
      allowDangerousEmailAccountLinking: true,
      token: {
        url: 'https://accounts.spotify.com/api/token',
        async request(context: any) {
          const { provider, params } = context;
          const response = await fetch(provider.token.url!, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': `Basic ${Buffer.from(`${provider.clientId}:${provider.clientSecret}`).toString('base64')}`,
            },
            body: new URLSearchParams({
              grant_type: 'authorization_code',
              code: params.code!,
              redirect_uri: params.redirect_uri!,
            }),
          });
          
          const text = await response.text();
          try {
            return JSON.parse(text);
          } catch (error) {
            console.error('Spotify token response:', text);
            throw new Error(`Invalid JSON response from Spotify: ${text.substring(0, 100)}`);
          }
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
