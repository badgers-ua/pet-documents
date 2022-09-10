import create, { SetState } from 'zustand';
import { devtools } from 'zustand/middleware';
import { environment } from '../../../../environments/environment';
import { LOCAL_STORAGE_KEY, PET_PROFILE_TAB } from '../../../../types';

export type ActivePetProfileTabState = {
  activeTab: PET_PROFILE_TAB;
  setActiveTab: (activeTab: PET_PROFILE_TAB) => void;
};
const state = (
  set: SetState<ActivePetProfileTabState>
): ActivePetProfileTabState => {
  return {
    activeTab: +(
      localStorage.getItem(LOCAL_STORAGE_KEY.ACTIVE_PET_PROFILE_TAB) ??
      PET_PROFILE_TAB.PROFILE
    ),
    setActiveTab: (activeTab: PET_PROFILE_TAB) => set({ activeTab })
  };
};

const devToolsState: any = devtools(state);

export const createActivePetProfileTabStore = () =>
  create<ActivePetProfileTabState>(
    !environment.production ? devToolsState : state
  );

export default createActivePetProfileTabStore;
