import { getCurrentUserProfile } from '@/app/lib/data';

export async function GET(): Promise<Response> {
  const me = await getCurrentUserProfile();
  return Response.json(me);
}
