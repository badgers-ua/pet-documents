import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack
} from '@mui/material';
import Container from '@mui/material/Container';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  DropDownOption,
  LOCAL_STORAGE_KEY,
  PET_PROFILE_TAB
} from '../../types';
import usePetsGQL from '../hooks/api/usePets';
import useSetLoadingStatus from '../hooks/useSetLoadingStatus';
import { useActiveProfileTabStore } from '../providers/store/active-pet-profile-tab/ActivePetProfileTabProvider';

const tabs = Object.entries(PET_PROFILE_TAB).filter(([, val]) =>
  Number.isInteger(val)
);

const SettingsPage = () => {
  const [selectedActiveTab, setSelectedActiveTab] = useState<PET_PROFILE_TAB>(
    +(localStorage.getItem(LOCAL_STORAGE_KEY.ACTIVE_PET_PROFILE_TAB) ?? 0)
  );

  const { t } = useTranslation();
  const { setActiveTab } = useActiveProfileTabStore();

  const { pets = [], isLoading } = usePetsGQL();

  const routes: DropDownOption<string>[] = [
    {
      label: t('main'),
      value: '/'
    },
    ...pets.map(({ name, _id }) => {
      return {
        label: name,
        value: `/pet/${_id}`
      };
    })
  ];

  const [selectedHomePageRoute, setSelectedHomePageRoute] = useState<string>(
    localStorage.getItem(LOCAL_STORAGE_KEY.HOME_PAGE_URL) ?? routes[0].value
  );

  useSetLoadingStatus({ isLoading });

  const handleActiveTabChange = (
    change: SelectChangeEvent<PET_PROFILE_TAB>
  ) => {
    const selectedTab: PET_PROFILE_TAB = +change.target.value;

    setActiveTab(selectedTab);
    setSelectedActiveTab(selectedTab);

    localStorage.setItem(
      LOCAL_STORAGE_KEY.ACTIVE_PET_PROFILE_TAB,
      selectedTab.toString()
    );
  };

  const handleHomePageUrlChange = (change: SelectChangeEvent<string>) => {
    const selectedHomePageUrl: string = change.target.value;
    setSelectedHomePageRoute(selectedHomePageUrl);
    localStorage.setItem(LOCAL_STORAGE_KEY.HOME_PAGE_URL, selectedHomePageUrl);
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
            value={selectedActiveTab}
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

        <FormControl fullWidth>
          <InputLabel id="home-page-label">{t('homePage')}</InputLabel>
          <Select
            labelId="home-page-label"
            id="home-page-select"
            value={selectedHomePageRoute}
            label={t('homePage')}
            onChange={handleHomePageUrlChange}
          >
            {routes.map(({ label, value }) => {
              return (
                <MenuItem key={value} value={value}>
                  {label}
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
