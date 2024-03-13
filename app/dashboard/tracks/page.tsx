import { getUserTopTracks } from '@/app/lib/data';
import { Typography } from '@mui/material';

export default async function Page() {
  const { items } = await getUserTopTracks();
  return items.map(({ id, name, album, artists }) => {
    return (
      <>
        <hr />
        <div key={id}>
          <Typography variant="h5">{name}</Typography>
          <div>
            {album.name} - {artists[0].name}
          </div>
        </div>
      </>
    );
  });
}
