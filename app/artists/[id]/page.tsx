import { TimeRange, getUserTopArtists } from '@/app/lib/data';
import ArtistItem from '@/app/ui/artist-item';
import { notFound } from 'next/navigation';

function isTimeRange(value: string): value is TimeRange {
  return ['short-term', 'medium-term', 'long-term'].includes(value);
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  if (!isTimeRange(id)) {
    notFound();
  }

  const { items } = await getUserTopArtists(id);
  return items.map(({ id, name, images, external_urls }) => {
    return <ArtistItem key={id} imageUrl={images[1].url} name={name} externalUrl={external_urls.spotify} />;
  });
}
