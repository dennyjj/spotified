'use client';
import { IconButton, useMediaQuery } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '@/app/lib/theme-context';

export default function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <IconButton
      onClick={toggleDarkMode}
      color="inherit"
      size={isMobile ? 'small' : 'medium'}
      sx={{
        ml: 1,
        mr: 1,
      }}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
}