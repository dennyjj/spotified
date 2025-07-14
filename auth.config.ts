import { NextAuthConfig } from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

const scopes =
  'user-read-recently-played user-read-playback-state user-top-read user-modify-playback-state user-read-currently-playing user-follow-read playlist-read-private user-read-email user-read-private user-library-read playlist-read-collaborative';

console.log('Scopes configured:', scopes);
console.log('Scopes transformed:', scopes.split(' ').join(','));

export const authConfig = {
  trustHost: true,
  debug: true,
  pages: {
    signIn: '/login',
  },
  providers: [
    {
      id: 'spotify',
      name: 'Spotify',
      type: 'oauth',
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      authorization: `https://accounts.spotify.com/authorize?scope=${encodeURIComponent(scopes)}&show_dialog=true`,
      token: {
        url: 'https://accounts.spotify.com/api/token',
        async request(context: any) {
          const { provider, params } = context;
          console.log('Custom token handler called');
          const response = await fetch('https://accounts.spotify.com/api/token', {
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
          console.log('Spotify response status:', response.status);
          console.log('Spotify response headers:', Object.fromEntries(response.headers.entries()));
          console.log('Spotify response body:', text);
          
          try {
            return JSON.parse(text);
          } catch (error) {
            console.error('JSON parse error:', error);
            console.error('Raw response text:', text);
            throw new Error(`Invalid JSON response from Spotify (${response.status}): ${text}`);
          }
        },
      },
      userinfo: {
        url: 'https://api.spotify.com/v1/me',
        async request(context: any) {
          const { tokens } = context;
          console.log('Userinfo request called with tokens:', tokens);
          const response = await fetch('https://api.spotify.com/v1/me', {
            headers: {
              'Authorization': `Bearer ${tokens.access_token}`,
            },
          });
          
          const text = await response.text();
          console.log('Spotify userinfo response status:', response.status);
          console.log('Spotify userinfo response headers:', Object.fromEntries(response.headers.entries()));
          console.log('Spotify userinfo response body:', text);
          
          try {
            return JSON.parse(text);
          } catch (error) {
            console.error('Userinfo JSON parse error:', error);
            console.error('Raw userinfo response text:', text);
            throw new Error(`Invalid JSON response from Spotify userinfo (${response.status}): ${text}`);
          }
        },
      },
      profile(profile: any) {
        return {
          id: profile.id,
          name: profile.display_name,
          email: profile.email,
          image: profile.images?.[0]?.url,
        };
      },
      allowDangerousEmailAccountLinking: true,
    } as any,
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
