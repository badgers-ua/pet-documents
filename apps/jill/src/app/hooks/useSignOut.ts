import { useAuth } from 'reactfire';
import { useApolloClient } from '@apollo/client/react/hooks/useApolloClient';

type SignOutHandler = () => void;

const useSignOut = (): SignOutHandler => {
  const auth = useAuth();
  const client = useApolloClient();

  const handleSignOut = async () => {
    await client.resetStore();
    localStorage.removeItem('apollo-cache-persist');
    await auth.signOut();
  };

  return handleSignOut;
};

export default useSignOut;
