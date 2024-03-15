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
        //TODO: move to common layout
        <Link href="/dashboard/artists/short-term">4 weeks</Link>
        <Link href="/dashboard/artists/medium-term">6 months</Link>
        <Link href="/dashboard/artists/long-term">lifetime</Link>
      </Box>
      {children}
    </div>
  );
}
