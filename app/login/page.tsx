'use client';
import { signIn } from 'next-auth/react';

export default function Page() {
  const handleSignIn = () => {
    signIn('spotify', { callbackUrl: '/' });
  };

  return (
    <div>
      <button onClick={handleSignIn}>Login by Spotify</button>
    </div>
  );
}
