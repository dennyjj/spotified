'use client';

import Button from '@mui/material/Button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AppBarLinkButton({
  href,
  title,
}: {
  href: '/profile' | '/artists/medium-term' | '/tracks/medium-term';
  title: 'Profile' | 'Top Artists' | 'Top Tracks';
}) {
  const pathname = usePathname();
  return (
    <Link href={href}>
      <Button color={pathname.startsWith(href) ? 'success' : 'secondary'}>{title}</Button>
    </Link>
  );
}
