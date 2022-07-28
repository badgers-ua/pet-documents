import create, { SetState } from 'zustand';
import { devtools } from 'zustand/middleware';
import { environment } from '../../../../environments/environment';
import { isLoading } from '../../../../types';

export type LoaderState = {
  setIsLoading: (isLoading: boolean) => void;
} & isLoading;

const state = (set: SetState<LoaderState>): LoaderState => {
  return {
    isLoading: false,
    setIsLoading: (isLoading: boolean) => set({ isLoading }),
  };
};

const devToolsState: any = devtools(state);

const createLoaderStore = () =>
  create<LoaderState>(!environment.production ? devToolsState : state);

export default createLoaderStore;
