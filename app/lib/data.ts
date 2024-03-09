import { auth } from '@/auth';
import { UserProfile } from './definitions';

export async function getCurrentUserProfile(): Promise<UserProfile> {
  const session = await auth();

  const resp = await fetch(process.env.SPOTIFY_API_ME_URL!, {
    headers: {
      Authorization: `Bearer ${session!.accessToken}`,
    },
    next: { revalidate: 1800 },
  });

  return resp.json();
}
