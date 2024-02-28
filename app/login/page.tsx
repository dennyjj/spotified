'use client';
import { signIn } from 'next-auth/react';

export default function Page() {
  const handleSignIn = () => {
    signIn('spotify', { callbackUrl: '/' });
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <button className="text-lime-500 lg" onClick={handleSignIn}>
        Login by Spotify
      </button>
    </div>
  );
}
