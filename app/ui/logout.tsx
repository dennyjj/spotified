'use client';
import { signOut } from 'next-auth/react';

export default function Logout() {
  const handleLogOut = () => {
    signOut();
  };

  return <button onClick={handleLogOut}>Logout</button>;
}
