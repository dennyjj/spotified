import { getUserTopTracks } from '@/app/lib/data';
import TrackItem from '@/app/ui/track-item';

export default async function Page() {
  const { items } = await getUserTopTracks('longTerm');
  return items.map(({ id, name, album, artists }) => {
    return (
      <>
        <TrackItem
          id={id}
          trackName={name}
          albumImageUrl={album.images[1].url}
          albumName={album.name}
          artistName={artists[0].name}
        />
      </>
    );
  });
}
