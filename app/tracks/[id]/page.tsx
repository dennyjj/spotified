import { TimeRange, getUserTopTracks } from '@/app/lib/data';
import TrackItem from '@/app/ui/track-item';
import { notFound } from 'next/navigation';

function isTimeRange(value: string): value is TimeRange {
  return ['short-term', 'medium-term', 'long-term'].includes(value);
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  if (!isTimeRange(id)) {
    notFound();
  }

  const { items } = await getUserTopTracks(id);
  return items.map(({ id, name, album, artists, external_urls }) => {
    return (
      <TrackItem
        key={id}
        trackName={name}
        albumImageUrl={album.images[1].url}
        albumName={album.name}
        artistName={artists.map(artist => artist.name).join(', ')}
        trackUrl={external_urls.spotify}
      />
    );
  });
}
