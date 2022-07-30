import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Link from '@mui/material/Link';
import Tooltip from '@mui/material/Tooltip';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import EventListContainer from '../containers/EventListContainer';
import PetListContainer from '../containers/PetListContainer';
import usePetsAndUpcomingEventsGQL from '../hooks/api/usePetsAndUpcomingEventsGQL';
import useSetLoadingStatus from '../hooks/useSetLoadingStatus';

const HomePage = () => {
  const { pets, todayEvents, upcomingEvents, isLoading } =
    usePetsAndUpcomingEventsGQL();

  useSetLoadingStatus({ isLoading });

  const { t } = useTranslation();

  if (!pets.length && !todayEvents.length && upcomingEvents.length) {
    return null;
  }

  return (
    <Box>
      <PetListContainer />
      <EventListContainer />
      <Link
        sx={{
          position: 'fixed',
          bottom: (theme) => theme.spacing(2),
          right: (theme) => theme.spacing(2),
        }}
        component={RouterLink}
        to={'/create-pet'}
        color="inherit"
        underline="none"
      >
        <Tooltip title={t('createPet').toString()}>
          <Fab color="secondary" aria-label="add">
            <AddIcon />
          </Fab>
        </Tooltip>
      </Link>
    </Box>
  );
};

export default HomePage;
