import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSigninCheck } from 'reactfire';

const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const { data, status } = useSigninCheck();
  const navigate = useNavigate();

  useEffect(() => {
    if (!data?.signedIn) {
      navigate('sign-in');
    }
  }, [data, navigate]);

  if (status === 'loading' || !data?.signedIn) {
    return null;
  }

  return children as JSX.Element;
};

export default AuthGuard;
