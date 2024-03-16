import { ArtistTopItems, TrackTopItems, UserProfile } from '@/app/lib/definitions';
import { auth } from '@/auth';
import { match } from 'ts-pattern';

export type TimeRange = 'short-term' | 'medium-term' | 'long-term';
type GetUserTopItemsParams = {
  type: 'artists' | 'tracks';
  timeRange?: TimeRange;
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

export async function getUserTopArtists(timeRange: TimeRange): Promise<ArtistTopItems> {
  return getUserTopItems({ type: 'artists', timeRange });
}

export async function getUserTopTracks(timeRange: TimeRange): Promise<TrackTopItems> {
  return getUserTopItems({ type: 'tracks', timeRange });
}

async function getUserTopItems<T extends GetUserTopItemsParams>({
  type,
  timeRange = 'medium-term',
  limit = 20,
  offset = 0,
}: T): Promise<T['type'] extends 'artists' ? ArtistTopItems : TrackTopItems> {
  const session = await auth();

  const resp = await fetch(
    `${process.env.SPOTIFY_API_TOP_ITEMS_URL!}/${type}?time_range=${match(timeRange)
      .with('short-term', () => 'short_term')
      .with('medium-term', () => 'medium_term')
      .with('long-term', () => 'long_term')
      .exhaustive()}&limit=${limit}&offset=${offset}`,
    {
      headers: {
        Authorization: `Bearer ${session!.accessToken}`,
      },
      next: { revalidate: 1800 },
    },
  );

  return resp.json();
}
