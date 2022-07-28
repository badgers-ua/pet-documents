import { StoreApi } from 'zustand';
import createContext from 'zustand/context';
import { Children } from '../../../../types';
import createLoaderStore, { LoaderState } from './createLoaderStore';

const Context = createContext<StoreApi<LoaderState>>();

const createStore = () => createLoaderStore();

const LoaderStoreProvider = ({ children }: Children) => {
  return (
    <Context.Provider createStore={createStore}>{children}</Context.Provider>
  );
};

export const useLoaderStore = Context.useStore;
export default LoaderStoreProvider;
