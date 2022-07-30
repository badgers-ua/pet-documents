import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSigninCheck } from 'reactfire';

import RoutesLocal from './RoutesLocal';

const App = () => {
  const { data } = useSigninCheck();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (data?.signedIn && pathname === '/sign-in') {
      navigate('/');
      return;
    }

    if (data?.signedIn) {
      return;
    }

    if (pathname === '/sign-in') {
      return;
    }

    navigate('/sign-in');
  }, [data?.signedIn, navigate, pathname]);

  return <RoutesLocal />;
};

export default App;
