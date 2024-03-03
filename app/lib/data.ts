import { auth } from '@/auth';
import { UserProfile } from './definitions';
import { signIn } from 'next-auth/react';

export async function getCurrentUserProfile(): Promise<UserProfile> {
  const session = await auth();

  if (session?.error === 'RefreshAccessTokenError') {
    // can we use signIn here?
    signIn();
  }

  const resp = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: `Bearer ${session!.accessToken}`,
    },
  });

  return resp.json();
}
