import { getCurrentUserProfile } from '../lib/data';
import Image from 'next/image';

export default async function Page() {
  const me = await getCurrentUserProfile();

  return (
    <>
      <div>hello {me.display_name}</div>
      <Image
        src={me.images[1].url}
        alt="profile pic"
        height={300}
        width={300}
      />
    </>
  );
}
