import { getCurrentUserProfile } from '@/app/lib/data';
import Profile from '@/app/ui/profile';

export default async function Page() {
  const { display_name, images, external_urls, followers, email } = await getCurrentUserProfile();
  return (
    <Profile
      displayName={display_name}
      email={email}
      followerNumber={followers.total}
      profileImage={images[1].url}
      profileLink={external_urls.spotify}
    />
  );
}
