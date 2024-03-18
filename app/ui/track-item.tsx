import { Stack, Typography } from '@mui/material';
import Image from 'next/image';

export default function TrackItem({
  albumImageUrl,
  trackName,
  albumName,
  artistName,
}: {
  albumImageUrl: string;
  trackName: string;
  albumName: string;
  artistName: string;
}) {
  return (
    <>
      <Stack display="flex" direction="row">
        <Image src={albumImageUrl} height={70} width={70} alt="album image"></Image>
        <Stack justifyContent="center" sx={{ ml: 1 }}>
          <Typography>{trackName}</Typography>
          <Typography>
            {albumName} - {artistName}
          </Typography>
        </Stack>
      </Stack>
    </>
  );
}
