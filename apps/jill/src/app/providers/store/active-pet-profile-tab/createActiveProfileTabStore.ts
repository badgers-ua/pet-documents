import { environment } from 'apps/jill/src/environments/environment';
import create, { SetState } from 'zustand';
import { devtools } from 'zustand/middleware';

export type ActivePetProfileTabState = {
  activeTab: number;
  setActiveTab: (activeTab: number) => void;
};
const state = (
  set: SetState<ActivePetProfileTabState>
): ActivePetProfileTabState => {
  return {
    activeTab: 0,
    setActiveTab: (activeTab: number) => set({ activeTab }),
  };
};

const devToolsState: any = devtools(state);

export const createActivePetProfileTabStore = () =>
  create<ActivePetProfileTabState>(
    !environment.production ? devToolsState : state
  );

export default createActivePetProfileTabStore;
