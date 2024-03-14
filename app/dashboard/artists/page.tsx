import { getUserTopArtists } from '@/app/lib/data';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

export default async function Page() {
  const { items } = await getUserTopArtists();
  return items.map(({ id, name, images }) => {
    return (
      <>
        <Box key={id} sx={{ display: 'flex' }}>
          <Image src={images[1].url} height={100} width={100} alt="artist image"></Image>
          <Typography variant="h5" display="flex" alignItems="center" sx={{ ml: 1 }}>
            {name}
          </Typography>
        </Box>
      </>
    );
  });
}
