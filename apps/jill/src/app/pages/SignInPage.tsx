import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Paper, Stack, styled } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography, { TypographyProps } from '@mui/material/Typography';
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { t } from 'i18next';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'reactfire';
import { environment } from '../../environments/environment';
import GoogleButton from '../components/GoogleButton';

import pawsImage from '../icons/paws.png';

const BackgroundImage = styled(Box)(() => ({
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  backgroundImage: `url(${pawsImage})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  opacity: 0.5
}));

const SignInPaper = styled(Paper)(() => ({
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  margin: 'auto',
  position: 'fixed',
  borderRadius: '16px',
  width: '310px',
  height: '250px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1
}));

const SignInPage = () => {
  const auth = useAuth();
  const { t } = useTranslation();

  const handleSignIn = () => {
    signInWithRedirect(auth, new GoogleAuthProvider());
  };

  useEffect(function ignoreSafeAreasAndBounceEffect() {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.height = '100vh';
    return function respectSafeAreasAndBounceEffect() {
      document.body.style.overflow = '';
      document.documentElement.style.height = '';
    };
  }, []);

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
          <Typography variant="caption" textAlign="center">
            {t('appVersion') + ': '}
            <Link
              href={`https://github.com/badgers-ua/pet-documents/blob/main/CHANGELOG.md#v${environment.appVersion
                .split('.')
                .join('')}`}
              target="_blank"
            >
              {environment.appVersion}
            </Link>
          </Typography>
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
