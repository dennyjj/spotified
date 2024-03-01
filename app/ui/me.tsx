'use client';
import Image from 'next/image';
import { UserProfile } from '../lib/definitions';

export default function Me({ data }: { data: UserProfile }) {
  return (
    <>
      <div>hello {data.display_name}</div>
      <Image
        src={data.images[1].url}
        alt="user spotify profile pic"
        height={300}
        width={300}
      />
    </>
  );
}
