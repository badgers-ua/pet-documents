import 'typeface-roboto';
import './i18n';
import './main.css';
import './registerServiceWorker.js';

import CssBaseline from '@mui/material/CssBaseline';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './app/App';
import GlobalLinearProgress from './app/components/GlobalLinearProgress';
import useThemeLocal from './app/hooks/useThemeLocal';
import ApolloProviderLocal from './app/providers/ApolloProviderLocal';
import FirebaseProviderLocal from './app/providers/FirebaseProviderLocal';
import SnackbarProviderLocal from './app/providers/SnackbarProviderLocal';
import ActivePetProfileTabProvider from './app/providers/store/active-pet-profile-tab/ActivePetProfileTabProvider';
import LoaderStoreProvider from './app/providers/store/loader/LoaderStoreProvider';

const Main = () => {
  const theme = useThemeLocal();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProviderLocal>
        <LocalizationProvider dateAdapter={AdapterLuxon}>
          <FirebaseProviderLocal>
            <FirebaseProviderLocal>
              <ApolloProviderLocal>
                <LoaderStoreProvider>
                  <ActivePetProfileTabProvider>
                    <>
                      <GlobalLinearProgress />
                      <Router>
                        <App />
                      </Router>
                    </>
                  </ActivePetProfileTabProvider>
                </LoaderStoreProvider>
              </ApolloProviderLocal>
            </FirebaseProviderLocal>
          </FirebaseProviderLocal>
        </LocalizationProvider>
      </SnackbarProviderLocal>
    </ThemeProvider>
  );
};

const root = createRoot(document.getElementById('root') as Element);

root.render(<Main />);
