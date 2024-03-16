import { Box, Button } from '@mui/material';
import Link from 'next/link';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-evenly', my: 2 }}>
        <Button variant="contained">
          <Link href="/dashboard/artists/medium-term">Artists</Link>
        </Button>
        <Button variant="contained">
          <Link href="/dashboard/tracks/medium-term">Tracks</Link>
        </Button>
      </Box>
      {children}
    </div>
  );
}
