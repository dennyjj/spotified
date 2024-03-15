import { Box, Typography } from '@mui/material';
import Image from 'next/image';

export default function ArtistItem({ id, imageUrl, name }: { id: string; imageUrl: string; name: string }) {
  return (
    <>
      <Box key={id} sx={{ display: 'flex' }}>
        <Image src={imageUrl} height={100} width={100} alt="artist image"></Image>
        <Typography variant="h5" display="flex" alignItems="center" sx={{ ml: 1 }}>
          {name}
        </Typography>
      </Box>
    </>
  );
}
