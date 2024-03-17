import Button from '@mui/material/Button';
import Link from 'next/link';

export default function AppBarLinkButton({
  href,
  title,
}: {
  href: '/profile' | '/artists' | '/tracks';
  title: 'Profile' | 'Artist' | 'Track';
}) {
  return (
    <Link href={href}>
      <Button color="secondary">{title}</Button>
    </Link>
  );
}
