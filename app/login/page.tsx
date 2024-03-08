import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';

export default function Page() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',
      }}
    >
      <Typography align="center" variant="h4">
        TAT
      </Typography>
    </Box>
  );
}
