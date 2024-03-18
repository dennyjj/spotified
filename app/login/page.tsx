import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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
