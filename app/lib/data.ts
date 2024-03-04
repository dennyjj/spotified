import { auth } from '@/auth';
import { UserProfile } from './definitions';
import { signIn } from 'next-auth/react';

export async function getCurrentUserProfile(): Promise<UserProfile> {
  const session = await auth();

  if (session?.error === 'RefreshAccessTokenError') {
    //TODO: can we use signIn here?
    signIn();
  }

  const resp = await fetch(process.env.SPOTIFY_API_ME_URL!, {
    headers: {
      Authorization: `Bearer ${session!.accessToken}`,
    },
  });

  return resp.json();
}
