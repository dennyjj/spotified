import { Suspense } from 'react';
import Loading from './loading';
import Me from './ui/me';

export default async function Page() {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Me />
      </Suspense>
    </div>
  );
}
