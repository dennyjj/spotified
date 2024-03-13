import { ArtistTopItems, TrackTopItems, UserProfile } from '@/app/lib/definitions';
import { auth } from '@/auth';

type GetUserTopItemsParams = {
  type: 'artists' | 'tracks';
  timeRange?: 'long_term' | 'medium_term' | 'short_term';
  limit?: number;
  offset?: number;
};

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

export async function getUserTopArtists(): Promise<ArtistTopItems> {
  return getUserTopItems({ type: 'artists' });
}

export async function getUserTopTracks(): Promise<TrackTopItems> {
  return getUserTopItems({ type: 'tracks' });
}

async function getUserTopItems<T extends GetUserTopItemsParams>({
  type,
  timeRange = 'medium_term',
  limit = 20,
  offset = 0,
}: T): Promise<T['type'] extends 'artists' ? ArtistTopItems : TrackTopItems> {
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
