import { useApolloClient } from '@apollo/client/react/hooks/useApolloClient';
import { useAuth } from 'reactfire';

type SignOutHandler = () => void;

const useSignOut = (): SignOutHandler => {
  const auth = useAuth();
  const client = useApolloClient();

  const handleSignOut = async () => {
    await auth.signOut();
    setTimeout(async () => {
      await client.resetStore();
      localStorage.removeItem('apollo-cache-persist');
    });
  };

  return handleSignOut;
};

export default useSignOut;
