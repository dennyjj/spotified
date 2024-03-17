'use client';

import AppBarLinkButton from '@/app/ui/app-bar-link-button';
import AuthToggleButton from '@/app/ui/auth-toggle-button';
import FlexGrowBox from '@/app/ui/flex-grow-box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { usePathname } from 'next/navigation';

export default function ButtonAppBar() {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';
  return (
    <AppBar position="sticky">
      <Toolbar sx={{ justifyContent: 'space-around' }}>
        {isLoginPage ? <FlexGrowBox flexGrow={1} /> : <AppBarLinkButton href="/profile" title="Profile" />}
        {isLoginPage ? <FlexGrowBox flexGrow={1} /> : <AppBarLinkButton href="/artists" title="Artist" />}
        {isLoginPage ? <FlexGrowBox flexGrow={1} /> : <AppBarLinkButton href="/tracks" title="Track" />}
        <AuthToggleButton authWording={isLoginPage ? 'Login' : 'Logout'} />
      </Toolbar>
    </AppBar>
  );
}
