import { TimeRange, getUserTopArtists } from '@/app/lib/data';
import ArtistItem from '@/app/ui/artist-item';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  if (!['short-term', 'medium-term', 'long-term'].includes(id)) {
    notFound();
  }

  const { items } = await getUserTopArtists(id as TimeRange);
  return items.map(({ id, name, images }) => {
    return <ArtistItem key={id} imageUrl={images[1].url} name={name} />;
  });
}
