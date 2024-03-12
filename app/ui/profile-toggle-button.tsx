'use client';

import Button from '@mui/material/Button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ProfileToggleButton() {
  const pathname = usePathname();
  const isProfilePage = pathname === '/profile';
  return (
    <Link href={isProfilePage ? '/dashboard' : '/profile'}>
      <Button color="secondary">{isProfilePage ? 'Home' : 'Profile'}</Button>
    </Link>
  );
}
