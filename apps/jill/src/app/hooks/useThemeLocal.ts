import { useMemo } from 'react';
import createTheme from '@mui/material/styles/createTheme';

const useThemeLocal = () => {
  const prefersDarkMode: boolean = true;
  // TODO: Auto Theme switching
  // useMediaQuery(
  // '(prefers-color-scheme: dark)',
  // );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  return theme;
};

export default useThemeLocal;
