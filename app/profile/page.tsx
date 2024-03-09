import { getCurrentUserProfile } from '../lib/data';
import Profile from '../ui/profile';

export default async function Page() {
  const { display_name, images } = await getCurrentUserProfile();
  return <Profile displayName={display_name} profileImage={images[1].url} />;
}
