import { auth } from '@/auth';
import { UserProfile } from './definitions';

export async function getCurrentUserProfile(): Promise<UserProfile> {
  const session = await auth();

  const resp = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
  });

  return resp.json();
}
