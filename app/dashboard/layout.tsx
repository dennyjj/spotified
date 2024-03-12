import Link from 'next/link';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div>
        <Link href="/dashboard/artists">Artists</Link>
      </div>
      <div>
        <Link href="/dashboard/tracks">Tracks</Link>
      </div>
      {children}
    </div>
  );
}
