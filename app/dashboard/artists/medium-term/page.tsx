import { getUserTopArtists } from '@/app/lib/data';
import ArtistItem from '@/app/ui/artist-item';

export default async function Page() {
  const { items } = await getUserTopArtists('mediumTerm');
  return items.map(({ id, name, images }) => {
    return <ArtistItem id={id} imageUrl={images[1].url} name={name} />;
  });
}
