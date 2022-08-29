import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from '@mui/material';
import Container from '@mui/material/Container';
import { useTranslation } from 'react-i18next';
import { LOCAL_STORAGE_KEY, PET_PROFILE_TAB } from '../../types';
import { useActiveProfileTabStore } from '../providers/store/active-pet-profile-tab/ActivePetProfileTabProvider';

const tabs = Object.entries(PET_PROFILE_TAB).filter(([, val]) =>
  Number.isInteger(val)
);

const SettingsPage = () => {
  const { t } = useTranslation();
  const { setActiveTab } = useActiveProfileTabStore();

  const handleActiveTabChange = (
    change: SelectChangeEvent<PET_PROFILE_TAB>
  ) => {
    const selectedTab: PET_PROFILE_TAB = +change.target.value;

    setActiveTab(+change.target.value);
    localStorage.setItem(
      LOCAL_STORAGE_KEY.ACTIVE_PET_PROFILE_TAB,
      selectedTab.toString()
    );
  };

  return (
    <Container maxWidth="sm">
      <Stack spacing={2} mt={2}>
        <FormControl fullWidth>
          <InputLabel id="active-profile-tab-label">
            {t('activeProfileTab')}
          </InputLabel>
          <Select
            labelId="active-profile-tab-label"
            id="active-profile-tab-select"
            value={
              +(
                localStorage.getItem(
                  LOCAL_STORAGE_KEY.ACTIVE_PET_PROFILE_TAB
                ) ?? 0
              )
            }
            label={t('activeProfileTab')}
            onChange={handleActiveTabChange}
          >
            {tabs.map(([name, value]) => {
              return (
                <MenuItem key={value} value={value}>
                  {t(name.toLowerCase())}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Stack>
    </Container>
  );
};

export default SettingsPage;
