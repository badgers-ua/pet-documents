import { InMemoryCache } from '@apollo/client/cache';
import { concat, from } from '@apollo/client/core';
import { ApolloClient, DefaultOptions } from '@apollo/client/core/ApolloClient';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { ApolloProvider } from '@apollo/client/react/context/ApolloProvider';
import { LocalStorageWrapper, persistCache } from 'apollo3-cache-persist';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useSigninCheck } from 'reactfire';
import { environment } from '../../environments/environment';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const createUploadLink = require('apollo-upload-client/public/createUploadLink.js');

const cache = new InMemoryCache();
const defaultOptions: DefaultOptions = {
  watchQuery: { fetchPolicy: 'cache-and-network' },
};
const apiUrl = `${environment.apiUrl}/graphql`;

const ApolloProviderLocal = ({ children }: { children: JSX.Element }) => {
  const { data } = useSigninCheck();
  const { enqueueSnackbar } = useSnackbar();
  const [cacheLoaded, setCacheLoaded] = useState(false);

  useEffect(() => {
    const loadCache = async () => {
      await persistCache({
        cache,
        storage: new LocalStorageWrapper(window.localStorage),
      });
      setCacheLoaded(true);
    };

    loadCache();
  }, []);

  if (!cacheLoaded) {
    return <></>;
  }

  const authLink = setContext(async (_, { headers }) => {
    const token = await data?.user?.getIdToken();

    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
      },
    };
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) => {
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        );
        enqueueSnackbar(message);
      });

    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
      enqueueSnackbar(networkError.message);
    }
  });

  const uploadLink = createUploadLink({ uri: apiUrl });
  const authenticatedHttpLink = concat(authLink, uploadLink);
  const link = from([errorLink, authenticatedHttpLink]);

  const client = new ApolloClient({
    connectToDevTools: !environment.production,
    link,
    cache,
    defaultOptions,
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloProviderLocal;
