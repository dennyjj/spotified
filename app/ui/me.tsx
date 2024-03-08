import Image from 'next/image';
import { getCurrentUserProfile } from '../lib/data';

export default async function Me() {
  const data = await getCurrentUserProfile();
  return (
    <>
      <div>
        <p> hello {data.display_name}</p>
      </div>
      <Image
        src={data.images[1].url}
        alt="user spotify profile pic"
        height={300}
        width={300}
      />
    </>
  );
}
