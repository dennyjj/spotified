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
        {/* TODO: move to common layout */}
        <Button variant="contained">
          <Link href="/dashboard/tracks/short-term">4 weeks</Link>
        </Button>
        <Button variant="contained">
          <Link href="/dashboard/tracks/medium-term">6 months</Link>
        </Button>
        <Button variant="contained">
          <Link href="/dashboard/tracks/long-term">lifetime</Link>
        </Button>
      </Box>
      {children}
    </div>
  );
}
