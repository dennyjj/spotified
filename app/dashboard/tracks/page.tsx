import { getUserTopItems } from '@/app/lib/data';
import { Typography } from '@mui/material';

export default async function Page() {
  const { items } = await getUserTopItems({ type: 'tracks' });
  return items.map(({ id, name }) => {
    return (
      <>
        <hr />
        <div key={id}>
          <Typography variant="h5">{name}</Typography>
        </div>
      </>
    );
  });
}
