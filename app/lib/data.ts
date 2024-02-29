import { auth } from '@/auth';

export async function getCurrentUserProfile() {
  const session = await auth();

  const resp = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
  });

  return resp.json();
}
