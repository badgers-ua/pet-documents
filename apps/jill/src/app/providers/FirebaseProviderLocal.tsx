import LinearProgress from '@mui/material/LinearProgress';
import { FirebaseOptions } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import {
  AuthProvider,
  FirebaseAppProvider,
  StorageProvider,
  SuspenseWithPerf,
  useFirebaseApp
} from 'reactfire';
import { environment } from '../../environments/environment';
import { Children } from '../../types';

const firebaseConfig: FirebaseOptions = environment.firebaseConfig;

const FirebaseProviderLocal = ({ children }: Children) => {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig} suspense>
      <SuspenseWithPerf
        traceId={'firebase-user-wait'}
        fallback={<LinearProgress />}
      >
        <AuthProviderLocal>
          <StorageProviderLocal>{children}</StorageProviderLocal>
        </AuthProviderLocal>
      </SuspenseWithPerf>
    </FirebaseAppProvider>
  );
};

const AuthProviderLocal = ({ children }: Children) => {
  const app = useFirebaseApp();
  const auth = getAuth(app);

  return <AuthProvider sdk={auth}>{children}</AuthProvider>;
};

const StorageProviderLocal = ({ children }: Children) => {
  const app = useFirebaseApp();
  const storage = getStorage(app);

  return <StorageProvider sdk={storage}>{children}</StorageProvider>;
};

export default FirebaseProviderLocal;
