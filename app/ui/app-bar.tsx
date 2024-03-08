'use client';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { usePathname } from 'next/navigation';
import AuthToggleButton from './auth-toggle-button';

export default function ButtonAppBar() {
  const pathname = usePathname();
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }} />
        <AuthToggleButton
          authWording={pathname === '/login' ? 'Login' : 'Logout'}
        />
      </Toolbar>
    </AppBar>
  );
}
