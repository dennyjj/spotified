import { Suspense } from 'react';
import Loading from './loading';
import { getCurrentUserProfile } from './lib/data';
import Me from './ui/me';

export default async function Page() {
  const me = await getCurrentUserProfile();

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Me data={me} />
      </Suspense>
    </div>
  );
}
