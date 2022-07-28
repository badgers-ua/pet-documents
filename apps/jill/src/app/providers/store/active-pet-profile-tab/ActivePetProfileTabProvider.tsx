import { StoreApi } from 'zustand';
import createContext from 'zustand/context';
import { Children } from '../../../../types';

import createActiveProfileTabStore, {
  ActivePetProfileTabState,
} from './createActiveProfileTabStore';

const Context = createContext<StoreApi<ActivePetProfileTabState>>();

const createStore = () => createActiveProfileTabStore();

const ActiveProfileTabProvider = ({ children }: Children) => {
  return (
    <Context.Provider createStore={createStore}>{children}</Context.Provider>
  );
};

export const useActiveProfileTabStore = Context.useStore;
export default ActiveProfileTabProvider;
