'use client';

import AuthToggleButton from '@/app/ui/auth-toggle-button';
import ProfileToggleButton from '@/app/ui/profile-toggle-button';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { usePathname } from 'next/navigation';

export default function ButtonAppBar() {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';
  return (
    <AppBar position="sticky">
      <Toolbar>
        {isLoginPage ? null : <ProfileToggleButton />}
        <Box sx={{ flexGrow: 1 }} />
        <AuthToggleButton authWording={isLoginPage ? 'Login' : 'Logout'} />
      </Toolbar>
    </AppBar>
  );
}
