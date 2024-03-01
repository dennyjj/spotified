'use client';
import { signOut } from 'next-auth/react';

export default function Logout() {
  const handleLogOut = () => {
    signOut();
  };

  return (
    <button className="text-lime-500 lg" onClick={handleLogOut}>
      Logout
    </button>
  );
}
