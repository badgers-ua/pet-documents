import CssBaseline from '@mui/material/CssBaseline';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { Children } from '../../types';
import useThemeLocal from '../hooks/useThemeLocal';

const ThemeProviderLocal = ({ children }: Children) => {
  const theme = useThemeLocal();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ThemeProviderLocal;
