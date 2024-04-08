import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

export default function Profile({
  displayName,
  email,
  followerNumber,
  profileImage,
  profileUrl,
}: {
  displayName: string;
  email: string;
  followerNumber: number;
  profileImage: string;
  profileUrl: string;
}) {
  return (
    <Box height="100vh" display="flex" justifyContent="center" alignItems="center">
      <Card component={Link} href={profileUrl} sx={{ textDecoration: 'none', color: 'inherit' }}>
        <CardMedia sx={{ height: 300, width: 300 }} image={profileImage} title="spotify profile image" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {displayName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {followerNumber} {followerNumber > 1 ? 'followers' : 'follower'}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
