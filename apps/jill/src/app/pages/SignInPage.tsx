import Button from '@mui/material/Button';
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { useAuth } from 'reactfire';

const SignInPage = () => {
  const auth = useAuth();

  const handleSignIn = () => {
    signInWithRedirect(auth, new GoogleAuthProvider());
  };

  return <Button onClick={handleSignIn}>Sign In</Button>;
};

export default SignInPage;
