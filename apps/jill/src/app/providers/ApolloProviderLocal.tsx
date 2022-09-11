import { InMemoryCache } from '@apollo/client/cache';
import { ApolloLink, from, fromPromise, toPromise } from '@apollo/client/core';
import { ApolloClient, DefaultOptions } from '@apollo/client/core/ApolloClient';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { ApolloProvider } from '@apollo/client/react/context/ApolloProvider';
import { IPetResDto } from '@pdoc/types';
import { LocalStorageWrapper, persistCache } from 'apollo3-cache-persist';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useSigninCheck, useStorage } from 'reactfire';
import { environment } from '../../environments/environment';
import { getPetWithAvatar } from '../utils/factory.utils';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const createUploadLink = require('apollo-upload-client/public/createUploadLink.js');

const cache = new InMemoryCache();
const defaultOptions: DefaultOptions = {
  watchQuery: { fetchPolicy: 'cache-and-network' }
};
const apiUrl = `${environment.apiUrl}/graphql`;

const ApolloProviderLocal = ({ children }: { children: JSX.Element }) => {
  const { data } = useSigninCheck();
  const storage = useStorage();
  const { enqueueSnackbar } = useSnackbar();
  const [cacheLoaded, setCacheLoaded] = useState(false);

  useEffect(() => {
    const loadCache = async () => {
      await persistCache({
        cache,
        storage: new LocalStorageWrapper(window.localStorage)
      });
      setCacheLoaded(true);
    };

    loadCache();
  }, []);

  if (!cacheLoaded) {
    return null;
  }

  const authContext = setContext(async (_, { headers }) => {
    const token = await data?.user?.getIdToken();

    return {
      headers: {
        ...headers,
        'apollo-require-preflight': true,
        authorization: `Bearer ${token}`
      }
    };
  });

  const errorContext = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) => {
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        );
        enqueueSnackbar(message);
      });

    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  });

  const mapperLink = new ApolloLink((operation, forward) => {
    return fromPromise(
      toPromise(forward(operation)).then(async (res) => {
        if (
          operation.query.definitions.some(
            (d) => d.kind === 'FragmentDefinition' && d.name.value === 'Pet'
          )
        ) {
          const isArrayOfPets = 'getPets' in (res?.data ?? {});

          if (isArrayOfPets) {
            const petsWithAvatars: IPetResDto[] = [];

            for (const pet of res?.data?.['getPets'] ?? []) {
              petsWithAvatars.push(await getPetWithAvatar(storage, pet));
            }

            return {
              ...res,
              data: {
                ...res.data,
                getPets: petsWithAvatars
              }
            };
          }

          const pet: IPetResDto = res?.data?.['getPet'];

          return {
            ...res,
            data: {
              ...res.data,
              getPet: await getPetWithAvatar(storage, pet)
            }
          };
        }

        return res;
      })
    );
  });

  const uploadLink = createUploadLink({ uri: apiUrl });

  const client = new ApolloClient({
    connectToDevTools: !environment.production,
    link: from([errorContext, mapperLink, authContext, uploadLink]),
    cache,
    defaultOptions
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloProviderLocal;
