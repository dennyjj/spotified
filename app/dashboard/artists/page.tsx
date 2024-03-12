import { getUserTopItems } from '@/app/lib/data';
import { Typography } from '@mui/material';
import Image from 'next/image';

export default async function Page() {
  const { items } = await getUserTopItems({ type: 'artists' });
  return items.map(({ id, name, images }) => {
    return (
      <>
        <hr />
        <div key={id}>
          <Typography variant="h5">{name}</Typography>
          <Image src={images[1].url} height={320} width={320} alt="artist image"></Image>
        </div>
      </>
    );
  });
}
