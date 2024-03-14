import { Box } from '@mui/material';
import Link from 'next/link';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-evenly', my: 2 }}>
        <Link href="/dashboard/artists">Artists</Link>
        <Link href="/dashboard/tracks">Tracks</Link>
      </Box>
      {children}
    </div>
  );
}
