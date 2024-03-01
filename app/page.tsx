import { Suspense } from 'react';
import Loading from './loading';
import { getCurrentUserProfile } from './lib/data';
import Logout from './ui/logout';
import Me from './ui/me';

export default async function Page() {
  const me = await getCurrentUserProfile();

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <Suspense fallback={<Loading />}>
        <Me data={me} />
      </Suspense>
      <Logout />
    </div>
  );
}
