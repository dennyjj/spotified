import { TopArtistItems, UserProfile } from '@/app/lib/definitions';
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

export async function getUserTopItems({
  type,
  timeRange = 'medium_term',
  limit = 20,
  offset = 0,
}: {
  type: 'artists' | 'tracks';
  timeRange?: 'long_term' | 'medium_term' | 'short_term';
  limit?: number;
  offset?: number;
}): Promise<TopArtistItems> {
  const session = await auth();

  const resp = await fetch(
    `${process.env.SPOTIFY_API_TOP_ITEMS_URL!}/${type}?time_range=${timeRange}&limit=${limit}&offset=${offset}`,
    {
      headers: {
        Authorization: `Bearer ${session!.accessToken}`,
      },
      next: { revalidate: 1800 },
    },
  );

  return resp.json();
}
