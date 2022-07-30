import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import useTheme from '@mui/material/styles/useTheme';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Children } from '../types';

import HeaderContainer from './containers/HeaderContainer';
import { getHeaderHeight } from './utils/factory.utils';

const Layout = ({ children }: Children) => {
  const theme: any = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <HeaderContainer />
      <Box pt={getHeaderHeight(theme, isXs) + 'px'}>
        <Container maxWidth="lg">{children}</Container>
      </Box>
    </>
  );
};

export default Layout;
