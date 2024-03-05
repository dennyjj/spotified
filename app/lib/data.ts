import { auth } from '@/auth';
import { UserProfile } from './definitions';
import { redirect } from 'next/navigation';

export async function getCurrentUserProfile(): Promise<UserProfile> {
  const session = await auth();
  if (session?.error === 'RefreshAccessTokenError') {
    return redirect(`${process.env.NEXT_PUBLIC_VERCEL_URL!}/login`);
  }

  const resp = await fetch(process.env.SPOTIFY_API_ME_URL!, {
    headers: {
      Authorization: `Bearer ${session!.accessToken}`,
    },
  });

  return resp.json();
}
