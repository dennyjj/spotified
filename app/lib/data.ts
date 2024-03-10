import { UserProfile } from '@/app/lib/definitions';
import { auth } from '@/auth';

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

export async function getUserTopItems(type: 'artists' | 'tracks'): Promise<any> {
  const session = await auth();

  const resp = await fetch(`${process.env.SPOTIFY_API_TOP_ITEMS_URL!}/${type}`, {
    headers: {
      Authorization: `Bearer ${session!.accessToken}`,
    },
    next: { revalidate: 1800 },
  });

  return resp.json();
}
