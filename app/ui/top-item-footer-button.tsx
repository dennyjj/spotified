import { Button, Container } from '@mui/material';

export default function TopItemFooterButton({ href, text }: { href: string; text: string }) {
  return (
    <Container sx={{ flexGrow: 1 }}>
      <Button variant="text" color="secondary" href={href}>
        {text}
      </Button>
    </Container>
  );
}
