'use client'
import Link from 'next/link';
import Button from '@mui/material/Button';
import { usePathname } from 'next/navigation';

export default function MeToggleButton() {
  const pathname = usePathname();
  const isProfilePage = pathname === '/profile';
  return (
    <Link href={isProfilePage ? "/" : "/profile"}>
      <Button color="secondary">{isProfilePage ? 'Home' : 'Profile'}</Button>
    </Link>
  );
}
