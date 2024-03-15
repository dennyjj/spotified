import { Box, Typography } from '@mui/material';
import Image from 'next/image';

export default function TrackItem({
  id,
  albumImageUrl,
  trackName,
  albumName,
  artistName,
}: {
  id: string;
  albumImageUrl: string;
  trackName: string;
  albumName: string;
  artistName: string;
}) {
  return (
    <>
      <Box key={id} sx={{ display: 'flex', flexDirection: 'row' }}>
        <Image src={albumImageUrl} height={70} width={70} alt="album image"></Image>
        <Box sx={{ ml: 1 }}>
          <Typography variant="h5">{trackName}</Typography>
          <div>
            {albumName} - {artistName}
          </div>
        </Box>
      </Box>
    </>
  );
}
