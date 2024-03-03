import { NextAuthConfig } from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

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
      if (account) {
        return {
          accessToken: account.access_token,
          expiresAt: account.expires_at,
          refreshToken: account.refresh_token,
        };
      } else if (Date.now() < (token.expiresAt as number) * 1000) {
        return token;
      } else {
        try {
          const { accessToken, refreshToken, expiresAt } =
            await refreshAccessToken(token.refreshToken as string);

          return {
            ...token,
            accessToken,
            expiresAt,
            refreshToken,
          };
        } catch (e) {
          return { ...token, error: 'RefreshAccessTokenError' as const };
        }
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

async function refreshAccessToken(refreshToken: string) {
  console.log(`refreshing token...`);
  try {
    const url = 'https://accounts.spotify.com/api/token';

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' +
          Buffer.from(
            process.env.SPOTIFY_CLIENT_ID +
              ':' +
              process.env.SPOTIFY_CLIENT_SECRET
          ).toString('base64'),
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
    });

    const refreshedToken: SpotifyTokenResponse = await response.json();

    console.log('fetched refreshedToken: ', refreshedToken);
    return {
      accessToken: refreshedToken.access_token,
      expiresAt: Math.floor(Date.now() / 1000) + refreshedToken.expires_in,
      refreshToken: refreshedToken.refresh_token ?? refreshToken,
    };
  } catch (e) {
    console.log(e);
    return {
      error: 'RefreshAccessTokenError',
    };
  }
}

interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}
