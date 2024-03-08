'use client';
import { Noto_Sans } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { green, lime } from '@mui/material/colors';

const notoSans = Noto_Sans({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  typography: {
    fontFamily: notoSans.style.fontFamily,
  },
  palette: {
    primary: green,
    secondary: lime,
  },
});

export default theme;
