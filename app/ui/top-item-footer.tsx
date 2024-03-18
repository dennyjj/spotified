import TopItemFooterButton from '@/app/ui/top-item-footer-button';
import { Stack } from '@mui/material';

export default function TopItemFooter({ itemType }: { itemType: 'artists' | 'tracks' }) {
  return (
    <Stack
      sx={{
        position: 'fixed',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        bgcolor: 'primary.main',
      }}
    >
      <TopItemFooterButton href={`/${itemType}/short-term`} text="4 weeks" />
      <TopItemFooterButton href={`/${itemType}/medium-term`} text="6 months" />
      <TopItemFooterButton href={`/${itemType}/long-term`} text="lifetime" />
    </Stack>
  );
}
