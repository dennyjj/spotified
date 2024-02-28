'use client';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Loading from './loading';

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/login');
    },
  });

  const handleSignOut = () => {
    signOut();
  };

  if (status === 'loading') {
    return Loading();
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <p>Signed in as {session!.user?.name}</p>
      <button className="text-lime-500 lg" onClick={handleSignOut}>
        Sign out
      </button>
    </div>
  );
}
