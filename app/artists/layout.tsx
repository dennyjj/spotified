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
        <Link href="/artists/short-term">
          <Button variant="contained">4 weeks</Button>
        </Link>
        <Link href="/artists/medium-term">
          <Button variant="contained">6 months</Button>
        </Link>
        <Link href="/artists/long-term">
          <Button variant="contained">lifetime</Button>
        </Link>
      </Box>
      {children}
    </div>
  );
}
