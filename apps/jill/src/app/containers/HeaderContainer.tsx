import { useSigninCheck, useUser } from 'reactfire';
import Header from '../components/Header';
import useSignOut from '../hooks/useSignOut';

const HeaderContainer = () => {
  const handleLogout = useSignOut();
  const { data: signInCheck } = useSigninCheck();
  const { data: user } = useUser();

  return (
    <>
      {signInCheck?.signedIn && (
        <Header onLogoutClick={handleLogout} user={user!} />
      )}
    </>
  );
};

export default HeaderContainer;
