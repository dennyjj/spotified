import { Stack, Typography } from '@mui/material';
import Image from 'next/image';

export default function ArtistItem({ imageUrl, name }: { imageUrl: string; name: string }) {
  return (
    <Stack display="flex" direction="row" justifyContent="center">
      <Image src={imageUrl} height={100} width={100} alt="artist image" />
      <Typography variant="h5" display="flex" alignItems="center" sx={{ ml: 1, flexGrow: 2 }}>
        {name}
      </Typography>
    </Stack>
  );
}
