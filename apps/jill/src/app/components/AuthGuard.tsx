import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { useAuth, useSigninCheck } from 'reactfire';

const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const { data, status } = useSigninCheck();
  const auth = useAuth();

  if (status === 'loading') {
    return <></>;
  }

  if (!data?.signedIn) {
    signInWithRedirect(auth, new GoogleAuthProvider());
    return <></>;
  }

  return children as JSX.Element;
};

export default AuthGuard;
