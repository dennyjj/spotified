'use client';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { usePathname } from 'next/navigation';
import AuthToggleButton from './auth-toggle-button';
import MeToggleButton from './profile-toggle-button';

export default function ButtonAppBar() {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';
  return (
    <AppBar position="sticky">
      <Toolbar>
        {isLoginPage ? null : <MeToggleButton />}
        <Box sx={{ flexGrow: 1 }} />
        <AuthToggleButton authWording={isLoginPage ? 'Login' : 'Logout'} />
      </Toolbar>
    </AppBar>
  );
}
