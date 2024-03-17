import Button from '@mui/material/Button';
import { signIn, signOut } from 'next-auth/react';

export default function AuthToggleButton({
  authWording,
}: {
  authWording: 'Login' | 'Logout';
}) {
  const handleClick = () => {
    if (authWording === 'Login') {
      signIn('spotify', { callbackUrl: '/profile' });
    } else {
      signOut();
    }
  };
  return (
    <Button color="secondary" onClick={handleClick}>
      {authWording}
    </Button>
  );
}
