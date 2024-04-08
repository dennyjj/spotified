import { Stack, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

export default function ArtistItem({
  imageUrl,
  name,
  artistUrl,
}: {
  imageUrl: string;
  name: string;
  artistUrl: string;
}) {
  return (
    <Stack
      display="flex"
      direction="row"
      justifyContent="center"
      component={Link}
      href={artistUrl}
      sx={{ textDecoration: 'none', color: 'inherit' }}
    >
      <Image src={imageUrl} height={90} width={90} alt="artist image" />
      <Typography variant="h6" display="flex" alignItems="center" sx={{ ml: 1, flexGrow: 2 }}>
        {name}
      </Typography>
    </Stack>
  );
}
