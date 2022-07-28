import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import NavigationCard from '../components/NavigationCard';
import PetAvatar from '../components/PetAvatar';
import usePetsAndUpcomingEventsGQL from '../hooks/api/usePetsAndUpcomingEventsGQL';
import { getAge } from '../utils/date.utils';

const avatarSize = 48;

const PetListContainer = () => {
  const { pets } = usePetsAndUpcomingEventsGQL();

  const { t } = useTranslation();

  return pets.length ? (
    <Box pt={2}>
      <Typography variant="h6">{t('pets')}</Typography>
      <Grid container spacing={2} pt={2}>
        {pets.map(({ _id, name, dateOfBirth, species, avatar }) => {
          return (
            <Grid item xs={12} sm={6} md={4} key={_id}>
              <Link component={RouterLink} to={`/pet/${_id}`} underline="none">
                <NavigationCard
                  avatar={
                    <PetAvatar
                      size={avatarSize}
                      url={avatar}
                      species={species}
                    />
                  }
                  title={name}
                  subTitle={getAge(dateOfBirth ?? '')}
                />
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  ) : null;
};

export default PetListContainer;
