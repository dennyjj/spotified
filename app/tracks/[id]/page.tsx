import { TimeRange, getUserTopTracks } from '@/app/lib/data';
import TrackItem from '@/app/ui/track-item';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  if (!['short-term', 'medium-term', 'long-term'].includes(id)) {
    notFound();
  }

  const { items } = await getUserTopTracks(id as TimeRange);
  return items.map(({ id, name, album, artists }) => {
    return (
      <TrackItem
        key={id}
        trackName={name}
        albumImageUrl={album.images[1].url}
        albumName={album.name}
        artistName={artists[0].name}
      />
    );
  });
}
