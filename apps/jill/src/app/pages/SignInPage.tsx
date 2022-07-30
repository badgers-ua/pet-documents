import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Paper, Stack, styled } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography, { TypographyProps } from '@mui/material/Typography';
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'reactfire';
import GoogleButton from '../components/GoogleButton';

import pawsImage from '../icons/paws.png';

const BackgroundImage = styled(Box)(() => ({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  backgroundImage: `url(${pawsImage})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  opacity: 0.5,
}));

const SignInPaper = styled(Paper)(() => ({
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  margin: 'auto',
  position: 'absolute',
  borderRadius: '16px',
  width: '310px',
  height: '200px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1,
}));

const SignInPage = () => {
  const auth = useAuth();
  const { t } = useTranslation();

  const handleSignIn = () => {
    signInWithRedirect(auth, new GoogleAuthProvider());
  };

  return (
    <>
      <BackgroundImage />
      <SignInPaper>
        <Avatar sx={{ bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t('welcome')}
        </Typography>
        <Stack mt={2} spacing={2}>
          <GoogleButton onClick={handleSignIn} />
          <Copyright />
        </Stack>
      </SignInPaper>
    </>
  );
};

const Copyright = (props: TypographyProps) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {t('copyright') + ' © '}
      <br></br>
      <Link color="inherit" href="https://github.com/badgers-ua">
        Badgers UA
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

export default SignInPage;
