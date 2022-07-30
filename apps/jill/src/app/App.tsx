import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import useTheme from '@mui/material/styles/useTheme';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSigninCheck } from 'reactfire';

import HeaderContainer from './containers/HeaderContainer';
import RoutesLocal from './RoutesLocal';
import { getHeaderHeight } from './utils/factory.utils';

const App = () => {
  const theme: any = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  const check = useSigninCheck();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (check.data?.signedIn && pathname === '/sign-in') {
      navigate('/');
      return;
    }

    if (check.data?.signedIn) {
      return;
    }

    if (pathname === '/sign-in') {
      return;
    }

    navigate('/sign-in');
  }, [check.data?.signedIn, navigate, pathname]);

  return (
    <>
      <HeaderContainer />
      <Box pt={getHeaderHeight(theme, isXs) + 'px'}>
        <Container maxWidth="lg">
          <RoutesLocal />
        </Container>
      </Box>
    </>
  );
};

export default App;
