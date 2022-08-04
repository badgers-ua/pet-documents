import 'typeface-roboto';
import './i18n';
import './main.css';
import './registerServiceWorker.js';

import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './app/App';
import GlobalLinearProgress from './app/components/GlobalLinearProgress';
import ApolloProviderLocal from './app/providers/ApolloProviderLocal';
import DatePickerProviderLocal from './app/providers/DatePickerProviderLocal';
import FirebaseProviderLocal from './app/providers/FirebaseProviderLocal';
import SnackbarProviderLocal from './app/providers/SnackbarProviderLocal';
import ActivePetProfileTabProvider from './app/providers/store/active-pet-profile-tab/ActivePetProfileTabProvider';
import LoaderStoreProvider from './app/providers/store/loader/LoaderStoreProvider';
import ThemeProviderLocal from './app/providers/ThemeProviderLocal';

const Main = () => {
  return (
    <ThemeProviderLocal>
      <SnackbarProviderLocal>
        <DatePickerProviderLocal>
          <FirebaseProviderLocal>
            <FirebaseProviderLocal>
              <ApolloProviderLocal>
                <LoaderStoreProvider>
                  <ActivePetProfileTabProvider>
                    <Router>
                      <GlobalLinearProgress />
                      <App />
                    </Router>
                  </ActivePetProfileTabProvider>
                </LoaderStoreProvider>
              </ApolloProviderLocal>
            </FirebaseProviderLocal>
          </FirebaseProviderLocal>
        </DatePickerProviderLocal>
      </SnackbarProviderLocal>
    </ThemeProviderLocal>
  );
};

const root = createRoot(document.getElementById('root') as Element);

root.render(<Main />);
