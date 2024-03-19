'use client';

import { Button, Container } from '@mui/material';
import { usePathname } from 'next/navigation';

export default function TopItemFooterButton({ href, text }: { href: string; text: string }) {
  const pathname = usePathname();
  return (
    <Container sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
      <Button variant="text" color={href === pathname ? 'secondary' : 'inherit'} href={href}>
        {text}
      </Button>
    </Container>
  );
}
