import Image from 'next/image';

export default async function Profile({
  displayName,
  profileImage,
}: {
  displayName: string;
  profileImage: string;
}) {
  return (
    <>
      <div>
        <p>{displayName}</p>
      </div>
      <Image
        src={profileImage}
        alt="user spotify profile pic"
        height={300}
        width={300}
      />
    </>
  );
}
