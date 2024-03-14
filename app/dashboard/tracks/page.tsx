import { getUserTopTracks } from '@/app/lib/data';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

export default async function Page() {
  const { items } = await getUserTopTracks();
  return items.map(({ id, name, album, artists }) => {
    return (
      <>
        <hr />
        <Box key={id} sx={{ display: 'flex', flexDirection: 'row' }}>
          <Image src={album.images[1].url} height={70} width={70} alt="album image"></Image>
          <Box sx={{ ml: 1 }}>
            <Typography variant="h5">{name}</Typography>
            <div>
              {album.name} - {artists[0].name}
            </div>
          </Box>
        </Box>
      </>
    );
  });
}
