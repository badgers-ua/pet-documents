import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import useTheme from '@mui/material/styles/useTheme';
import useMediaQuery from '@mui/material/useMediaQuery';
import { BrowserRouter as Router } from 'react-router-dom';
import { useUser } from 'reactfire';
import { Children } from './../types';
import HeaderContainer from './containers/HeaderContainer';
import useSetLoadingStatus from './hooks/useSetLoadingStatus';
import RoutesLocal from './RoutesLocal';
import { getHeaderHeight } from './utils/factory.utils';

const App = () => {
  const theme: any = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppGuard>
      <Router>
        <HeaderContainer />
        <Box pt={getHeaderHeight(theme, isXs) + 'px'}>
          <Container maxWidth="lg">
            <RoutesLocal />
          </Container>
        </Box>
      </Router>
    </AppGuard>
  );
};

const AppGuard = ({ children }: Children) => {
  const { status: userStatus } = useUser();
  const isLoading: boolean = userStatus === 'loading';

  useSetLoadingStatus({ isLoading });

  if (isLoading) {
    return <></>;
  }

  return children;
};

export default App;
